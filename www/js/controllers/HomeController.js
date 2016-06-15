(function () {
  'use strict';

  function HomeController() {

    this.appName = 'RADAR';
  
  }

  angular.module('sis.controllers')
    .controller('HomeController',
    [ HomeController]);
})();
