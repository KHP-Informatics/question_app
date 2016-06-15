'use strict';

describe('Payloads', function() {
  var $httpBackend, payloads;
  var authenticationTokenCache = function() {};

  beforeEach(module('sis.resources'));

  beforeEach(module(function($provide) {
    $provide.service('authenticationTokenCache', authenticationTokenCache);

    $provide.service('settingsCache', function() {
      this.first = function() {
        return { server: '//foo', clientUuid: 'my-client' };
      };
    });
  }));

  beforeEach(inject(function(_$httpBackend_, _payloads_) {
    $httpBackend = _$httpBackend_;
    payloads = _payloads_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#persist', function() {
    describe('when there is an authentication token available', function() {
      it('provides credentials to the server', function() {
        authenticationTokenCache.prototype.first = function() {
          return { value: 'my-auth-token' };
        };
        $httpBackend.expectPOST('//foo/api/payloads?clientUuid=my-client',
          { data: [ { foo: 'bar' }, { baz: 'qux' } ] },
          {
            'X-AUTH-TOKEN': 'my-auth-token',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8'
          }).respond();
        payloads.persist([ { foo: 'bar' }, { baz: 'qux' } ]);
        $httpBackend.flush();
      });
    });

    describe('when there is not an authentication token available', function() {
      it('does not make a request', function() {
        authenticationTokenCache.prototype.first = function() {};
        payloads.persist([ { foo: 'bar' }, { baz: 'qux' } ]);
        // there is no expectation here because the afterEach verifications
        // will fail if an unexpected request is made
      });
    });
  });

  describe('#fetch', function() {
    describe('when there is an authentication token available', function() {
      it('provides credentials to the server', function() {
        authenticationTokenCache.prototype.first = function() {
          return { value: 'my-auth-token' };
        };
        $httpBackend.expectGET('//foo/api/payloads?clientUuid=my-client',
          {
            'X-AUTH-TOKEN': 'my-auth-token',
            'Accept': 'application/json, text/plain, */*'
          }).respond();
        payloads.fetch();
        $httpBackend.flush();
      });
    });

    describe('when there is not an authentication token available', function() {
      it('does not make a request', function() {
        authenticationTokenCache.prototype.first = function() {};
        payloads.fetch();
        // there is no expectation here because the afterEach verifications
        // will fail if an unexpected request is made
      });
    });
  });
});
