(function() {
  'use strict';

  function highStockGraph() {
    return {
        restrict: 'E',
        template: '<div></div>',
        link: function (scope, element) { 
            Highcharts.StockChart(element[0], scope.chartConfig);
        }
    };
  }

  angular.module('sis.directives')
    .directive(
        'highstockgraph', [highStockGraph]
    );
})();