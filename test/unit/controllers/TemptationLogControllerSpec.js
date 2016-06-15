'use strict';

var expect = chai.expect;

describe('TemptationLogController', function() {
  var controller, temptationLogServiceMock, temptationLogServiceSaveTemptationLogSpy;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function($provide) {
    temptationLogServiceMock = function() {
      this.saveTemptationLog = function() {};
      temptationLogServiceSaveTemptationLogSpy = sinon.spy(this, 'saveTemptationLog');
    };

    $provide.service('temptationLogService', temptationLogServiceMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function($controller) {
    controller = $controller('TemptationLogController');
  }));

  describe('#saveTemptationLog', function() {
    it('should save new temptation log and clear current log', function() {
      controller.saveTemptationLog();
      expect(temptationLogServiceSaveTemptationLogSpy.calledOnce).to.equal(true);
      expect(Object.keys(controller.temptationLog).length === 0).to.equal(true);
    });
  });
});
