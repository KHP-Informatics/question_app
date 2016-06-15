(function () {
  'use strict';

  function RiskyTimesEditController(configurationService, $modalInstance,
                                    riskyTimeToEdit, localNotifications) {
    this.riskyTime = {};
    this.riskyTimes = riskyTimeToEdit.currentState;
    this.riskyTimeIndex = riskyTimeToEdit.index;
    this.riskyTimeDescription = riskyTimeToEdit.description;
    this.riskyTimeStrategy = riskyTimeToEdit.strategy;
    this.riskyTimeNotificationId = riskyTimeToEdit.notificationId;
    this.riskyTimeDisplay = riskyTimeToEdit.time;

    this.updateNotification = function(riskyTime) {
      var NOTIFICATION_TEXT_MAX_SIZE = 100;
      var riskyDateTime = new Date(riskyTime.time);
      return {
        id: riskyTime.notificationId,
        title: 'Your strategy',
        text: riskyTime.strategy.substr(0, NOTIFICATION_TEXT_MAX_SIZE),
        firstAt: riskyDateTime,
        data: { notificationId: riskyTime.notificationId }
      };
    };

    this.updateRiskyTimeStrategy = function () {
      this.riskyTimes.splice(this.riskyTimeIndex, 1);
      this.riskyTime.time = this.riskyTimeTime;
      this.riskyTime.description = this.riskyTimeDescription;
      this.riskyTime.strategy = this.riskyTimeStrategy;
      this.riskyTime.notificationId = this.riskyTimeNotificationId;
      localNotifications.schedule(this.updateNotification(this.riskyTime));
      this.riskyTimes.splice(this.riskyTimeIndex, 0, this.riskyTime);
      configurationService.saveRiskyTimes(this.riskyTimes);
      $modalInstance.close();
    };

    this.cancel = function () {
      $modalInstance.close();
    };
  }

  angular.module('sis.controllers')
    .controller('RiskyTimesEditController',
    ['configurationService',
     '$modalInstance',
     'riskyTime',
     'localNotifications',
     RiskyTimesEditController]);
})();
