(function() {
  'use strict';

  function SmokingStatusController(smokingStatusService, Routes, $location) {

    this.smokingStatusDescriptions = [
      'I\’m preparing for my quit day!',
      'I\’m still abstinent since quitting!',
      'I slipped, but I’m still trying.',
      'I’m no longer quitting.'
    ];
    this.smokingStatus = '';

    this.getSmokingStatus = function() {
      this.smokingStatus = smokingStatusService.getSmokingStatus();
      return this.smokingStatus;
    };

    this.saveSmokingStatus = function(status) {
      smokingStatusService.saveSmokingStatus(status);
      $location.url(Routes.HOME);
    };
  }

  angular.module('sis.controllers')
    .controller('SmokingStatusController',
    ['smokingStatusService', 'Routes', '$location', SmokingStatusController]);
})();
