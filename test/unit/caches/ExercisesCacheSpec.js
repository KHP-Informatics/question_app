'use strict';

var expect = chai.expect;

describe('ExercisesCache', function() {

  var exercisesCache;

  beforeEach(module('sis.services'));

  beforeEach(inject(function(_exerciseCache_) {
    exercisesCache = _exerciseCache_;
  }));

  describe('delegated methods', function() {
    it('implements #persist', function() {
      expect(exercisesCache.persist).not.to.be.undefined;
    });

    it('implements #fetchAllRaw', function() {
      expect(exercisesCache.fetchAllRaw).not.to.be.undefined;
    });

    it('implements #destroyAll', function() {
      expect(exercisesCache.destroyAll).not.to.be.undefined;
    });
  });
});
