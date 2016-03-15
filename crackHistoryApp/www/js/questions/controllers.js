angular.module('questions', ['questionsSrv'])

.controller('categoriesCtrl', ['$scope', 'categoriesSrv', '$localStorage', function($scope, categoriesSrv, $localStorage){

  $scope.categories = $localStorage.categoryList;

}])

.controller('questionsCtrl', ['$scope', '$stateParams', '$ionicLoading', '$timeout', '$state', '$ionicPopup', '$localStorage', function($scope, $stateParams, $ionicLoading, $timeout, $state, $ionicPopup, $localStorage){
  console.log("hi");
  $scope.category = $localStorage.categoryList[$stateParams.id];
  var questions = $localStorage.questionList;

  $scope.currentCategory = $stateParams.id;
  $scope.currentQuestion = 0;
  $scope.question = questions[$scope.currentQuestion];
  $scope.choice = "";
  $scope.turn = false;

  $scope.check = function(){

      var selected = document.getElementById("radio" + $scope.choice).childNodes[0];
      $scope.turn = true;

      if($scope.choice != $scope.question.correct_answer){
        renderWrong($scope.question.correct_answer*2, selected);
        console.log("You are mistaken my dear!");
      }else{
        renderCorrect(selected);
        console.log("Good job man, I'm proud of you!");
      }

  };

  $scope.next = function(){

    $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-positive" ></ion-spinner>',
        animation: 'fade-in'
      });

    $timeout(function () {
      var selected = document.getElementById("radio" + $scope.choice).childNodes[0];
      $scope.currentQuestion++;
      $scope.turn = false;
      $scope.choice = "";

      if($scope.choice != $scope.question.correct_answer){
        clearQuestion($scope.question.correct_answer*2, selected);
      }else{
        clearQuestion(selected, null);
      }

      if($scope.category.count > $scope.currentQuestion){
        $scope.question = questions[$scope.currentQuestion];
        console.log("Next question time!");
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

  function renderCorrect(correct){
    correct.parentElement.style.borderColor = "#33CD5F";
    correct.parentElement.childNodes[1].childNodes[0].style.backgroundColor = "#33CD5F";
  }

  function renderWrong(correct, wrong){
    wrong.parentElement.parentElement.childNodes[correct].style.borderColor = "#33CD5F";
    wrong.parentElement.parentElement.childNodes[correct].childNodes[1].childNodes[0].style.backgroundColor = "#33CD5F";
    wrong.parentElement.parentElement.childNodes[correct].childNodes[1].childNodes[1].className = "checked-radio-icon disable-pointer-events icon ion-checkmark";
    //wrong.parentElement.parentElement.childNodes[correct].childNodes[1].childNodes[1].style.visibility = "visible";

    wrong.parentElement.style.borderColor = "#EF473A";
    wrong.parentElement.childNodes[1].childNodes[0].style.backgroundColor = "#EF473A";
    wrong.parentElement.childNodes[1].childNodes[1].className = "radio-icon disable-pointer-events icon ion-close";
  }

  function clearQuestion(correct, wrong){
    if(wrong != null){
      wrong.parentElement.parentElement.childNodes[correct].style.borderColor = "#dddddd";
      wrong.parentElement.parentElement.childNodes[correct].childNodes[1].childNodes[0].style.backgroundColor = "#FFFFFF";
      wrong.parentElement.parentElement.childNodes[correct].childNodes[1].childNodes[1].className = "radio-icon disable-pointer-events icon ion-checkmark";

      wrong.parentElement.style.borderColor = "#dddddd";
      wrong.parentElement.childNodes[1].childNodes[0].style.backgroundColor = "#FFFFFF";
      wrong.parentElement.childNodes[1].childNodes[1].className = "radio-icon disable-pointer-events icon ion-checkmark";
    }else {
      correct.parentElement.style.borderColor = "#dddddd";
      correct.parentElement.childNodes[1].childNodes[0].style.backgroundColor = "#FFFFFF";
    }
  }


}])
