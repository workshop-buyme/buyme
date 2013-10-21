package storage

object `package` {
  import play.api.Application
  import play.modules.reactivemongo.ReactiveMongoPlugin
  import play.modules.reactivemongo.json.collection.JSONCollection

  def auctions(implicit app: Application): JSONCollection = ReactiveMongoPlugin.db.collection[JSONCollection]("auctions")
  def offers(implicit app: Application): JSONCollection = ReactiveMongoPlugin.db.collection[JSONCollection]("offers")
  def users(implicit app: Application): JSONCollection = ReactiveMongoPlugin.db.collection[JSONCollection]("users")
}