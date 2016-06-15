'use strict';

var expect = chai.expect;

describe('RiskyTimeCache', function() {
  beforeEach(module('sis.services'));

  var riskyTimeCache;

  beforeEach(inject(function(_riskyTimeCache_) {
    riskyTimeCache = _riskyTimeCache_;
  }));

  describe('delegated methods', function() {
    it('implements #first', function() {
      expect(riskyTimeCache.fetchAllRaw).not.to.be.undefined;
    });
    it('implements #fetchAllDirty', function() {
      expect(riskyTimeCache.fetchAllDirty).not.to.be.undefined;
    });
    it('implements #persist', function() {
      expect(riskyTimeCache.persist).not.to.be.undefined;
    });
    it('implements #destroyAll', function() {
      expect(riskyTimeCache.destroyAll).not.to.be.undefined;
    });
    it('implements #destroyItem', function() {
      expect(riskyTimeCache.destroyItem).not.to.be.undefined;
    });
    it('implements #markClean', function() {
      expect(riskyTimeCache.markClean).not.to.be.undefined;
    });
  });
});
