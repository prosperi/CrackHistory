angular.module('questions', ['questionsSrv'])

.controller('categoriesCtrl', ['$scope', 'categoriesSrv', function($scope, categoriesSrv){

  categoriesSrv.categoryList().then(function(response){
    $scope.$parent.categories = [];
    for(key in response.data){
      $scope.$parent.categories.unshift(response.data[key]);
    }
  }, function(response){
    console.log("Fetching categories failed");
  });


}])

.controller('questionsCtrl', ['$scope', '$stateParams', 'categoriesSrv', function($scope, $stateParams, categoriesSrv){

  $scope.category = $scope.$parent.categories[$stateParams.id];
  console.log($scope.category);

}])
