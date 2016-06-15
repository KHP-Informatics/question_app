(function() {
  'use strict';

  function sessionNav() {
    return {
        restrict: 'E',
        template: 
        '<span ng-repeat="section in sections">' + 
        '<a class="btn btn-info wide" ' +
        'href="#/session?startLabel={{section.startLabel}}' +
        '&start={{section.startVariable}}' +
        '&end={{section.endVariable}}' +
        '&returnRoute={{returnTo}}"' +
        'ng-show="section.sessionAvailable <= 1">' +
        '{{ section.label }}' +
        '</a><br/><br/></span>',
        scope:{
          sections: '=',
          returnTo: '='        
        }
    };
  }

  angular.module('sis.directives')
    .directive(
        'sessionnav', [sessionNav]
    );
})();