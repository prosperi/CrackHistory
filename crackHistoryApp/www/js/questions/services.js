angular.module('questionsSrv', [])

.factory('categoriesSrv', ['$http', function($http){

  var categories = {};

  categories.categoryList = function(){
    return $http({
      method: "GET",
      url: "https://notgiorgi.com/api/category/"
    });
  };

  categories.questionList = function(){
    return $http({
      method: "GET",
      url: "https://notgiorgi.com/api/test/"
    });
  };

  return categories;

}])
