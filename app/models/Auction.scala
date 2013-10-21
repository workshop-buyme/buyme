package models

import play.api.libs.json._
import play.api.libs.functional.syntax._
import org.joda.time.DateTime

case class Auction (
	productName: String,
	startDate: DateTime,
	endDate: DateTime,
	startPrice: Long,
	offers: List[Offer],
	seller: String,
  hasEnded: Boolean,
  maxOffer: Long
)

object Auction {
  implicit val formatAuction = Json.format[Auction]
}