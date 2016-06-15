(function () {
  'use strict';

  function ExerciseAnswer(exerciseAnswerCache, $filter, uuid) {

    this.getExerciseAnswers = function(exerciseId) {
      return exerciseId ? $filter('filter')(exerciseAnswerCache.
          fetchAllRaw(exerciseAnswerCache.KEY), { exerciseId: exerciseId }, true) : exerciseAnswerCache.fetchAllRaw();
    };

    this.saveExerciseAnswers = function (exerciseAnswers) {
      angular.forEach(exerciseAnswers, this.saveExerciseAnswer);
    };

    this.saveExerciseAnswer = function(answer) {
      if(!answer.id) {
        answer.id = uuid();
      }
      answer.type = exerciseAnswerCache.KEY;
      exerciseAnswerCache.persist(answer);
    }
  }

  function ExerciseAnswerFactory(exerciseAnswerCache, $filter, uuid) {
    return new ExerciseAnswer(exerciseAnswerCache, $filter, uuid);
  }

  angular.module('sis.services')
    .factory('exerciseAnswerService',
    ['exerciseAnswerCache', '$filter', 'uuid', ExerciseAnswerFactory]);
})();
