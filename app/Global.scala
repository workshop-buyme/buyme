import play.api._

import scala.concurrent._
import org.mandubian.actorroom._

import akka.actor._

import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.concurrent.Akka

object Global extends GlobalSettings {
  override def onStart(app: Application) {
    services.AuctionGlobal.init(app)
    play.Logger.info("Application has started")
  }

}

