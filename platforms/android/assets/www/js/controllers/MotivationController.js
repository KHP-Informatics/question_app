(function () {
  'use strict';

  function MotivationController(configurationService,
                                configurationModalService,
                                $routeParams,
                                $modal) {
    this.notificationId = $routeParams.notificationId;
    this.riskyTime = null;
    this.cessationReason = null;

    this.getRiskyTime = function() {
      var riskyTimeData = null;
      if(this.riskyTime === null) {
        riskyTimeData = configurationService.getRiskyTimesByNotificationId(this.notificationId);
      } else {
        riskyTimeData = this.riskyTime;
      }
      return riskyTimeData;
    };

    this.getRandomCessationReason = function() {
      var randomCessationReason = this.cessationReason;
      if(this.cessationReason === null) {
        var reasons = configurationService.getCessationReasons();
        randomCessationReason =
          this.cessationReason =
          reasons[Math.floor(Math.random() * reasons.length)];
      }
      return randomCessationReason;
    };

    this.openRiskyTimesModal = function () {
      configurationModalService.openRiskyTimesModal($modal);
    };
  }

  angular.module('sis.controllers')
    .controller('MotivationController',
    ['configurationService', 'configurationModalService',
     '$routeParams', '$modal', MotivationController]);
})();
