(function() {
  'use strict';

  var CONFIG_TOKEN_LENGTH = 5;

  function ConfigurationController($route, $location, authenticationToken, Routes, connection) {
    var self = this;
    this.configurationToken = 'offline';
    this.alert = '';


    this.createAuthenticationToken = function createAuthenticationToken() {
      authenticationToken.create()
          .then(function() {
            $location.url(Routes.SESSIONS);
          })
          .catch(function() {
            self.alert = 'unable to configure application';
          });

      if(this.configurationToken === 'offline') {
        authenticationToken.createFakeToken();
        $location.url(Routes.SESSIONS);
      }
    };

    this.hasConnection = function() {
      var hasConnection = connection.hasConnection();
      if(hasConnection) {
        this.createAuthenticationToken();
      }
      return hasConnection;
    };

    this.refresh = function() {
      $route.reload();
    };
  }

  angular.module('sis.controllers')
      .controller('ConfigurationController',
      ['$route', '$location', 'authenticationToken', 'Routes',
        'connection', ConfigurationController]);
})();
