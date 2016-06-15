'use strict';

var expect = chai.expect;

describe('EmaCache', function() {
  beforeEach(module('sis.services'));

  var emaCache;

  beforeEach(inject(function(_emaCache_) {
    emaCache = _emaCache_;
  }));

  describe('delegated methods', function() {
    it('implements #persist', function() {
      expect(emaCache.persist).not.to.be.undefined;
    });

    it('implements #fetchAllRaw', function() {
      expect(emaCache.fetchAllRaw).not.to.be.undefined;
    });
  });
});
