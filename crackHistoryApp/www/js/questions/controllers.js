angular.module('questions', ['questionsSrv'])

.controller('categoriesCtrl', ['$scope', 'categoriesSrv', function($scope, categoriesSrv){

  $scope.categories = JSON.parse(window.localStorage.getItem("categoryList"));

}])

.controller('questionsCtrl', ['$scope', '$stateParams', '$ionicLoading', function($scope, $stateParams,$ionicLoading){

  $scope.category = JSON.parse(window.localStorage.getItem("categoryList"))[$stateParams.id];
  var questions = JSON.parse(window.localStorage.getItem("questionList"));

  $scope.question = questions[0];
  $scope.choice = "here";
  $scope.turn = false;

  $scope.show = function(){
    $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>',
        duration: 500
      });
    console.log($scope.choice);
    if($scope.choice != $scope.question.correct_answer){
      console.log("You are mistaken my dear!");
    }else{
      console.log("Good job man, I'm proud of you!");
    }
    $scope.turn = true;
  };

}])
