angular.module('questionsSrv', ['ngStorage'])

.factory('categoriesSrv', ['$http', '$localStorage', function($http, $localStorage){

  var categories = {};

  $http({
      method: "GET",
      url: "https://notgiorgi.com/api/category/"
    }).then(function(response){
    categories.categoryList = [];
    for(key in response.data){
      categories.categoryList.unshift(response.data[key]);
    }
    //window.localStorage.setItem("categoryList", JSON.stringify(categories.categoryList));
    $localStorage.categoryList = categories.categoryList;
  }, function(response){
    console.log("Fetching categories failed");
  });

  $http({
      method: "GET",
      url: "https://notgiorgi.com/api/test/"
    }).then(function(response){
    categories.questionList = [];
    for(key in response.data){
      categories.questionList.unshift(response.data[key]);
    }
    //window.localStorage.setItem("questionList", JSON.stringify(categories.questionList));
    $localStorage.questionList = categories.questionList;
  }, function(response){
    console.log("Fetching categories failed");
  });

  return categories;

}])
