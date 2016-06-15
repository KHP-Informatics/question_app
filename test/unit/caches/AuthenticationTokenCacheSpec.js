'use strict';

var expect = chai.expect;

describe('AuthenticationToken', function() {
  beforeEach(module('sis.services'));

  var authenticationToken;

  beforeEach(inject(function(_authenticationTokenCache_) {
    authenticationToken = _authenticationTokenCache_;
  }));

  describe('delegated methods', function() {
    it('implements #first', function() {
      expect(authenticationToken.first).not.to.be.undefined;
    });

    it('implements #persist', function() {
      expect(authenticationToken.persist).not.to.be.undefined;
    });
  });
});
