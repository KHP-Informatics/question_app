'use strict';

var expect = chai.expect;

describe('TemptationLogCache', function() {
  beforeEach(module('sis.services'));

  var temptationLogCache;

  beforeEach(inject(function(_temptationLogCache_) {
    temptationLogCache = _temptationLogCache_;
  }));

  describe('delegated methods', function() {
    it('implements #persist', function() {
      expect(temptationLogCache.persist).not.to.be.undefined;
    });
  });
});
