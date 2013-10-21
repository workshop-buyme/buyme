package services

import akka.actor.{ Actor, ActorRef }
import org.joda.time.DateTime
import play.api.Application
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import scala.collection.immutable.Queue

import scala.concurrent.duration._
import org.mandubian.actorroom._

class AuctionCompletionNotifier(channel: ActorRef, application: Application) extends Actor {
  import AuctionCompletionNotifier._

  private def coll = storage.auctions(application)

  @volatile private var soonToBeCompleted: Queue[(String, Long)] = Queue.empty

  //private val retrievalInterval = 1 minute
  private val retrievalInterval = 10 seconds

  // every <retrievalInterval> we get the auctions that will be completed in the retrievalInterval 
  context.system.scheduler.schedule(0 seconds, retrievalInterval) {
    self ! RetrieveNextAuctions
  }

  // every 250ms we dequeue the auctions that are completed and notify the channel
  context.system.scheduler.schedule(0 seconds, 250 milliseconds) {
    self ! DequeueCompleted
  }

  def receive = {
    case RetrieveNextAuctions =>
    
      val query =Json.obj(
        "endDate" -> Json.obj("$lt" -> DateTime.now().getMillis()),
        "hasEnded" -> false
      )

      val projection = Json.obj(
        "_id" -> 1,
        "endDate" -> 1
      )

      val futureCompletedAuctions =
        coll
          .find(query, projection)
          .sort(Json.obj("endDate" -> 1))
          .cursor[JsObject].collect[Vector]()

      futureCompletedAuctions.map { list =>
        val enqueuable = list.map { obj =>
          val id = (obj \ "_id" \ "$oid").as[String]
          val timestamp = (obj \ "endDate").as[Long]
          id -> timestamp
        }

        self ! Enqueue(enqueuable)
      } recover {
        case e : Throwable => play.Logger.error(e.getMessage)
      }

    case Enqueue(elements) =>
      soonToBeCompleted = soonToBeCompleted.enqueue(elements)

    case DequeueCompleted =>
      val now = DateTime.now().getMillis()
      def inspect(queue: Queue[(String, Long)]): Queue[(String, Long)] = {
        if (queue.isEmpty)
          queue
        else {
          val (elem, others) = queue.dequeue
          if (elem._2 <= now) {
            channel ! Broadcast(
              "notifier",
              Json.obj(
                "kind" -> "auction",
                "action" -> "ended",
                "value" -> elem._1)
            )

            coll.update(
              Json.obj("_id" -> Json.obj("$oid" -> elem._1)),
              Json.obj("$set" -> Json.obj("hasEnded" -> true))
            )

            inspect(others)
          } else
            queue        }
      }
      soonToBeCompleted = inspect(soonToBeCompleted)
  }
}

object AuctionCompletionNotifier {
  case object DequeueCompleted
  case object RetrieveNextAuctions
  case class Enqueue(elements: Vector[(String, Long)])
  case class Completed(
    id: String,
    endDate: Long)
}