package controllers

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.mvc._
import play.api.Play.current

import play.api.libs.json._
import play.api.libs.functional.syntax._

import play.modules.reactivemongo.json.collection.JSONCollection
import play.autosource.reactivemongo._

import models._

object Users extends ReactiveMongoAutoSourceController[User] {
  lazy val coll = storage.users

  def signup = Action.async(parse.json) { implicit request =>
    request.body.validate[User].fold(
      error => Future(BadRequest(JsError.toFlatJson(error))),
      user  =>
        res.find(Json.obj("username" -> user.username)).flatMap{ us =>
          play.Logger.info("users:"+us)
          us.headOption match {
            case None =>
              res.insert(user).flatMap{ id => 
                res.get(id).map{
                  case Some((u, i)) => Ok(Json.toJson(u.copy(password = "******"))).withSession("username" -> u.username)
                  case _ => BadRequest
                }
              }
            case Some(_) => Future.successful(BadRequest(s"user ${user.username} already exists"))

          }
        }
    )
  }

  def login = Action.async(parse.json) { implicit request =>
    res.find(request.body.asOpt[JsObject].getOrElse(Json.obj())).map{ s =>
      if (s.size == 1)  {
        val user = s.head._1
        Ok(Json.toJson(user)).withSession("username" -> user.username)
      }
      else BadRequest
    }
  }

  def logout = Action {
    Ok.withNewSession
  }

  private[controllers] def getLoggedUser(implicit request: RequestHeader): Future[Option[User]] = {
    res.find(Json.obj("username" -> request.session.get("username"))).map( _.headOption.map( _._1 ) )
  }

  def logged = Action.async { implicit request =>
    getLoggedUser.map {
      case Some(user) => Ok(Json.toJson(user))
      case None => BadRequest
    }
  }
}

// VIEWS
package users {
  object templates extends Controller {
    def account = Action {
      Ok(views.html.users.account())
    }

    def login = Action {
      Ok(views.html.users.login())
    }

    def signup = Action {
      Ok(views.html.users.signup())
    }
  }
}
