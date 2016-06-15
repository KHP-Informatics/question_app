'use strict';

var expect = chai.expect;

describe('AuthenticationToken', function() {
  var $httpBackend, authenticationToken, authenticationTokenCache;

  beforeEach(module('sis.resources'));

  beforeEach(module(function($provide) {
    $provide.service('authenticationTokenCache', function() {
      this.persist = function(token) {
        authenticationTokenCache = token;
      };
    });

    $provide.service('settingsCache', function() {
      this.first = function() {
        return { server: '//foo', clientUuid: 'my-client' };
      };
    });
  }));

  beforeEach(inject(function(_$httpBackend_, _authenticationToken_) {
    $httpBackend = _$httpBackend_;
    authenticationToken = _authenticationToken_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#create', function() {
    it('provides credentials to the server', function() {
      var data = { data: { type: 'authenticationTokens', clientUuid: 'my-client' } };
      $httpBackend.expectPOST('//foo/token_auth/api/authentication_tokens' +
                              '?configurationToken=my-token', data)
                  .respond();
      authenticationToken.create('my-token');
      $httpBackend.flush();
    });

    it('persists the response', function() {
      var mockAuthenticationToken = { data: { value: 'my-auth-token' } };

      $httpBackend.expectPOST('//foo/token_auth/api/authentication_tokens' +
                              '?configurationToken=my-config-token')
                  .respond(mockAuthenticationToken);
      authenticationToken.create('my-config-token');
      $httpBackend.flush();

      expect(authenticationTokenCache).to
        .deep.equal({ value: mockAuthenticationToken.data.value });
    });
  });
});
