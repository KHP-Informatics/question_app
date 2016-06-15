(function () {
  'use strict';

  function SessionAnswer(sessionAnswerCache, uuid) {
    this.sessionId = null;

    this.save = function (sessionAnswers, sessionId) {
      this.sessionId = sessionId;
      angular.forEach(sessionAnswers, this.saveSessionAnswer, this);
    };

    this.saveSessionAnswer = function(answer) {
      if(!answer.id) {
        answer.id = uuid();
      }
      answer.sessionId = this.sessionId;
      answer.type = sessionAnswerCache.KEY;
      sessionAnswerCache.persist(answer);
    }

  }

  function SessionAnswerFactory(sessionAnswerCache, uuid) {
    return new SessionAnswer(sessionAnswerCache, uuid);
  }

  angular.module('sis.services')
    .factory('sessionAnswerService',
    ['sessionAnswerCache', 'uuid', SessionAnswerFactory]);
})();
