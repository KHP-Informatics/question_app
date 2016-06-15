(function() {
  'use strict';

  function scheduleQuitDay(configurationService) {
    return {
        restrict: 'E',
        template: 
          '<a id="cessation_date_selector" class="btn btn-info wide" onclick="$(\'#cessation_date_input\').click()">' +
          'Schedule Your Quit Day' + 
          '<strong> {{ getCessationDate().cessationDay | date:"MM/dd/yyyy" }} </strong>'+
          '</a>' +
          '<input id="cessation_date_input" type="text"'+
          'ng-model="cessationDate.cessationDay"' +
          'ng-change="setCessationDate()"'+
          'mobiscroll-date />',
        link: function (scope) { 
          angular.element('#cessation_date_input').mobiscroll().date();

          scope.cessationDate = null;

          scope.getCessationDate = function () {
            return configurationService.getCessationDate();
          };

          scope.setCessationDate = function () {
            configurationService.saveCessationDate(this.cessationDate);
          };     
        }
    };
  }

  angular.module('sis.directives')
    .directive(
        'schedulequitday', ['configurationService', scheduleQuitDay]
    );
})();