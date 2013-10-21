package controllers

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import play.api._
import play.api.mvc._
import play.api.Play.current

import play.api.libs.json._
import play.api.libs.functional.syntax._

import play.modules.reactivemongo.json.collection.JSONCollection
import play.modules.reactivemongo.json.BSONFormats._
import play.autosource.reactivemongo._

import org.mandubian.actorroom._
import models._


object Offers extends ReactiveMongoAutoSourceController[Offer] {
  lazy val coll = storage.offers
}