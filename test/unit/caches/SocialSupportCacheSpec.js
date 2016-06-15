'use strict';

var expect = chai.expect;

describe('SocialSupportCache', function() {
  beforeEach(module('sis.services'));

  var socialSupportCache;

  beforeEach(inject(function(_socialSupportCache_) {
    socialSupportCache = _socialSupportCache_;
  }));

  describe('delegated methods', function() {
    it('implements #first', function() {
      expect(socialSupportCache.fetchAllRaw).not.to.be.undefined;
    });
    it('implements #fetchAllDirty', function() {
      expect(socialSupportCache.fetchAllDirty).not.to.be.undefined;
    });
    it('implements #persist', function() {
      expect(socialSupportCache.persist).not.to.be.undefined;
    });
    it('implements #destroyAll', function() {
      expect(socialSupportCache.destroyAll).not.to.be.undefined;
    });
    it('implements #destroyItem', function() {
      expect(socialSupportCache.destroyItem).not.to.be.undefined;
    });
    it('implements #markClean', function() {
      expect(socialSupportCache.markClean).not.to.be.undefined;
    });
  });
});
