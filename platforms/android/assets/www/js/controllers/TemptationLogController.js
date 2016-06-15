(function() {
  'use strict';

  function TemptationLogController(temptationLogService, Routes, $location, uuid) {

    this.TEMPTATION_REASON = 'temptation_reason';
    this.URGE_STRENGTH = 'temptation_strength';
    this.TEMPTATION_REASONS = ['Reduce craving',
      'Soon going where I can’t smoke',
      'Cope with negative emotion',
      'Enhance positive emotion',
      'Habit/automatic',
      'Opportunity to socialize',
      'Break from work/studying',
      'Boredom/to kill time',
      'other'];
    this.STATE_REASON = 'reason';
    this.STATE_URGE = 'urge';
    this.STATE_FINAL = 'final';

    // Initizalization state
    this.state = this.STATE_REASON;
    this.temptationLog = {};

    this.saveTemptationLog = function() {
      this.temptationLog.id = uuid();
      temptationLogService.saveTemptationLog(this.temptationLog);
      this.temptationLog = {};
      $location.url(Routes.HOME);
    };

    this.setState = function(nextState) {
      this.state = nextState;
    };
  }

  angular.module('sis.controllers')
    .controller('TemptationLogController',
    ['temptationLogService', 'Routes', '$location', 'uuid', TemptationLogController]);
})();
