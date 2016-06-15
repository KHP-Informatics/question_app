(function() {
  'use strict';

  function SmokingHistoryController(emaService, $scope) {

    this.scope = $scope;

    this.getSmokingHistoryData = function() {

      var smokingHistory = emaService.getSmokingHistory();
      var graphHistory = [];

      function setFirstCigaretteLogDay (smokingHistoryItem){
          graphHistory.push([new Date(smokingHistoryItem.cigaretteCountDate).getTime(),
            smokingHistoryItem.answer
          ]);
      }

      function sumItemsOnSameDay(currentItem,lastItem){
         if (new Date(currentItem.cigaretteCountDate).getTime() == new Date(lastItem.cigaretteCountDate).getTime()) {
                    graphHistory[graphHistory.length - 1][1] = graphHistory[graphHistory.length - 1][1] + currentItem.answer;
           } else {
             graphHistory.push([new Date(smokingHistory[i].cigaretteCountDate).getTime(),
               smokingHistory[i].answer
             ]);
         }
      }

      setFirstCigaretteLogDay(smokingHistory[0]);

      for (var i = 0; i < smokingHistory.length; i++) {
        if (i > 0) {
         sumItemsOnSameDay(smokingHistory[i],smokingHistory[i-1]);
        } 
      }

      return graphHistory;
    }

    // create the chart
    this.scope.chartConfig = {

        navigator : {
          enabled : false
        },
        chart: {
          width:$(document).width()-35
        },
        title: {
          text: 'Smoking History'
        },

        yAxis: [{
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: ''
          },
          height: '0',
          lineWidth: 2
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: '# of cigarettes smoked'
          },
          top: '10%',
          height: '90%',
          offset: 0,
          lineWidth: 2
        }],

        series: [{
          type: 'column',
          name: 'Cigarettes Smoked',
          data: this.getSmokingHistoryData(),
          yAxis: 1,
          dataGrouping: {
            units: [
              [
                'week', // unit name
                [1, 2, 3] // allowed multiples
              ],
              [
                'month', [1]
              ]
            ]
          }
        }]
    }
  }

  angular.module('sis.controllers')
    .controller('SmokingHistoryController', ['emaService','$scope', SmokingHistoryController]);
})();