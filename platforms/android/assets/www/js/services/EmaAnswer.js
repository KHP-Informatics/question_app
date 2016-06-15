(function () {
  'use strict';

  function EmaAnswer(emaAnswerCache, uuid) {
    this.emaId = null;

    this.saveEmaAnswers = function (emaAnswers, emaId) {
      this.emaId = emaId;
      angular.forEach(emaAnswers, this.saveEmaAnswer, this);
    };

    this.saveEmaAnswer = function(answer) {
      answer.id = uuid();
      answer.emaId = this.emaId;
      answer.type = emaAnswerCache.KEY;
      emaAnswerCache.persist(answer);
    }

  }

  function EmaAnswerFactory(emaAnswerCache, uuid) {
    return new EmaAnswer(emaAnswerCache, uuid);
  }

  angular.module('sis.services')
    .factory('emaAnswerService',
    ['emaAnswerCache', 'uuid', EmaAnswerFactory]);
})();
