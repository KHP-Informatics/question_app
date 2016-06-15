(function () {
  'use strict';

  function Exercise(exerciseCache, Exercises, uuid) {

    this.getRandomExercise = function() {
      var randomExerciseIndex = Math.floor((Math.random() * Exercises.length));
      return Exercises[randomExerciseIndex];
    };

    this.getTodaysExercise = function() {
      var exerciseData = exerciseCache.fetchAllRaw();
      var todaysExercise;
      for (var i = 0; exerciseData && i < exerciseData.length; i++) {
        if (exerciseData[i].exerciseDay === moment().format('YYYY-MM-DD')) {
          todaysExercise = exerciseData[i];
          break;
        }
      }
      if (!todaysExercise) {
        todaysExercise = this.createTodaysExercise(this.getRandomExercise());
        this.saveNewExercise(todaysExercise);
      }
      todaysExercise.help = this.getRandomExercise().help;
      return todaysExercise;
    };
    
    this.createTodaysExercise = function(randomExercise) {
      var todaysExercise = {};
      todaysExercise.exerciseDay = moment().format('YYYY-MM-DD');
      todaysExercise.type = exerciseCache.KEY;
      todaysExercise.exerciseName = randomExercise.type;
      todaysExercise.description = randomExercise.description;
      todaysExercise.instructions = randomExercise.instructions;
      todaysExercise.help = randomExercise.help;
      return todaysExercise;
    };

    this.saveNewExercise = function (exercise) {
      exercise.type = exerciseCache.KEY;
      exercise.id = uuid();
      var tempHelp = exercise.help;
      delete exercise.help;
      exerciseCache.persist(exercise);
      exercise.help = tempHelp;
    };

    this.getExercises = function() {
      return exerciseCache.fetchAllRaw();
    }
  }

  function ExerciseFactory(exerciseCache, Exercises, uuid) {
    return new Exercise(exerciseCache, Exercises, uuid);
  }

  angular.module('sis.services')
    .factory('exerciseService',
    ['exerciseCache', 'Exercises', 'uuid', ExerciseFactory]);
})();
