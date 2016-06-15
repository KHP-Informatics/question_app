'use strict';

var expect = chai.expect;

describe('ConfigurationCache', function() {
  beforeEach(module('sis.services'));

  var configurationCache;

  beforeEach(inject(function(_configurationCache_) {
    configurationCache = _configurationCache_;
  }));

  describe('delegated methods', function() {
    it('implements #first', function() {
      expect(configurationCache.first).not.to.be.undefined;
    });

    it('implements #persist', function() {
      expect(configurationCache.persist).not.to.be.undefined;
    });
  });
});
