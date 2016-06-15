(function () {
  'use strict';

  function CigaretteLogController(cigaretteLogService, Routes, $location, uuid) {
    this.CURRENTLY_SMOKING = 'currentlySmoking';
    this.SMOKING_REASON = 'smokingReason';
    this.URGE_STRENGTH = 'urgeStrength';
    this.SMOKING_REASONS = ['Reduce craving',
                            'Soon going where I can’t smoke',
                            'Cope with negative emotion',
                            'Enhance positive emotion',
                            'Habit/automatic',
                            'Opportunity to socialize',
                            'Break from work/studying',
                            'Boredom/to kill time',
                            'other'];

    this.STATE_TIMING = 'timing';
    this.STATE_REASON = 'reason';
    this.STATE_URGE = 'urge';
    this.STATE_FINAL = 'final';
    this.LOG_HISTORICAL = false;
    this.ONE_CIGARETTE = false;

    // Initizalization state
    this.state = this.STATE_TIMING;
    this.cigaretteLog = {};

    this.getCurrentlySmoking = function() {
      return this.cigaretteLog[this.CURRENTLY_SMOKING];
    };

    this.saveCigaretteLog = function() {
      this.cigaretteLog.id = uuid();
      cigaretteLogService.saveCigaretteLog(this.cigaretteLog);
      this.cigaretteLog = {};
      $location.url(Routes.HOME);
    };

    this.setTiming = function(currentlySmoking) {
      this.cigaretteLog[this.CURRENTLY_SMOKING] = currentlySmoking;
      this.state = this.STATE_REASON;
    };

    this.setState = function(newState) {
      this.state = newState;
    }
  }

  angular.module('sis.controllers')
    .controller('CigaretteLogController',
    ['cigaretteLogService', 'Routes', '$location', 'uuid', CigaretteLogController]);
})();
