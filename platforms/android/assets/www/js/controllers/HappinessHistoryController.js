(function() {
  'use strict';

  function HappinessHistoryController(emaService, $scope) {

    this.scope = $scope;

    this.getHappinessHistoryData = function() {

      var happinessHistory = emaService.getHappinessHistory();
      var graphHistory = [];

      for (var i = 0; i < happinessHistory.length; i++) {
        if (!isNaN( new Date(happinessHistory[i].created_at).getTime())) {
          graphHistory.push(
            [
              new Date(happinessHistory[i].created_at).getTime(),
              parseInt(happinessHistory[i].answer)
            ]
          );
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
        rangeSelector: {
          selected: 1
        },

        title: {
          text: 'Your Happiness Score'
        },

        series: [{
          name: 'Happiness Score',
          data: this.getHappinessHistoryData(),
          tooltip: {
            valueDecimals: 0
          }
        }]
      };
    };

  angular.module('sis.controllers')
    .controller('HappinessHistoryController', ['emaService','$scope', HappinessHistoryController]);
})();