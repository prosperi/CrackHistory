angular.module('questions', [])

.controller('categoriesCtrl', ['$scope', '$http', function($scope,$http){

  $http({
    method: "GET",
    url: "https://notgiorgi.com/api/category/"
  }).then(function(response){
    $scope.categories = response.data;
    console.log($scope.categories);
  }, function(response){
    console.log("Fetching categories failed");
  });

}])

.controller('questionsCtrl', ['$scope', function($scope){

}])
