'use strict';

var expect = chai.expect;

describe('ExercisesController', function() {
  var controller,
    exerciseServiceMock, exerciseServiceGetTodaysExerciseSpy,
    exerciseAnswerServiceMock, exerciseAnsersServiceGetExerciseAnswersSpy,
    exerciseAnsersServiceSaveExerciseAnswersSpy;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function($provide) {
    exerciseServiceMock = function() {
      this.updateExercise = function() {};
      this.getTodaysExercise = function() { return {} };
      this.getExercises = function() { return [] };
      exerciseServiceGetTodaysExerciseSpy = sinon.spy(this, 'getTodaysExercise');
    };

    exerciseAnswerServiceMock = function() {
      this.getExerciseAnswers = function() {};
      this.saveExerciseAnswers = function() {};
      exerciseAnsersServiceGetExerciseAnswersSpy = sinon.spy(this, 'getExerciseAnswers');
      exerciseAnsersServiceSaveExerciseAnswersSpy = sinon.spy(this, 'saveExerciseAnswers');
    };

    $provide.service('exerciseService', exerciseServiceMock);
    $provide.service('exerciseAnswerService', exerciseAnswerServiceMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function($controller) {
      controller = $controller('ExerciseController');
  }));

  describe('#saveExerciseAnswers', function() {
    it('should save exercise answers using appropriate service', function() {
      controller.saveExerciseAnswers();
      expect(exerciseAnsersServiceSaveExerciseAnswersSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getTodaysExercise', function() {
    it('should populate a question for today upon initialization and check for existing answers',
      function() {
        controller.getTodaysExercise();
        expect(exerciseServiceGetTodaysExerciseSpy.calledOnce).to.equal(true);
        expect(exerciseAnsersServiceGetExerciseAnswersSpy.calledTwice).to.equal(true);
    });
  });
});
