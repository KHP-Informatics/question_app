(function() {
  'use strict';

  var Routes = {
    ROOT: '/',
    HOME: '/home',
    SESSIONS: '/session',
  };

  angular.module('sis.constants')
         .constant('Routes', Routes);
})();
