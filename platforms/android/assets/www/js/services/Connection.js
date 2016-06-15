(function() {
  'use strict';

  // Wraps the Cordova Network Information Plugin
  function Connection($window) {
    this.hasConnection = function() {
      var connection = $window.navigator.connection;
      return connection.type !== null;
    };
  }

  function ConnectionFactory($window) {
    return new Connection($window);
  }

  angular.module('sis.services')
         .factory('connection', ['$window', ConnectionFactory]);
})();
