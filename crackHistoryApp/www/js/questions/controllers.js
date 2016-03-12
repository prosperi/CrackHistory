angular.module('questions', ['questionsSrv'])

.controller('categoriesCtrl', ['$scope', 'categoriesSrv', function($scope, categoriesSrv){

  $scope.categories = JSON.parse(window.localStorage.getItem("categoryList"));

}])

.controller('questionsCtrl', ['$scope', '$stateParams', '$ionicLoading', '$timeout', '$state', '$ionicPopup', function($scope, $stateParams, $ionicLoading, $timeout, $state, $ionicPopup){

  $scope.category = JSON.parse(window.localStorage.getItem("categoryList"))[$stateParams.id];
  var questions = JSON.parse(window.localStorage.getItem("questionList"));

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
        $state.go('app.finished');
      }
      $ionicLoading.hide();
    }, 500);

  };

  $scope.info = function(){
    $ionicPopup.alert({
      title: "დამატებითი ინფორმაცია",
      template: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      okText: "დახურვა"
    });
  };


}])

.controller('finishedCtrl', function(){

  var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    },
    {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
    },
    {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
    }

  ];

  var ctx = document.getElementById("myChart").getContext("2d");
  var myNewChart = new Chart(ctx).PolarArea(data);

})
