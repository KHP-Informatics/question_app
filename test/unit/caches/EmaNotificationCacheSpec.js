'use strict';

var expect = chai.expect;

describe('EmaNotificationCache', function() {
  beforeEach(module('sis.services'));

  var emaNotificationCache;

  beforeEach(inject(function(_emaNotificationCache_) {
    emaNotificationCache = _emaNotificationCache_;
  }));

  describe('delegated methods', function() {
    it('implements #fetchAllRaw', function() {
      expect(emaNotificationCache.fetchAllRaw).not.to.be.undefined;
    });
    it('implements #persist', function() {
      expect(emaNotificationCache.persist).not.to.be.undefined;
    });
    it('implements #fetch', function() {
      expect(emaNotificationCache.fetch).not.to.be.undefined;
    });
    it('implements #destroyAll', function() {
      expect(emaNotificationCache.destroyAll).not.to.be.undefined;
    });
  });
});
