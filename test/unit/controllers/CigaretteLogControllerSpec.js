'use strict';

var expect = chai.expect;

describe('CigaretteLogController', function() {
  var controller, cigaretteLogServiceMock, cigaretteLogServiceSaveCigaretteLogSpy;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function($provide) {
    cigaretteLogServiceMock = function() {
      this.saveCigaretteLog = function() {};
      cigaretteLogServiceSaveCigaretteLogSpy = sinon.spy(this, 'saveCigaretteLog');
    };

    $provide.service('cigaretteLogService', cigaretteLogServiceMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function($controller) {
      controller = $controller('CigaretteLogController');
  }));

  describe('#saveCigaretteLog', function() {
    it('should save new cigarette log and clear current log', function() {
      controller.saveCigaretteLog();
      expect(cigaretteLogServiceSaveCigaretteLogSpy.calledOnce).to.equal(true);
      expect(Object.keys(controller.cigaretteLog).length === 0).to.equal(true);
    });
  });

  describe('#setTiming', function() {
    it('should update the timing of the controller to REASON', function() {
      controller.setTiming(true);
      expect(controller.state).to.equal(controller.STATE_REASON);
    });
  });
});
