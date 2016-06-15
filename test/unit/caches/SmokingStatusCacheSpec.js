'use strict';

var expect = chai.expect;

describe('SmokingStatusCache', function() {
  beforeEach(module('sis.services'));

  var smokingStatusCache;

  beforeEach(inject(function(_smokingStatusCache_) {
    smokingStatusCache = _smokingStatusCache_;
  }));

  describe('delegated methods', function() {
    it('implements #fetchAll', function() {
      expect(smokingStatusCache.fetchAll).not.to.be.undefined;
    });

    it('implements #persist', function() {
      expect(smokingStatusCache.persist).not.to.be.undefined;
    });
  });
});
