'use strict';

var expect = chai.expect;

describe('Exercises', function () {
  var exerciseService, exercisesCacheMock, exercisesCachePersistSpy,
      exercisesCacheFetchAllRawSpy;
  var today = moment().format('YYYY-MM-DD');

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    exercisesCacheMock = function () {
      this.persist = function () {};
      this.destroyAll = function () {};
      this.fetchAllRaw = function () {
        return [{'date': today}];
      };

      exercisesCachePersistSpy = sinon.spy(this, 'persist');
      exercisesCacheFetchAllRawSpy = sinon.spy(this, 'fetchAllRaw');
    };

    $provide.service('exerciseCache', exercisesCacheMock);
  }));

  beforeEach(inject(function (_exerciseService_) {
    exerciseService = _exerciseService_;
  }));

  describe('#getTodaysExercise', function () {
    it('do not retrieve an exercise if one exists for today', function () {
      exerciseService.getTodaysExercise();
      expect(exercisesCacheFetchAllRawSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getRandomExercise', function () {
    it('should return an expected exercise', function () {
      var randomExercise = exerciseService.getRandomExercise();
      expect(randomExercise).to.not.be.undefined;
      expect(randomExercise.id).to.be.at.least(1);
      expect(randomExercise.id).to.be.at.most(3);
    });
  });

  describe('#saveNewExercise', function () {
    it('should access the cache to persist a new exercise', function () {
      exerciseService.saveNewExercise({});
      expect(exercisesCachePersistSpy.calledOnce).to.equal(true);
    });
  });

  describe('#createTodaysExercise', function () {
    it('should populate todays exercise data', function () {
      var randomExercise = {};
      randomExercise.type = 'exercise1';
      randomExercise.description = 'exercise description';
      randomExercise.instructions = 'do the thing';

      var exercise = exerciseService.createTodaysExercise(randomExercise);

      expect(exercise.exerciseDay).to.not.be.null;
      expect(exercise.exerciseName).to.eq(randomExercise.type);
      expect(exercise.description).to.eq(randomExercise.description);
      expect(exercise.instructions).to.eq(randomExercise.instructions);
    });
  });

  describe('#getExercises', function () {
    it('should fetch all from the exercises cache', function () {
      exerciseService.getExercises();
      expect(exercisesCacheFetchAllRawSpy.calledOnce).to.eq(true);
    });
  });

});
