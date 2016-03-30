angular.module('questions', ['questionsSrv', 'questionsFltr'])

.controller('categoriesCtrl', ['$scope', '$localStorage', 'categoriesSrv', '$ionicLoading', '$timeout', function($scope, $localStorage, categoriesSrv, $ionicLoading, $timeout){

  if("checkData" in categoriesSrv){
    categoriesSrv.checkData().then(function(response){
      var newList = [];
      for(var key in response.data){
        newList.unshift(response.data[key]);
      }
      for(var i=0; i<newList.length; i++){
        console.log(newList[i].count, $localStorage.categoryList[i].count);
        if(newList[i].count != $localStorage.categoryList[i].count){
          console.log("New List");
          $localStorage.categoryList = newList;
          break;
        }
      }
    }, function(response){
      console.log("Data Update failed");
    });
    $scope.categoryList = $localStorage.categoryList;
    console.log("Category list already exists", $scope.categoryList);
  }else{
    categoriesSrv.showLoader();
    categoriesSrv.getData().then(function(response){
      $scope.categoryList = [];
      for(key in response.data){
        $scope.categoryList.unshift(response.data[key]);
      }
      $localStorage.categoryList = $scope.categoryList;
      if($localStorage.activity == undefined) $localStorage.activity = [];

      for(var i=0; i<$localStorage.categoryList.length; i++){
        $localStorage.activity.push({
          subject_id: $localStorage.categoryList[i].subject_id,
          category_id: i,
          questions: []
        });
      }

      $ionicLoading.hide();
    }, function(response){
      console.log("Fetching categories failed");
    });
  }

}])

.controller('questionsCtrl', ['$scope', '$stateParams', '$ionicLoading', '$timeout', '$state', '$ionicPopup', '$localStorage', '$interval', 'questionsByCatSrv',  function($scope, $stateParams, $ionicLoading, $timeout, $state, $ionicPopup, $localStorage, $interval, questionsByCatSrv){

  var timer;
  $scope.category = $localStorage.categoryList[$stateParams.id];
  $scope.questions = [];

  $scope.questions = $localStorage.questionList.filter(function(value){
    return value.category_id == (parseInt($stateParams.id) + 1);
  });

  if("checkData" in questionsByCatSrv){
    if(!questionsByCatSrv.checkData(parseInt($stateParams.id))){
      initQuestions(timer);
      console.log("Question list already exists", $scope.questions);
    }else{
      questionsByCatSrv.checkData(parseInt($stateParams.id)).process().then(function(response){
        console.log("fuck", response.data.questions);
        for(var i=0; i<$localStorage.questionList.length; i++){
          for(var j=0; j<response.data.questions.length; j++){
            console.log($localStorage.questionList[i], response.data.questions[j]);
            if($localStorage.questionList[i].id == response.data.questions[j].id)
              response.data.questions.splice(j, 1);
          }
        }

        $localStorage.questionList = $localStorage.questionList.concat(response.data.questions);

        $scope.questions = $localStorage.questionList.filter(function(value){
          return value.category_id == (parseInt($stateParams.id) + 1);
        });
        initQuestions(timer);
        console.log("Updated question list", $scope.questions);
      });
    }

  }else{

    questionsByCatSrv.showLoader();
    questionsByCatSrv.getData(parseInt($stateParams.id) + 1).then(function(response){

      $localStorage.questionList = $localStorage.questionList.concat(response.data.questions);
      $scope.questions = $localStorage.questionList.filter(function(value){
        return value.category_id == (parseInt($stateParams.id) + 1);
      });

      initQuestions(timer);
      $ionicLoading.hide();
    }, function(response){
      console.log("Fetching categories failed");
    });

  }




  $scope.check = function(){

      var selected = document.getElementById("radio" + $scope.currentCategory + $scope.choice).childNodes[0];
      $scope.turn = true;

      if($scope.choice != $scope.question.correct_answer){
        renderWrong($scope.question.correct_answer*2, selected);
        $scope.answers[1]++;
        console.log("You are mistaken my dear!");
      }else{
        renderCorrect(selected);
        $scope.answers[0]++;
        //$localStorage.activity[$scope.currentCategory].questions.push($scope.currentQuestion);
        console.log("Good job man, I'm proud of you!");
      }

  };

  $scope.next = function(){

    $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-positive" ></ion-spinner>',
        animation: 'fade-in'
      });

    $timeout(function () {
      var selected = document.getElementById("radio" + $scope.currentCategory + $scope.choice).childNodes[0];
      $scope.currentQuestion++;
      $scope.turn = false;
      $scope.choice = "";

      if($scope.choice != $scope.question.correct_answer){
        clearQuestion($scope.question.correct_answer*2, selected);
      }else{
        clearQuestion(selected, null);
      }

      if($scope.questions.length > $scope.currentQuestion){
        $scope.question = $scope.questions[$scope.currentQuestion];
        console.log("Next question time!");
      }else{
        $interval.cancel(timer);
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

  function initQuestions(timer){
      $scope.currentCategory = $stateParams.id;
      $scope.currentQuestion = 0;
      $scope.question = $scope.questions[$scope.currentQuestion];
      $scope.choice = "";
      $scope.turn = false;
      $scope.answers = [0, 0];
      $scope.time = 0;

      timer = $interval(function(){
        $scope.time++;
      }, 1000);
  }


  function renderCorrect(correct){
    correct.parentElement.style.borderColor = "#33CD5F";
    correct.parentElement.childNodes[1].childNodes[0].style.backgroundColor = "#33CD5F";
    console.log("fuck");
  }

  function renderWrong(correct, wrong){
    wrong.parentElement.parentElement.childNodes[correct].style.borderColor = "#33CD5F";
    wrong.parentElement.parentElement.childNodes[correct].childNodes[1].childNodes[0].style.backgroundColor = "#33CD5F";
    wrong.parentElement.parentElement.childNodes[correct].childNodes[1].childNodes[1].className = "checked-radio-icon disable-pointer-events icon ion-checkmark";
    //wrong.parentElement.parentElement.childNodes[correct].childNodes[1].childNodes[1].style.visibility = "visible";

    wrong.parentElement.style.borderColor = "#EF473A";
    wrong.parentElement.childNodes[1].childNodes[0].style.backgroundColor = "#EF473A";
    wrong.parentElement.childNodes[1].childNodes[1].className = "radio-icon disable-pointer-events icon ion-close";
    console.log("fuck this too");
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
