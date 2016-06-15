(function () {
  'use strict';

  function RiskyTimesController(configurationService,
                                $modal,
                                $modalInstance,
                                localNotifications,
                                uuid,
                                randomInt,
                                modalParameters,
                                RiskyTimesStrategies,
                                $sce) {

    this.NOTIFICATION_TEXT_MAX_SIZE = 100;
    this.FREQUENCY_ONCE = 'once';
    this.FREQUENCY_DAILY ='daily';
    this.FREQUENCY_WEEKLY = 'weekly';

    this.riskyTime = {};
    this.cessationReasons = configurationService.getCessationReasons();
    this.riskyTimes = configurationService.getRiskyTimes();
    this.strategies = [
      'negative emotions',
      'positive emotions',
      'social situations',
      'drinking alcohol',
      'habitual smoking',
      'wanting something to do with your hands'
    ];
    this.frequency = this.FREQUENCY_ONCE;

    this.saveRiskyTime = function () {
      this.riskyTime.id = uuid();
      this.riskyTime.notificationId = randomInt(1000,900000000);
      this.riskyTime.type = configurationService.RISKY_TIME_TYPE;

      if(this.riskyTime.time) {
        localNotifications.schedule(this.generateNotification(this.riskyTime));
      }

      if(this.frequency === this.FREQUENCY_WEEKLY) {
        this.riskyTime.description = this.riskyTime.description + ' (occurs weekly)';
      } else if(this.frequency === this.FREQUENCY_DAILY) {
        this.riskyTime.description = this.riskyTime.description + ' (occurs daily)';
      }

      configurationService.saveRiskyTimes(this.riskyTime);
      this.riskyTimes = configurationService.getRiskyTimes();
      this.resetButtons();
      this.riskyTime = {};
    };

    this.setNotification = function (riskyTime) {
      var notification = {};

      notification.title = 'SiS - Stay Smoke Free!';
      notification.text = 'Why:' + riskyTime.description.substr(0, this.NOTIFICATION_TEXT_MAX_SIZE/2);
      notification.text += '\nHow:' + riskyTime.strategy.substr(0, this.NOTIFICATION_TEXT_MAX_SIZE/2);

      return notification;
    };

    this.generateNotification = function(riskyTime) {
      var notification = this.setNotification(riskyTime);

      var notificationToReturn = {};
      notificationToReturn.id = riskyTime.notificationId;
      notificationToReturn.title = notification.title;
      notificationToReturn.text = notification.text;
      notificationToReturn.firstAt = riskyTime.time;
      if(this.frequency === this.FREQUENCY_WEEKLY) {
        notificationToReturn.every = 'week';
      } else if(this.frequency === this.FREQUENCY_DAILY) {
        notificationToReturn.every = 'day';
      }
      notificationToReturn.data = { notificationId: riskyTime.notificationId };

      return notificationToReturn;
    };

    this.deleteRiskyTime = function (riskyTimeId, notificationId) {
      localNotifications.clear(notificationId);
      configurationService.deleteRiskyTime(riskyTimeId);
      this.riskyTimes = configurationService.getRiskyTimes();
    };

    this.resetButtons = function () {
      this.activeButton = '';
      this.frequency = this.FREQUENCY_ONCE;
    };

    this.openEditModal = function (riskyTime,
                                   riskyDescription,
                                   riskyStrategy,
                                   riskyIndex,
                                   riskyTimeNotificationId) {
      var self = this;
      $modal.open({
        animation: true,
        templateUrl: 'partials/risky_times_edit.html',
        controller: 'RiskyTimesEditController',
        controllerAs: 'riskyEdit',
        size: 'lg',
        resolve: {
          riskyTime: function() {
            return { time: riskyTime,
                     description: riskyDescription,
                     strategy: riskyStrategy,
                     index: riskyIndex,
                     currentState: self.riskyTimes,
                     notificationId: riskyTimeNotificationId
            };
          }
        }
      });
    };

    this.cancel = function () {
      $modalInstance.close();
    };

    this.showStrategyHelp = function (strategy) {
      var strategyDescription = $sce.trustAsHtml(RiskyTimesStrategies[strategy]);

      $modal.open({
        animation: true,
        templateUrl: 'risky_time_strategy_help_details.html',
        controller: function ($scope, $modalInstance, strategyDescription) {
          $scope.title = strategy;
          $scope.description = strategyDescription;
          $scope.ok = function () {
            $modalInstance.close()
          };
        },
        resolve: {
          strategyDescription: function () {
            return strategyDescription;
          },
          title: function () {
            return strategy;
          }
        }
      });

    };

    this.showHelpCategories = function () {
      var strategyTypes = this.strategies;
      var self = this;

      $modal.open({
        animation: true,
        templateUrl: 'risky_time_strategy_help_categories.html',
        controller: function ($scope, $modalInstance, strategyTypes) {
          $scope.strategyTypes = strategyTypes;
          $scope.ok = function () {
            $modalInstance.close()
          };
          $scope.showStrategyHelp = function(strategy) {
            self.showStrategyHelp(strategy);
          }
        },
        resolve: {
          strategyTypes: function () {
            return strategyTypes;
          }
        },
      });
    };

    this.isModal = modalParameters.isModal || false;
    this.instructionContent = modalParameters.instructionContent || '';
  }

  angular.module('sis.controllers')
    .controller('RiskyTimesController',
    ['configurationService', '$modal', '$modalInstance',
     'localNotifications',
     'uuid', 'randomInt', 'modalParameters', 'RiskyTimesStrategies',
     '$sce', RiskyTimesController]);
})();
