(function() {
  'use strict';

  function ExerciseController(exerciseService, exerciseAnswerService, $modal) {
    this.todaysExercise = {};
    this.todaysExerciseAnswers = [];
    this.completeExercises = exerciseService.getExercises();
    this.exerciseAnswers = exerciseAnswerService.getExerciseAnswers();

    this.getTodaysExercise = function() {
      if(Object.keys(this.todaysExercise).length === 0 ||
         this.todaysExercise.exerciseDay !== moment().format('YYYY-MM-DD')) {
        this.todaysExercise = exerciseService.getTodaysExercise();
        this.todaysExerciseAnswers = exerciseAnswerService.
          getExerciseAnswers(this.todaysExercise.id);
      }

      return this.todaysExercise;
    };

    this.saveExerciseAnswers = function() {
      angular.forEach(
        this.todaysExerciseAnswers,
        function(answer) { answer.exerciseId = this.todaysExercise.id },
        this);
      exerciseAnswerService.saveExerciseAnswers(this.todaysExerciseAnswers);
    };

    this.showHelp = function (type) {
      var helpItems = this.todaysExercise.help[type];

      $modal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: function ($scope, $modalInstance, items, type) {
            $scope.items = items;
            $scope.type = type;
            if(type === 'exercise') {
              $scope.title = 'Why do 3 Good Things?';
            } else if(type === 'happiness') {
              $scope.title = 'Why does Happiness Help?';
            } else {
              $scope.title = type;
            }
            $scope.ok = function () {
              $modalInstance.close()
            };
        },
        resolve: {
          items: function () {
            return helpItems;
          },
          type: function(){
            return type
          }
        }
      });
    };

    this.showExerciseReview = function () {
      var exercises = this.completeExercises;
      var answers = this.exerciseAnswers;

      $modal.open({
        animation: true,
        templateUrl: 'exerciseReview.html',
        controller: function ($scope, $modalInstance, exercises, answers) {
          $scope.exercises = exercises;
          $scope.answers = answers;
          $scope.ok = function () {
            $modalInstance.close()
          };
        },
        resolve: {
          exercises: function () {
            return exercises;
          },
          answers: function() {
            return answers;
          }
        }
      });
    };

  }

  angular.module('sis.controllers')
    .controller('ExerciseController',
    ['exerciseService', 'exerciseAnswerService', '$modal', ExerciseController]);
})();
