angular.module('questionsSrv', ['ngStorage'])

.factory('categoriesSrv', ['$http', '$localStorage', '$ionicLoading', function($http, $localStorage, $ionicLoading){
  var output = {};

  if($localStorage.categoryList == undefined){
    output.showLoader = function(){
      return $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-positive" ></ion-spinner>',
        animation: 'fade-in'
      });
    };
    output.getData = function(){
      return $http({
        method: "GET",
        url: "https://notgiorgi.com/api/category/"
      });
    };

    return output;
  }else{
    return true;
  }

}])

.factory('questionsByCatSrv', ['$http', '$localStorage', '$ionicLoading', function($http, $localStorage, $ionicLoading){
  var output = {};
  if($localStorage.questionList == undefined){
    $localStorage.questionList = [];
  }

    output.showLoader = function(){
      return $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-positive" ></ion-spinner>',
        animation: 'fade-in'
      });
    };
    output.getData = function(id){
      var address = "https://notgiorgi.com/api/category/" + id + "/questions";
      return $http({
          method: "GET",
          url: address
        });
    };

    return output;


}])
