'use strict';

var expect = chai.expect;

describe('CessationReasonsController', function () {
  var controller, configurationServiceMock,
    configurationServiceSaveCessationReasonsSpy,
    configurationServiceGetCessationReasonsSpy,
    configurationServiceDeleteCessationReasonsSpy,
    $modalInstanceMock,
    $modalInstanceCloseSpy,
    modalParametersMock;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function ($provide) {
    configurationServiceMock = {
      saveCessationReasons: function () {},
      getCessationReasons: function () { return [] },
      deleteCessationReason: function () { return true }
    };
    configurationServiceSaveCessationReasonsSpy =
      sinon.spy(configurationServiceMock, 'saveCessationReasons');
    configurationServiceGetCessationReasonsSpy =
      sinon.spy(configurationServiceMock, 'getCessationReasons');
    configurationServiceDeleteCessationReasonsSpy =
      sinon.spy(configurationServiceMock, 'deleteCessationReason');

    $modalInstanceMock = function() {
      this.close = function() {};
      $modalInstanceCloseSpy = sinon.spy(this, 'close');
    };

    modalParametersMock = function() {
      this.isModal = true;
      this.instructionContent = '';
    };

    $provide.service('modalParameters', modalParametersMock);
    $provide.constant('configurationService', configurationServiceMock);
    $provide.service('$modalInstance', $modalInstanceMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function ($controller) {
    controller = $controller('CessationReasonsController');
  }));

  describe('#saveCessationReason', function () {
    beforeEach(inject(function () {
      localStorage.clear();
    }));

    it('updates cessation reasons through config service if valid cessation reason description',
      function () {
        controller.cessationReason.description = 'This is a valid cessation reason.';
        controller.saveCessationReason();
        expect(configurationServiceSaveCessationReasonsSpy.calledOnce).to.equal(true);
        expect(configurationServiceGetCessationReasonsSpy.calledTwice).to.equal(true);
    });

    it('should ignore, invalid (empty) cessation reasons', function () {
      controller.cessationReasons = [];
      controller.saveCessationReason();
      expect(controller.cessationReasons.length).to.equal(0);
    });
  });

  describe('#deleteCessationReason', function () {
    it('should use the configuration service to delete a reason, then get the updated array',
      function () {
        controller.deleteCessationReason('12345');
        expect(configurationServiceDeleteCessationReasonsSpy.calledOnce).to.be.true;
        expect(configurationServiceGetCessationReasonsSpy.calledTwice).to.be.true;
    });
  });

  describe('#cancel', function () {
    it('should delegate the modal view close call to the modalInstance service', function () {
      controller.cancel();
      expect($modalInstanceCloseSpy.calledOnce).to.equal(true);
    });
  });

});
