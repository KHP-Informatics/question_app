(function () {
  'use strict';

  function HomeController(sessionsService, exerciseService,
                          exerciseAnswerService, smokingStatusService,
                          emaNotificationService, emaService) {
    this.CESSATION_SESSION_POST_DAY_OFFSET = sessionsService.CESSATION_SESSION_POST_DAY_OFFSET;
    this.CESSATION_SESSION_POST_DAY_OFFSET_PLURAL =
      sessionsService.CESSATION_SESSION_POST_DAY_OFFSET_PLURAL;
    this.CESSATION_SESSION_POST_DAY_OFFSET_SINGULAR =
      sessionsService.CESSATION_SESSION_POST_DAY_OFFSET_SINGULAR;

    this.CESSATION_SESSION_PRE = sessionsService.CESSATION_SESSION_PRE;
    this.CESSATION_SESSION_DURING = sessionsService.CESSATION_SESSION_DURING;
    this.CESSATION_SESSION_POST = sessionsService.CESSATION_SESSION_POST;

    this.SESSION_ID_1 = 1;
    this.SESSION_ID_2 = 2;
    this.SESSION_ID_3 = 3;

    this.TIME_LIMIT_IN_MINUTES = 15;

    this.todaysExercise = exerciseService.getTodaysExercise();
    this.smokingStatus = smokingStatusService.getSmokingStatus();
    this.todaysExerciseAnswers = exerciseAnswerService.
      getExerciseAnswers(this.todaysExercise.id);
    this.lastEmaNotification = emaNotificationService.lastEmaNotification();

    this.cessationSessionValue = null;
    this.cessationDayOffsetValue = null;
    this.cessationDayOffsetAbsValue = null;

    this.cessationDayOffset = function () {
      this.cessationDayOffsetValue = sessionsService.cessationDayOffset();
      return this.cessationDayOffsetValue;
    };

    this.cessationDayOffsetAbs = function () {
      this.cessationDayOffsetAbsValue = sessionsService.cessationDayOffsetAbs();
      return this.cessationDayOffsetAbsValue;
    };

    this.cessationSession = function (offset) {
      this.cessationSessionValue = sessionsService.cessationSession(offset);
      return this.cessationSessionValue;
    };

    this.getCurrentSession = function () {
      return this.cessationSession(this.cessationDayOffset());
    };

    this.isSessionComplete = function(sessionId) {
      return sessionsService.isComplete(sessionId);
    };

    this.emaNotificationRemainingTime = function() {
      var timeRemainingInMinutes = null;
      if(this.lastEmaNotification) {
        var notificationTime = moment(this.lastEmaNotification.at);
        var currentTime = moment();
        timeRemainingInMinutes = notificationTime.diff(currentTime, 'minutes') +
          this.TIME_LIMIT_IN_MINUTES;
      }
      return timeRemainingInMinutes;
    };

    this.showEmaAlert = function() {
      var isVisible = false;
      var remainingAlertTime = this.emaNotificationRemainingTime();
      if(remainingAlertTime && remainingAlertTime >= 0) {
        if(!emaService.getLastEma()) {
          isVisible = true;
        } else {
          var notificationTime = moment(this.lastEmaNotification.at);
          var lastEmaTime = moment(emaService.getLastEma().assessmentDate);
          if(notificationTime.diff(lastEmaTime, 'minutes') > 0) {
            isVisible = true;
          }
        }
      }
      return isVisible;
    };

  }

  angular.module('sis.controllers')
    .controller('HomeController',
    [ 'sessionsService',
      'exerciseService',
      'exerciseAnswerService',
      'smokingStatusService',
      'emaNotificationService',
      'emaService',
      HomeController]);
})();
