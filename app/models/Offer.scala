package models

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Offer (amount: Long, buyer: String)

object Offer {
  implicit val formatOffer = Json.format[Offer]
}