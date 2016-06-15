(function() {
  'use strict';

  function ExerciseAnswer(cache) {
    this.KEY = 'participantExerciseQuestionAnswers';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'fetchAllRaw');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
  }

  function ExerciseAnswerCache(resourceCache) {
    return new ExerciseAnswer(resourceCache);
  }

  angular.module('sis.services')
    .factory('exerciseAnswerCache',
    ['resourceCache', ExerciseAnswerCache]);
})();
