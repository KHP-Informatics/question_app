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
        .when(Routes.CONFIG, {
          templateUrl: 'partials/configure.html',
          controller: 'ConfigurationController',
          controllerAs: 'config'
        })
        .when(Routes.HOME, {
          templateUrl: 'partials/home.html',
          controller: 'HomeController',
          controllerAs: 'home'
        }).when(Routes.SESSION_SUB_NAV, {
          templateUrl: 'partials/session_sub_nav.html',
          controller: 'SessionSubNavController',
          controllerAs: 'subSession'
        })
        .when(Routes.EXERCISE, {
          templateUrl: 'partials/exercise.html',
          controller: 'ExerciseController',
          controllerAs: 'exercise'
        })
        .when(Routes.TEMPTATION_LOG, {
          templateUrl: 'partials/temptation_log.html',
          controller: 'TemptationLogController',
          controllerAs: 'temptation'
        })
        .when(Routes.SMOKING_STATUS, {
          templateUrl: 'partials/smoking_status.html',
          controller: 'SmokingStatusController',
          controllerAs: 'smoking'
        })
        .when(Routes.CIGARETTE_LOG, {
          templateUrl: 'partials/common_ema.html',
          controller: 'EmaController',
          controllerAs: 'ema'
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
        })
        .when(Routes.EMA, {
          templateUrl: 'partials/common_ema.html',
          controller: 'EmaController',
          controllerAs: 'ema'
        })
        .when(Routes.HAPPINESS_HISTORY, {
          templateUrl: 'partials/happiness_history.html',
          controller: 'HappinessHistoryController',
          controllerAs: 'happinessHistory'
        })
        .when(Routes.MOTIVATION + '/notificationId/:notificationId', {
          templateUrl: 'partials/motivation.html',
          controller: 'MotivationController',
          controllerAs: 'motivation',
          resolve: { notification: function() {
            self.fromNotification = true;
            return true;
          }}
        });
    },

    run: function run($rootScope, $location, $q, $window, settings,
                      authenticationTokenCache, Routes, synchronizer,
                      deviceCache, device, configurationService,
                      emaService, eventService, sessionQuestionService,
                      sessionsService, cigaretteLogCache, configurationCache,
                      emaCache, exerciseCache, resourceCache, sessionsCache,
                      settingsCache, smokingStatusCache, temptationLogCache,
                      cessationReasonCache, cessationDateCache, riskyTimeCache,
                      socialSupportCache, emaAnswerCache, exerciseAnswerCache,
                      sessionAnswerCache) {

      function configurationIncompleteRouting() {
        var currentSessionNumber = sessionsService.currentSessionNumber();
        if((currentSessionNumber === 1 &&
          !sessionsService.isComplete(currentSessionNumber))) {
          $location.url(Routes.SESSIONS)
        } else {
          $location.url(Routes.HOME);
        }
      }

      function determineRouteFromState() {
        if (configurationService.configurationComplete()) {
          if(self.fromNotification) {
            self.fromNotification = false;
          } else {
            $location.url(Routes.HOME);
          }
        } else {
          configurationIncompleteRouting();
        }
      }

      settings.fetch().then(function() {
        if(!authenticationTokenCache.first()) {
          $location.url(Routes.CONFIG);
        } else {
          determineRouteFromState();
          $rootScope.$on('resume', function () {
            determineRouteFromState();
          });
        }
      });
      
      device.persistMetadata();

      angular.forEach([deviceCache, cigaretteLogCache, configurationCache,
                       emaCache, exerciseCache, resourceCache, sessionsCache,
                       smokingStatusCache, temptationLogCache,
                       cessationReasonCache, cessationDateCache, riskyTimeCache,
                       socialSupportCache, emaAnswerCache, exerciseAnswerCache,
                       sessionAnswerCache], function(cache) {
        synchronizer.registerCache(cache);
      });
      synchronizer.run();

      document.addEventListener('backbutton', eventService.handleBackButton, false);
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
      .run(['$rootScope', '$location', '$q', '$window', 'settings', 'authenticationTokenCache',
        'Routes', 'synchronizer', 'deviceCache', 'device', 'configurationService', 'emaService',
        'eventService', 'sessionQuestionService', 'sessionsService', 'cigaretteLogCache',
        'configurationCache', 'emaCache', 'exerciseCache', 'resourceCache', 'sessionsCache',
        'settingsCache', 'smokingStatusCache', 'temptationLogCache', 'cessationReasonCache',
        'cessationDateCache', 'riskyTimeCache', 'socialSupportCache', 'emaAnswerCache',
        'exerciseAnswerCache', 'sessionAnswerCache', Application.run]);
})();
