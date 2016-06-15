'use strict';

var expect = chai.expect;

describe('ConfigurationModal', function () {
  var $modalMock, configurationModalService, $modalMockOpenSpy;

  beforeEach(function() {
    $modalMock = {
      open: function () {}
    };
    $modalMockOpenSpy = sinon.spy($modalMock, 'open');
  });

  beforeEach(module('sis.services'));

  beforeEach(inject(function (_configurationModalService_) {
    configurationModalService = _configurationModalService_;
  }));

  describe('#openRiskyTimesModal', function () {
    it('delegate the modal creation to the $modal service.', function () {
      configurationModalService.openRiskyTimesModal($modalMock);
      expect($modalMockOpenSpy.calledOnce).to.equal(true);
    });
  });

  describe('#openCessationReasonsModal', function () {
    it('delegate the cessation reason modal creation to the $modal service.', function () {
      configurationModalService.openCessationReasonsModal($modalMock);
      expect($modalMockOpenSpy.calledOnce).to.equal(true);
    });
  });

  describe('#openSocialSupportModal', function () {
    it('delegate the social support modal creation to the $modal service.', function () {
      configurationModalService.openSocialSupportModal($modalMock);
      expect($modalMockOpenSpy.calledOnce).to.equal(true);
    });
  });
});
