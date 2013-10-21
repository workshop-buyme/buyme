@(userOpt: Option[User])

@import play.api.libs.json._
@import models.User

app.run(['$rootScope', function ($rootScope) {
  @userOpt.map{ user =>
    $rootScope.user = @JavaScript( ( Json.toJson(user).as[JsObject] ++ Json.obj("password" -> JsString("******")) ).toString );
    $rootScope.$emit('login');
  }
}]);