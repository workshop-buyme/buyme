package controllers

import scala.concurrent.ExecutionContext.Implicits.global

import akka.actor._

import play.api._
import play.api.mvc._
import play.api.libs.json._

import org.mandubian.actorroom._

import play.api.Play.current

class Receiver extends Actor {
  def receive = {
    case r@Received(id: String, js: JsValue) =>
      play.Logger.warn("received unexpected message: "+r)
  }
}


object Application extends Controller {
  def main(url: String) = Action {
    Ok(views.html.templates.main()(play.api.templates.Html("")))
  }

  def index = Action {
    Ok(views.html.index())
  }

  def sessionJs = Action.async { implicit request =>
    Users.getLoggedUser.map( optUser => Ok(views.js.session(optUser)))
  }

  def websocketUrl(id: String) = Action { implicit request =>
    Ok(routes.Application.websocket(id).webSocketURL().toString)
  }

  def websocket(id: String) = Room.async(services.AuctionGlobal.room.map(_.websocket[Receiver, JsValue](id)))

}