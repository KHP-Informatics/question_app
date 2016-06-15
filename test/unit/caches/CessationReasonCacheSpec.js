'use strict';

var expect = chai.expect;

describe('CessationReasonCache', function() {
  beforeEach(module('sis.services'));

  var cessationReasonCache;

  beforeEach(inject(function(_cessationReasonCache_) {
    cessationReasonCache = _cessationReasonCache_;
  }));

  describe('delegated methods', function() {
    it('implements #first', function() {
      expect(cessationReasonCache.fetchAllRaw).not.to.be.undefined;
    });
    it('implements #fetchAllDirty', function() {
      expect(cessationReasonCache.fetchAllDirty).not.to.be.undefined;
    });
    it('implements #persist', function() {
      expect(cessationReasonCache.persist).not.to.be.undefined;
    });
    it('implements #destroyAll', function() {
      expect(cessationReasonCache.destroyAll).not.to.be.undefined;
    });
    it('implements #destroyItem', function() {
      expect(cessationReasonCache.destroyItem).not.to.be.undefined;
    });
    it('implements #markClean', function() {
      expect(cessationReasonCache.markClean).not.to.be.undefined;
    });
  });
});
