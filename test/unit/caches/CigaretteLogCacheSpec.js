'use strict';

var expect = chai.expect;

describe('CigaretteLogCache', function() {
  beforeEach(module('sis.services'));

  var cigaretteLogCache;

  beforeEach(inject(function(_cigaretteLogCache_) {
    cigaretteLogCache = _cigaretteLogCache_;
  }));

  describe('delegated methods', function() {
    it('implements #persist', function() {
      expect(cigaretteLogCache.persist).not.to.be.undefined;
    });
  });
});
