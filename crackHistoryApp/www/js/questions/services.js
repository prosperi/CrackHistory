angular.module('questionsSrv', ['ngStorage'])

.factory('categoriesSrv', ['$http', '$localStorage', function($http, $localStorage){

  var categories = {};

  if($localStorage.categoryList == undefined){
    $http({
        method: "GET",
        url: "https://notgiorgi.com/api/category/"
      }).then(function(response){
      categories.categoryList = [];
      for(key in response.data){
        categories.categoryList.unshift(response.data[key]);
      }
      $localStorage.categoryList = categories.categoryList;

      for(var i=0; i<$localStorage.categoryList.length; i++){
        $localStorage.activity.push({
          subject_id: $localStorage.categoryList[i].subject_id,
          category_id: i,
          questions: []
        });
      }
      
    }, function(response){
      console.log("Fetching categories failed");
    });
  }

  if($localStorage.questionList == undefined){
    $http({
        method: "GET",
        url: "https://notgiorgi.com/api/test/"
      }).then(function(response){
      categories.questionList = [];
      for(key in response.data){
        categories.questionList.unshift(response.data[key]);
      }
      $localStorage.questionList = categories.questionList;
    }, function(response){
      console.log("Fetching categories failed");
    });
  }

  return categories;

}])
