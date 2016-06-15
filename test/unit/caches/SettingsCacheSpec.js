'use strict';

var expect = chai.expect;

describe('SettingsCache', function() {
  beforeEach(module('sis.services'));

  var settingsCache;

  beforeEach(inject(function(_settingsCache_) {
    settingsCache = _settingsCache_;
  }));

  describe('delegated methods', function() {
    it('implements #first', function() {
      expect(settingsCache.first).not.to.be.undefined;
    });

    it('implements #persist', function() {
      expect(settingsCache.persist).not.to.be.undefined;
    });
  });
});
