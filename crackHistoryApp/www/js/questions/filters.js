angular.module('questionsFltr', [])

.filter('timerFilter', function(){
  return function(value){
    var seconds = 0,
        minutes = 0,
        currentTime = "";
    seconds = value % 60;
    minutes = (value - seconds)/60;

    if(minutes == 0){
      currentTime += "00:";
    }else if(minutes > 0 && minutes<10){
      currentTime += "0" + minutes + ":";
    }else{
      currentTime += minutes;
    }

    if(seconds == 0){
      currentTime += "00";
    }else if(seconds > 0 && seconds<10){
      currentTime += "0" + seconds;
    }else{
      currentTime += seconds;
    }

    return currentTime;
  };
})
