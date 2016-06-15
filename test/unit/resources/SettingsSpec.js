'use strict';

var expect = chai.expect;

describe('Settings', function() {
  var $httpBackend, settings, cachePersistSpy;

  beforeEach(module('sis.resources'));

  beforeEach(module(function($provide) {
    $provide.service('settingsCache', function() {
      this.persist = function() {};
      cachePersistSpy = sinon.spy(this, 'persist');
    });
  }));

  beforeEach(inject(function(_$httpBackend_, _settings_) {
    $httpBackend = _$httpBackend_;
    settings = _settings_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#fetch', function() {
    it('persists the response with the device uuid', function() {
      var mockSettings = { configA: 1 };

      $httpBackend.expectGET('config.json').respond(mockSettings);
      settings.fetch();
      $httpBackend.flush();

      var settingsData = cachePersistSpy.args[0][0];

      expect(settingsData.configA).to.equal(mockSettings.configA);
    });
  });
});
