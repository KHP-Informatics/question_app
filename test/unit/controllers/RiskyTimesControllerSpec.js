'use strict';

var expect = chai.expect;

describe('RiskyTimesController', function () {
  var RISKY_TIMES = ['such risk', 'much time'];

  var controller, configurationServiceMock,
    localNotificationsMock,
    configurationServiceSaveRiskyTimesSpy,
    localNotificationsScheduleSpy,
    $modalMock,
    $modalOpenSpy,
    $modalInstanceMock,
    modalParametersMock;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function ($provide) {
    configurationServiceMock = function () {
      this.saveRiskyTimes = function () {
      };
      this.getRiskyTimes = function () {
        return RISKY_TIMES
      };
      this.getCessationReasons = function () {
        return [{
          description: 'cessation reason description',
          title: 'cessation reason title'
        }];
      };
      configurationServiceSaveRiskyTimesSpy = sinon.spy(this, 'saveRiskyTimes');
    };

    $modalMock = function () {
      this.open = function() {
        return {
          result: {then: function() {}}
        }
      };
      $modalOpenSpy = sinon.spy(this, 'open');
    };

    $modalInstanceMock = function() {
      this.open = function() {};
    };

    localNotificationsMock = function () {
      this.schedule = function () {
      };
      this.clear = function () {
      };
      localNotificationsScheduleSpy = sinon.spy(this, 'schedule');
    };

    modalParametersMock = function() {
      this.isModal = true;
      this.instructionContent = '';
    };

    $provide.service('configurationService', configurationServiceMock);
    $provide.service('localNotifications', localNotificationsMock);
    $provide.service('$modal', $modalMock);
    $provide.service('$modalInstance', $modalInstanceMock);
    $provide.service('modalParameters', modalParametersMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function ($controller) {
    controller = $controller('RiskyTimesController');
  }));

  describe('#saveRiskyTime', function () {
    it('should scrub controller\' riskyTime object, after a successful save.', function () {
      controller.riskyTime.time = new Date();
      controller.riskyTime.description = 'Some description.';
      controller.riskyTime.strategy = 'Some strategy.';
      controller.frequency = controller.FREQUENCY_WEEKLY;
      controller.saveRiskyTime();
      expect(controller.riskyTime.time).to.equal(undefined);
      expect(controller.frequency).to.equal(controller.FREQUENCY_ONCE);
      expect(configurationServiceSaveRiskyTimesSpy.calledOnce).to.equal(true);
      expect(localNotificationsScheduleSpy.calledOnce).to.equal(true);
    });

    it('should append an indication of weekly repeating in description.', function () {
      var description = 'Some description.';

      controller.riskyTime.time = new Date();
      controller.riskyTime.description = description;
      controller.riskyTime.strategy = 'Some strategy.';
      controller.frequency = controller.FREQUENCY_WEEKLY;

      controller.saveRiskyTime();

      expect(configurationServiceSaveRiskyTimesSpy.calledOnce).to.equal(true);
      expect(configurationServiceSaveRiskyTimesSpy.getCall(0).args[0].description).
        to.equal(description + ' (occurs weekly)');
    });

    it('should append an indication of daily repeating in description.', function () {
      var description = 'Some description.';

      controller.riskyTime.time = new Date();
      controller.riskyTime.description = description;
      controller.riskyTime.strategy = 'Some strategy.';
      controller.frequency = controller.FREQUENCY_DAILY;

      controller.saveRiskyTime();

      expect(configurationServiceSaveRiskyTimesSpy.calledOnce).to.equal(true);
      expect(configurationServiceSaveRiskyTimesSpy.getCall(0).args[0].description).
        to.equal(description + ' (occurs daily)');
    });
  });

  describe('#setNotification', function () {
    it('creates a notification specific to strategy when a strategy is set.', function () {
      var STRATEGY = 'fabian';
      var riskyTime = { strategy: STRATEGY };
      var notification = controller.setNotification(riskyTime);
      expect(notification.title).to.equal('Your strategy');
      expect(notification.text).to.equal(STRATEGY);
    });
  });

  describe('#openEditModal', function () {
    it('delegates the opening of the risky time edit modal to the $modal service.', function () {
      controller.openEditModal(null, null, null, null, null, null);
      expect($modalOpenSpy.calledOnce).to.equal(true);
    });
  });
});
