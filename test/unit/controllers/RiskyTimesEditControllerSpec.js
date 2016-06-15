'use strict';

var expect = chai.expect;

describe('RiskyTimesEditController', function () {

  var controller, configurationServiceMock,
    modalInstanceMock,
    modalInstanceCloseSpy,
    riskyTimeToEdit,
    configurationServiceSaveRiskyTimesSpy,
    localNotificationsMock,
    localNotificationsServiceScheduleSpy;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function ($provide) {
    configurationServiceMock = function () {
      this.saveRiskyTimes = function () {
      };
      configurationServiceSaveRiskyTimesSpy = sinon.spy(this, 'saveRiskyTimes');
    };

    modalInstanceMock = function () {
      this.close = function () {
      };
      modalInstanceCloseSpy = sinon.spy(this, 'close');
    };

    riskyTimeToEdit = function () {
      return {
        currentState: [],
        index: 1,
        description: 'risky business',
        time: 'sometime',
        day: 'someday',
        strategy: 'stratego'
      };
    };

    localNotificationsMock = function () {
      this.schedule = function() {
      };
      localNotificationsServiceScheduleSpy = sinon.spy(this, 'schedule')
    };

    $provide.service('configurationService', configurationServiceMock);
    $provide.service('$modalInstance', modalInstanceMock);
    $provide.service('riskyTime', riskyTimeToEdit);
    $provide.service('localNotifications', localNotificationsMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function ($controller) {
    controller = $controller('RiskyTimesEditController');
  }));

  describe('#updateRiskyTimeStrategy', function() {
    it('should use the configuration service to save the updated risky time.', function () {
      controller.updateRiskyTimeStrategy();
      expect(configurationServiceSaveRiskyTimesSpy.calledOnce).to.equal(true);
      expect(localNotificationsServiceScheduleSpy.calledOnce).to.equal(true);
      expect(configurationServiceSaveRiskyTimesSpy.args[0].description)
        .to.equal(riskyTimeToEdit.description);
      expect(configurationServiceSaveRiskyTimesSpy.args[0].time).to.equal(riskyTimeToEdit.time);
      expect(configurationServiceSaveRiskyTimesSpy.args[0].day).to.equal(riskyTimeToEdit.day);
    });
  });

  describe('#cancel', function() {
    it('should invoke the close function on the modal.', function () {
      controller.cancel();
      expect(modalInstanceCloseSpy.calledOnce).to.equal(true);
    });
  });

});
