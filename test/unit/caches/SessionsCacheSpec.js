'use strict';

var expect = chai.expect;

describe('SessionsCache', function() {
  beforeEach(module('sis.services'));

  var sessionsCache;

  beforeEach(inject(function(_sessionsCache_) {
    sessionsCache = _sessionsCache_;
  }));

  describe('delegated methods', function() {
    it('implements #first', function() {
      expect(sessionsCache.first).not.to.be.undefined;
    });

    it('implements #persist', function() {
      expect(sessionsCache.persist).not.to.be.undefined;
    });

    it('implements #destroyAll', function() {
      expect(sessionsCache.destroyAll).not.to.be.undefined;
    });
  });
});
