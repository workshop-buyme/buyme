import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName         = "buyme"
  val appVersion      = "0.0.1-SNAPSHOT"

  val mandubianRepo = Seq(
    "Mandubian repository snapshots" at "https://github.com/mandubian/mandubian-mvn/raw/master/snapshots/",
    "Mandubian repository releases" at "https://github.com/mandubian/mandubian-mvn/raw/master/releases/"
  )

  val sonatypeRepo = Seq( 
    "Sonatype Snapshots" at "http://oss.sonatype.org/content/repositories/snapshots/"
  )


  val appDependencies = Seq(
    // Add your project dependencies here,
    "org.reactivemongo" %% "play2-reactivemongo" % "0.10.0-SNAPSHOT",
    "play-autosource"   %% "reactivemongo"       % "2.0-SNAPSHOT",
    "org.mandubian"     %% "play-actor-room"     % "0.2"
  )

  val main = play.Project(appName, appVersion, appDependencies).settings(
    // Add your own project settings here
    resolvers ++= mandubianRepo ++ sonatypeRepo
  )

}
