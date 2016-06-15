'use strict';

var expect = chai.expect;

describe('LocalSessionCache', function() {
  beforeEach(module('sis.services'));

  var localSessionCache;

  beforeEach(inject(function(_localSessionCache_) {
    localSessionCache = _localSessionCache_;
  }));

  describe('delegated methods', function() {
    it('implements #first', function() {
      expect(localSessionCache.first).not.to.be.undefined;
    });
    it('implements #persist', function() {
      expect(localSessionCache.persist).not.to.be.undefined;
    });
    it('implements #destroyAll', function() {
      expect(localSessionCache.destroyAll).not.to.be.undefined;
    });
  });
});
