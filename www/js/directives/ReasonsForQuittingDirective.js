(function() {
  'use strict';

  function reasonsForQuitting($modal,configurationModalService) {
    return {
        restrict: 'E',
        template: 
          '<a class="btn btn-info wide" ng-click="openCessationReasonsModal()">'+
          'Your Reasons for Quitting' +
          '</a>',
        link: function (scope) { 
          scope.openCessationReasonsModal = function () {
            configurationModalService.openCessationReasonsModal($modal);
          };   
        }
    };
  }

  angular.module('sis.directives')
    .directive(
        'reasonsforquitting', ['$modal', 'configurationModalService', reasonsForQuitting]
    );
})();