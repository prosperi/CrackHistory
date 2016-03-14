angular.module('questions', ['questionsSrv'])

.controller('categoriesCtrl', ['$scope', 'categoriesSrv', '$localStorage', function($scope, categoriesSrv, $localStorage){

  $scope.categories = $localStorage.categoryList;

}])

.controller('questionsCtrl', ['$scope', '$stateParams', '$ionicLoading', '$timeout', '$state', '$ionicPopup', '$localStorage', function($scope, $stateParams, $ionicLoading, $timeout, $state, $ionicPopup, $localStorage){

  $scope.category = $localStorage.categoryList[$stateParams.id];
  var questions = $localStorage.questionList;

  $scope.currentCategory = $stateParams.id;
  $scope.currentQuestion = $stateParams.question;
  $scope.question = questions[$scope.currentQuestion];
  $scope.choice = "";
  $scope.turn = false;

  $scope.check = function(){

      var selected = document.getElementsByClassName("radio" + $scope.choice)[$scope.currentQuestion].childNodes[0];

      if($scope.choice != $scope.question.correct_answer){

        selected.parentElement.parentElement.childNodes[$scope.question.correct_answer*2].style.borderColor = "#33CD5F";
        selected.parentElement.parentElement.childNodes[$scope.question.correct_answer*2].childNodes[1].childNodes[0].style.backgroundColor = "#33CD5F";
        selected.parentElement.parentElement.childNodes[$scope.question.correct_answer*2].childNodes[1].childNodes[1].className = "radio-icon disable-pointer-events icon ion-checkmark";
        selected.parentElement.parentElement.childNodes[$scope.question.correct_answer*2].childNodes[1].childNodes[1].style.visibility = "visible";

        selected.parentElement.style.borderColor = "#EF473A";
        selected.parentElement.childNodes[1].childNodes[0].style.backgroundColor = "#EF473A";
        selected.parentElement.childNodes[1].childNodes[1].className = "radio-icon disable-pointer-events icon ion-close";
        console.log("You are mistaken my dear!");

      }else{
        selected.parentElement.style.borderColor = "#33CD5F";
        selected.parentElement.childNodes[1].childNodes[0].style.backgroundColor = "#33CD5F";
        console.log("Good job man, I'm proud of you!");
      }

      $scope.turn = true;



  };

  $scope.next = function(){

    $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-positive" ></ion-spinner>',
        animation: 'fade-in'
      });

    $timeout(function () {
      $scope.currentQuestion++;
      if($scope.category.count > $scope.currentQuestion){
        $state.go('app.category', { id: $scope.currentCategory, question: $scope.currentQuestion});
      }else{
        $state.go('app.dashboard');
      }
      $ionicLoading.hide();
    }, 500);

  };

  $scope.info = function(){
    $ionicPopup.alert({
      title: "დამატებითი ინფორმაცია",
      template: $scope.question.info,
      okText: "დახურვა"
    });
  };


}])
