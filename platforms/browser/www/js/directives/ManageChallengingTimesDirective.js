(function() {
  'use strict';

  function manageChallengingTimes($modal,configurationModalService) {
    return {
        restrict: 'E',
        template: 
          '<a class="btn btn-info wide" ng-click="openRiskyTimesModal()">' +
          'Managing Your Challenging Times' +
          '</a>',
        link: function (scope) { 
          scope.openRiskyTimesModal = function () {
            configurationModalService.openRiskyTimesModal($modal);
          }; 
        }
    };
  }

  angular.module('sis.directives')
    .directive(
        'managechallengingtimes', ['$modal', 'configurationModalService', manageChallengingTimes]
    );
})();