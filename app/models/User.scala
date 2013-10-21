package models

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class User (username: String, password: String)

object User {
  implicit val formatUser = Json.format[User]
}