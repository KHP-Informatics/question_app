'use strict';

var expect = chai.expect;

describe('DeviceCache', function() {
  beforeEach(module('sis.services'));

  var deviceCache;

  beforeEach(inject(function(_deviceCache_) {
    deviceCache = _deviceCache_;
  }));

  describe('delegated methods', function() {
    it('implements #fetchAllDirty', function() {
      expect(deviceCache.fetchAllDirty).not.to.be.undefined;
    });

    it('implements #persist', function() {
      expect(deviceCache.persist).not.to.be.undefined;
    });

    it('implements #markClean', function() {
      expect(deviceCache.markClean).not.to.be.undefined;
    });
  });
});
