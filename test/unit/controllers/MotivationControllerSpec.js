'use strict';

var expect = chai.expect;

describe('MotivationControllerSpec', function () {
  var controller,
    configurationServiceMock,
    $routeParamsMock,
    configurationServiceGetRiskyTimesByNotificationIdSpy,
    configurationServiceSaveCessationDateGetCessationReasonsSpy,
    configurationModalServiceMock,
    configurationModalServiceOpenRiskyTimesModalSpy;
  var RISKY_TIME_DATA = ['the riskiest times'];
  var CESSATION_REASONS = ['I\'m a quitter!'];
  var NOTIFICATION_ID = 'ABC124';

  beforeEach(module('sis.controllers'));

  beforeEach(module(function ($provide) {
    configurationServiceMock = function () {
      this.getRiskyTimesByNotificationId = function() { return RISKY_TIME_DATA };
      this.getCessationReasons = function() { return CESSATION_REASONS };

      configurationServiceGetRiskyTimesByNotificationIdSpy =
        sinon.spy(this, 'getRiskyTimesByNotificationId');
      configurationServiceSaveCessationDateGetCessationReasonsSpy =
        sinon.spy(this, 'getCessationReasons');
    };

    configurationModalServiceMock = function() {
      this.openRiskyTimesModal = function () {};
      this.openCessationReasonsModal = function () {};
      configurationModalServiceOpenRiskyTimesModalSpy = sinon.spy(this, 'openRiskyTimesModal');
    };

    $routeParamsMock = function () {
      this.notificationId = NOTIFICATION_ID;
    };

    $provide.service('configurationService', configurationServiceMock);
    $provide.service('$routeParams', $routeParamsMock);
    $provide.service('configurationModalService', configurationModalServiceMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function ($controller) {
    controller = $controller('MotivationController');
  }));

  describe('#getRiskyTime', function () {
    it('should call the configuration services function to return the risky time.', function () {
      var riskyTimeReturned = controller.getRiskyTime();
      expect(configurationServiceGetRiskyTimesByNotificationIdSpy.calledOnce).to.equal(true);
      expect(riskyTimeReturned).to.equal(RISKY_TIME_DATA);
    });

    it('should return the saved risky time if it is already \ ' +
      'populated on the controller.', function () {
      controller.riskyTime = RISKY_TIME_DATA;
      var riskyTimeReturned = controller.getRiskyTime();
      expect(configurationServiceGetRiskyTimesByNotificationIdSpy.calledOnce).to.equal(false);
      expect(riskyTimeReturned).to.equal(RISKY_TIME_DATA);
    });
  });

  describe('#getRandomCessationReason', function () {
    it('should retrieve a random cessation reason from the configuration service.', function () {
      controller.getRandomCessationReason();
      expect(configurationServiceSaveCessationDateGetCessationReasonsSpy.calledOnce).to.equal(true);
    });

    it('should return the saved random cessation reason if it \i' +
      's already populated on the controller.', function () {
      controller.cessationReason = CESSATION_REASONS;
      controller.getRandomCessationReason();
      expect(configurationServiceSaveCessationDateGetCessationReasonsSpy.calledOnce).
        to.equal(false);
    });
  });

  describe('#openRiskyTimesModal', function() {
    it('should delegate the modal opening to the modal service.', function() {
      controller.openRiskyTimesModal();
      expect(configurationModalServiceOpenRiskyTimesModalSpy.calledOnce).to.equal(true);
    });
  });
});
