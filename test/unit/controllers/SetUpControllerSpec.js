'use strict';

var expect = chai.expect;

describe('SetUpControllerSpec', function () {
  var controller,
    configurationServiceMock,
    configurationServiceGetCessationDateSpy,
    configurationServiceSaveCessationDate,
    configurationServiceConfigurationCompleteSpy,
    configurationModalServiceMock,
    configurationModalServiceOpenRiskyTimesModalSpy,
    configurationModalServiceOpenCessationReasonsModalSpy,
    configurationModalServiceOpenSocialSupportModalSpy;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function ($provide) {
    configurationServiceMock = function () {
      this.getCessationDate = function() {};
      this.saveCessationDate = function() {};
      this.configurationComplete = function() {};

      configurationServiceGetCessationDateSpy = sinon.spy(this, 'getCessationDate');
      configurationServiceSaveCessationDate = sinon.spy(this, 'saveCessationDate');
      configurationServiceConfigurationCompleteSpy = sinon.spy(this, 'configurationComplete');
    };

    configurationModalServiceMock = function() {
      this.openRiskyTimesModal = function () {};
      this.openCessationReasonsModal = function () {};
      this.openSocialSupportModal = function () {};
      configurationModalServiceOpenRiskyTimesModalSpy = sinon.spy(this, 'openRiskyTimesModal');
      configurationModalServiceOpenCessationReasonsModalSpy =
        sinon.spy(this, 'openCessationReasonsModal');
      configurationModalServiceOpenSocialSupportModalSpy =
        sinon.spy(this, 'openSocialSupportModal');
    };

    $provide.service('configurationService', configurationServiceMock);
    $provide.service('configurationModalService', configurationModalServiceMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function ($controller) {
    controller = $controller('SetUpController');
  }));

  describe('#getCessationDate', function () {
    it('should call the configuration services function to return\ ' +
      'the cessation date.', function () {
      controller.getCessationDate();
      expect(configurationServiceGetCessationDateSpy.calledOnce).to.equal(true);
    });
  });

  describe('#setCessationDate', function () {
    it('should delegate the persistence to the configuration service.', function () {
      controller.setCessationDate();
      expect(configurationServiceSaveCessationDate.calledOnce).to.equal(true);
    });
  });

  describe('#configurationComplete', function () {
    it('should check the configuration service for complete status.', function () {
      controller.configurationComplete();
      expect(configurationServiceConfigurationCompleteSpy.calledOnce).to.equal(true);
    });
  });

  describe('#openRiskyTimesModal', function() {
    it('should delegate the modal opening to the modal service.', function() {
      controller.openRiskyTimesModal();
      expect(configurationModalServiceOpenRiskyTimesModalSpy.calledOnce).to.equal(true);
    });
  });

  describe('#openCessationReasonsModal', function() {
    it('should delegate the cessation reason modal opening to the modal service.', function() {
      controller.openCessationReasonsModal();
      expect(configurationModalServiceOpenCessationReasonsModalSpy.calledOnce).to.equal(true);
    });
  });

  describe('#openSocialSupportModal', function() {
    it('should delegate the social support modal opening to the modal service.', function() {
      controller.openSocialSupportModal();
      expect(configurationModalServiceOpenSocialSupportModalSpy.calledOnce).to.equal(true);
    });
  });
});
