'use strict';

var expect = chai.expect;

describe('CessationDateCache', function() {
  beforeEach(module('sis.services'));

  var cessationDateCache;

  beforeEach(inject(function(_cessationDateCache_) {
    cessationDateCache = _cessationDateCache_;
  }));

  describe('delegated methods', function() {
    it('implements #first', function() {
      expect(cessationDateCache.first).not.to.be.undefined;
    });
    it('implements #fetchAllDirty', function() {
      expect(cessationDateCache.fetchAllDirty).not.to.be.undefined;
    });
    it('implements #persist', function() {
      expect(cessationDateCache.persist).not.to.be.undefined;
    });
    it('implements #destroyAll', function() {
      expect(cessationDateCache.destroyAll).not.to.be.undefined;
    });
    it('implements #markClean', function() {
      expect(cessationDateCache.markClean).not.to.be.undefined;
    });
  });
});
