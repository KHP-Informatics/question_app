'use strict';

var expect = chai.expect;

describe('ExerciseAnswer', function () {
  var exerciseAnswerService,
      exerciseAnswerCacheMock,
      exerciseAnswerCachePersistSpy;

  var exerciseAnswerKey = 'exerciseAnswerKey';

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    exerciseAnswerCacheMock = function () {
      this.KEY = exerciseAnswerKey;
      this.persist = function () {};

      exerciseAnswerCachePersistSpy = sinon.spy(this, 'persist');
    };

    $provide.service('exerciseAnswerCache', exerciseAnswerCacheMock);
  }));

  beforeEach(inject(function (_exerciseAnswerService_) {
    exerciseAnswerService = _exerciseAnswerService_;
  }));

  describe('#saveExerciseAnswers', function () {
    it('trigger the persistence of multiple answers.', function () {
      exerciseAnswerService.saveExerciseAnswers(['answer1', 'answer2']);
      expect(exerciseAnswerCachePersistSpy.calledTwice).to.equal(true);
    });
  });

  describe('#saveExerciseAnswer', function () {
    it('should set the type and id of the answer given, then persist.', function () {
      exerciseAnswerService.saveExerciseAnswer({});
      expect(exerciseAnswerCachePersistSpy.calledOnce).to.equal(true);
      expect(exerciseAnswerCachePersistSpy.args[0][0].id).to.not.be.null;
      expect(exerciseAnswerCachePersistSpy.args[0][0].type).to.equal(exerciseAnswerKey);
    });
  });

});
