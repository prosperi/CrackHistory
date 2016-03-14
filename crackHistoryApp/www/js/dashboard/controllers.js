angular.module('dashboard', [])

.controller('dashboardCtrl', [ '$scope', '$timeout', function($scope, $timeout){

  $scope.data = [];
  $scope.results = [];
  var colors = ['#387EF5', '#11C1F3', '#33CD5F', '#FFC900', '#EF473A', '#886AEA', '#c0392b', '#16a085', '#d35400', '#34495e'];
  var generateColor = function(){
    if(colors.length>0){
       return colors.shift();
     }else {
        colors = ['#387EF5', '#11C1F3', '#33CD5F', '#FFC900', '#EF473A', '#886AEA', '#c0392b', '#16a085', '#d35400', '#34495e'];
        return colors.shift();
     }
  };
  var options = {
      responsive: true,
      segmentShowStroke: false,
      animateRotate: true,
      animateScale: false,
      percentageInnerCutout: 50,
      tooltipTemplate: "<%= value %>%"
  };

  for(var i=0; i<7; i++){
    $scope.data[i] = Object.create({
      value: '10',
      color: generateColor(),
      label: 'ისტორია ' + (i + 1)
    });
  }

  $scope.results = [
    [
      {
        value: '70',
        color: generateColor(),
        label: 'სწორი'
      },
      {
        value: '30',
        color: generateColor(),
        label: 'არასწორი'
      }
    ],
    [
      {
        value: '70',
        color: generateColor(),
        label: 'სწორი'
      },
      {
        value: '30',
        color: generateColor(),
        label: 'არასწორი'
      }
    ],
    [
      {
        value: '70',
        color: generateColor(),
        label: 'სწორი'
      },
      {
        value: '30',
        color: generateColor(),
        label: 'არასწორი'
      }
    ],
    [
      {
        value: '70',
        color: generateColor(),
        label: 'სწორი'
      },
      {
        value: '30',
        color: generateColor(),
        label: 'არასწორი'
      }
    ],
    [
      {
        value: '70',
        color: generateColor(),
        label: 'სწორი'
      },
      {
        value: '30',
        color: generateColor(),
        label: 'არასწორი'
      }
    ],
    [
      {
        value: '70',
        color: generateColor(),
        label: 'სწორი'
      },
      {
        value: '30',
        color: generateColor(),
        label: 'არასწორი'
      }
    ],
    [
      {
        value: '70',
        color: generateColor(),
        label: 'სწორი'
      },
      {
        value: '30',
        color: generateColor(),
        label: 'არასწორი'
      }
    ]
  ];

  $scope.repeatTimes = new Array(Math.ceil($scope.results.length/2));


  $timeout(function () {
    for(var i = 0; i < $scope.results.length; i++){
        var canvas = document.getElementById("result-"+i).getContext("2d");
        var option = options;
        option.percentageInnerCutout = 0;
        var resultChart = new Chart(canvas).Pie($scope.results[i], option);
        document.getElementById('legend-'+i).innerHTML += resultChart.generateLegend();
    }
  }, 10);


  var ctx = document.getElementById("myChart").getContext("2d");
  var historyChart = new Chart(ctx).Doughnut($scope.data, options);
  document.getElementById('js-legend').innerHTML += historyChart.generateLegend();

}])
