'use strict';

var expect = chai.expect;

describe('SmokingStatusController', function () {
  var controller, smokingStatusServiceMock,
      smokingStatusServiceSaveSmokingStatusSpy, smokingStatusServiceGetSmokingStatusSpy;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function ($provide) {
    smokingStatusServiceMock = function () {
      this.saveSmokingStatus = function () {
      };
      this.getSmokingStatus = function () {
      };
      smokingStatusServiceSaveSmokingStatusSpy = sinon.spy(this, 'saveSmokingStatus');
      smokingStatusServiceGetSmokingStatusSpy = sinon.spy(this, 'getSmokingStatus');
    };

    $provide.service('smokingStatusService', smokingStatusServiceMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function ($controller) {
    controller = $controller('SmokingStatusController');
  }));

  describe('#saveSmokingStatus', function () {
    it('should save new temptation log', function () {
      controller.saveSmokingStatus({});
      expect(smokingStatusServiceSaveSmokingStatusSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getSmokingStatus', function () {
    it('should populate a temptation log from the cache', function () {
      controller.getSmokingStatus();
      expect(smokingStatusServiceGetSmokingStatusSpy.calledOnce).to.equal(true);
    });
  });
});
