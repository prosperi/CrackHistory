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
    output.checkData = function(){
      return $http({
        method: "GET",
        url: "https://notgiorgi.com/api/category/"
      });
    };

    return output;
  }

}])

.factory('questionsByCatSrv', ['$http', '$localStorage', '$ionicLoading', function($http, $localStorage, $ionicLoading){
  var output = {};
  var categoryList = $localStorage.categoryList;
  var questionList = $localStorage.questionList;

  if($localStorage.questionList == undefined){
    $localStorage.questionList = [];

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
  }else{
    output.checkData = function(id){
      var filteredList = questionList.filter(function(value){
        return value.category_id == id + 1;
      });
      if(filteredList.length != categoryList[id].count){
        var address = "https://notgiorgi.com/api/category/" + (id + 1) + "/questions";
        return $http({
            method: "GET",
            url: address
          }).then(function(response){        ////// Needs correction
            
          });
      }else{
        return false;
      }
    };

    return output;
  }





}])
