(function () {
  'use strict';

  function Session(sessionsCache) {

    // Cessation session states
    this.CESSATION_SESSION_PRE = 'pre_cessation';
    this.CESSATION_SESSION_DURING = 'cessation';
    this.CESSATION_SESSION_POST = 'post_cessation';
    this.SESSION_KEY_PREFIX = 'session_';

    this.CESSATION_SESSION_POST_DAY_OFFSET = 7;
    this.CESSATION_SESSION_POST_DAY_OFFSET_PLURAL = -5;
    this.CESSATION_SESSION_POST_DAY_OFFSET_SINGULAR = -6;

    this.cessationDate = null;

    this.getCessationDate = function () {
      this.cessationDate = new Date();
      return this.cessationDate;
    };

    this.saveSession = function (session) {
      session.type = sessionsCache.KEY;
      sessionsCache.persist(session);
    };

    // Returns the cessation session state relative to an
    // offset in days for the cessation day.
    this.cessationSession = function (offset) {
      var session;
      if (offset > 0) {
        session = this.CESSATION_SESSION_PRE;
      } else if (offset <= 0 && offset > this.CESSATION_SESSION_POST_DAY_OFFSET_SINGULAR) {
        session = this.CESSATION_SESSION_DURING;
      } else if (offset <= this.CESSATION_SESSION_POST_DAY_OFFSET_SINGULAR) {
        session = this.CESSATION_SESSION_POST;
      }
      return session;
    };

    // Finds the offset in days from the cessation day.
    this.cessationDayOffset = function () {
      if (this.getCessationDate()) {
        var cessationDay = moment(this.getCessationDate().cessationDay);
        var today = moment().startOf('day');
        return cessationDay.diff(today, 'days');
      }
    };

    // Finds the absolute value of the offset in days
    // from the cessation day.
    this.cessationDayOffsetAbs = function () {
      return Math.abs(this.cessationDayOffset());
    };

    // Returns a numerical representation of the current session.
    this.currentSessionNumber = function () {
      var sessionNumber;
      switch(this.cessationSession(this.cessationDayOffset())) {
        case this.CESSATION_SESSION_PRE:
          sessionNumber = 1;
          break;
        case this.CESSATION_SESSION_DURING:
          sessionNumber = 2;
          break;
        case this.CESSATION_SESSION_POST:
          sessionNumber = 3;
          break;
        default: // No Cessation Date set
          sessionNumber = 1;
      }
      return sessionNumber;
    };

    this.isComplete = function (sessionNumber) {
      var isComplete = false;
      var sessionData = sessionsCache.fetchAllRaw();
      if(sessionData){
        for(var i = 0; i < sessionData.length; i++) {
          if(sessionData[i].sessionType == this.SESSION_KEY_PREFIX + sessionNumber) {
            isComplete = true;
            break;
          }
        }
      }
      return isComplete;
    };
  }

  function SessionFactory(sessionsCache) {
    return new Session(sessionsCache);
  }

  angular.module('sis.services')
    .factory('sessionsService',
    ['sessionsCache', SessionFactory]);
})();
