'use strict';

var expect = chai.expect;

describe('SocialSupportController', function () {
  var controller, configurationServiceMock,
      configurationServiceSaveSocialSupportSpy,
      configurationServiceDeleteSocialSupportSpy,
      $modalInstanceMock,
      $modalInstanceCloseSpy,
      modalParametersMock;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function ($provide) {
    configurationServiceMock = {
      saveSocialSupport: function () {},
      getSocialSupport: function () {},
      deleteSocialSupport: function() {}
    };
    configurationServiceSaveSocialSupportSpy =
      sinon.spy(configurationServiceMock, 'saveSocialSupport');
    configurationServiceDeleteSocialSupportSpy =
      sinon.spy(configurationServiceMock, 'deleteSocialSupport');

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
    controller = $controller('SocialSupportController');
  }));

  describe('#saveSocialSupport', function () {
    it('save the new social support locally, persist it, the reset fields.', function () {
      controller.socialSupport = {};
      controller.socialSupport.name = 'William Wallace';
      controller.socialSupport.reason = 'FREEDOM!';
      controller.socialSupports = [];
      controller.saveSocialSupport();
      expect(configurationServiceSaveSocialSupportSpy.calledOnce).to.equal(true);
      expect(controller.socialSupport.name).to.be.undefined;
      expect(controller.socialSupport.reason).to.be.undefined;
    });
  });

  describe('#deleteSocialSupport', function () {
    it('removes the social support from the local copy and persists the change.', function () {
      var socialSupport = [
        {id: 0, name:'support1'},
        {id: 1, name:'support2'}
      ];
      controller.socialSupports = socialSupport;
      configurationServiceMock.getSocialSupport = function() {return [{id: 0, name:'support1'}]};
      controller.deleteSocialSupport(1);
      expect(controller.socialSupports.length).to.equal(1);
      expect(controller.socialSupports[0].name).to.equal('support1');
      expect(configurationServiceDeleteSocialSupportSpy.calledOnce).to.equal(true);
    });
  });

  describe('#cancel', function () {
    it('delegates the closing of the social support modal to\ ' +
      'the $modalInstance service.', function () {
      controller.cancel();
      expect($modalInstanceCloseSpy.calledOnce).to.equal(true);
    });
  });

  describe('#hasSocialSupports', function () {
    it('Returns a boolean value (false) indicating that social\ ' +
      'supports currently do not exist.', function () {
      controller.socialSupports = [];
      expect(controller.hasSocialSupports()).to.equal(false);
    });

    it('Returns a boolean value (true) indicating the existence of social supports.', function () {
      controller.socialSupports = ['social support'];
      expect(controller.hasSocialSupports()).to.equal(true);
    });
  });
});
