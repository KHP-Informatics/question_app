/* Declare app level module which depends on filters, and services */
(function() {
  'use strict';

  var Application = {
    self: this,

    configure: function configure($routeProvider, Routes) {
      $routeProvider
        .when(Routes.ROOT, {
          templateUrl: 'partials/home.html',
          controller: 'HomeController',
          controllerAs: 'home'
        })
        .when(Routes.HOME, {
          templateUrl: 'partials/home.html',
          controller: 'HomeController',
          controllerAs: 'home'
        })
        .when(Routes.SESSIONS, {
          templateUrl: 'partials/session.html',
          controller: 'SessionsController',
          controllerAs: 'session'
        })
        .when(Routes.HISTORY, {
          templateUrl: 'partials/smoking_history.html',
          controller: 'SmokingHistoryController',
          controllerAs: 'smokingHistory'
        });
        
    },

    run: function run($rootScope, $location, $q, $window, 
                      Routes, sessionQuestionService, resourceCache,
                      sessionsService, sessionsCache,
                      sessionAnswerCache) {

      function configurationIncompleteRouting() {

          $location.url(Routes.HOME);
      }

      function determineRouteFromState() {
          $location.url(Routes.HOME);
      }

    }
  };

  angular.module('sis.constants', []);
  angular.module('sis.directives',
      ['sis.controllers', 'sis.services','sis.constants']);
  angular.module('sis.resources',
      ['ngResource', 'sis.services', 'sis.constants']);
  angular.module('sis.controllers',
      ['sis.directives','sis.constants', 'sis.resources', 'sis.services', 'ui.bootstrap']);
  angular.module('sis.services',
      ['sis.resources', 'sis.constants']);
  angular.module('sis',
      ['ngRoute', 'mobiscroll-datetime', 'sis.controllers',
        'sis.resources', 'sis.services', 'sis.constants'])
      .config(['$routeProvider', 'Routes', Application.configure])
      .run(['$rootScope', '$location', '$q', '$window',
        'Routes', 
        'sessionQuestionService','resourceCache', 'sessionsService', 
        'sessionsCache',
        'sessionAnswerCache', Application.run]);
})();
