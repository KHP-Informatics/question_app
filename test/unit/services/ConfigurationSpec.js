'use strict';

var expect = chai.expect;

describe('Configuration', function() {
  beforeEach(module('sis.services'));

  var service,
      configurationCacheMock,
      cessationDateServiceMock,
      cessationDateServiceSaveSpy,
      cessationDateServiceGetCessationDateSpy,
      cessationReasonServiceMock,
      cessationReasonServiceGetCessationReasonsSpy,
      riskyTimeServiceMock,
      riskyTimeServiceGetRiskyTimesSpy,
      socialSupportServiceMock,
      socialSupportServiceGetSocialSupportsSpy,
      localNotificationsMock,
      localNotificationsScheduleSpy,
      localNotificationsClearSpy,
      emaNotificationServiceMock,
      emaNotificationServiceSaveSpy,
      emaNotificationServiceDeleteAllSpy,
      localSessionServiceMock,
      localSessionServiceGetNumberOfCigarettesSpy;

  beforeEach(module(function ($provide) {
    localNotificationsMock = {
      schedule: function() {},
      clear: function() {}
    };
    localNotificationsScheduleSpy = sinon.spy(localNotificationsMock, 'schedule');
    localNotificationsClearSpy = sinon.spy(localNotificationsMock, 'clear');

    configurationCacheMock = {
      persist: function () {},
      destroyAll: function () {},
      first: function () {}
    };

    cessationDateServiceMock = {
      save: function () {},
      getCessationDate: function () {}
    };

    cessationDateServiceSaveSpy = sinon.spy(cessationDateServiceMock, 'save');
    cessationDateServiceGetCessationDateSpy =
      sinon.spy(cessationDateServiceMock, 'getCessationDate');

    cessationReasonServiceMock = {
      save: function () {},
      getCessationReasons: function () {}
    };

    cessationReasonServiceGetCessationReasonsSpy =
      sinon.spy(cessationReasonServiceMock, 'getCessationReasons');

    riskyTimeServiceMock = {
      save: function () {},
      getRiskyTimes: function () {}
    };

    riskyTimeServiceGetRiskyTimesSpy = sinon.spy(riskyTimeServiceMock, 'getRiskyTimes');

    socialSupportServiceMock = {
      save: function () {},
      getSocialSupports: function () {}
    };

    socialSupportServiceGetSocialSupportsSpy =
      sinon.spy(socialSupportServiceMock, 'getSocialSupports');

    emaNotificationServiceMock = {
      getEmaNotifications: function () {return [{id: 1}, {id: 2}];},
      getEmaNotification: function () {},
      save: function () {},
      deleteAll: function() {}
    };

    emaNotificationServiceSaveSpy = sinon.spy(emaNotificationServiceMock, 'save');
    emaNotificationServiceDeleteAllSpy = sinon.spy(emaNotificationServiceMock, 'deleteAll');

    localSessionServiceMock = {
      getNumberOfCigarettes: function() { return 4 }
    };

    localSessionServiceGetNumberOfCigarettesSpy = sinon.
      spy(localSessionServiceMock, 'getNumberOfCigarettes');

    $provide.constant('configurationCache', configurationCacheMock);
    $provide.constant('cessationDateService', cessationDateServiceMock);
    $provide.constant('cessationReasonService', cessationReasonServiceMock);
    $provide.constant('riskyTimeService', riskyTimeServiceMock);
    $provide.constant('socialSupportService', socialSupportServiceMock);
    $provide.constant('localNotifications', localNotificationsMock);
    $provide.constant('emaNotificationService', emaNotificationServiceMock);
    $provide.constant('localSessionService', localSessionServiceMock);
  }));

  beforeEach(inject(function(_configurationService_) {
    service = _configurationService_;
  }));

  describe('#scheduleNotifications', function() {
    it('clears previous notifications if they exists.', function() {
      service.scheduleNotifications();
      expect(localNotificationsScheduleSpy.calledTwice).to.equal(false);
    });

    it('deletes local ema notification data if it exists.', function() {
      service.scheduleNotifications();
      expect(emaNotificationServiceDeleteAllSpy.calledOnce).to.equal(true);
    });
  });

  describe('#saveCessationDate', function() {
    it('delegates the cessation date saving to the cessation date service.', function() {
      service.saveCessationDate(new Date());
      expect(cessationDateServiceSaveSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getCessationDate', function() {
    it('delegates request to cessation date service.', function() {
      service.getCessationDate();
      expect(cessationDateServiceGetCessationDateSpy.calledOnce).to.equal(true);
    });
    it('returns a null value when no cessation date is found.', function() {
      expect(service.getCessationDate()).to.equal(null);
    });
  });

  describe('#getCessationReasons', function() {
    it('delegates request to cessation reason service.', function() {
      service.getCessationReasons();
      expect(cessationReasonServiceGetCessationReasonsSpy.calledOnce).to.equal(true);
    });
    it('returns an empty array when no cessation reasons are found.', function() {
      expect(service.getCessationReasons().length).to.equal(0);
    });
  });

  describe('#getRiskyTimes', function() {
    it('delegates request to risky times service.', function() {
      service.getRiskyTimes();
      expect(riskyTimeServiceGetRiskyTimesSpy.calledOnce).to.equal(true);
    });
    it('returns an empty array when no risky times are found.', function() {
      expect(service.getRiskyTimes().length).to.equal(0);
    });
  });

  describe('#getRiskyTimesByNotificationId', function() {
    it('locates and returns risky time by notification id.', function() {
      var notificationId = '12345';
      var riskyTimes = [{ 'notificationId': notificationId }];
      riskyTimeServiceMock.getRiskyTimes = function() {
        return riskyTimes;
      };
      expect((service.getRiskyTimesByNotificationId(notificationId)).notificationId).
        to.equal(notificationId);
    });
  });

  describe('#getSocialSupport', function() {
    it('delegates request to social support service.', function() {
      service.getSocialSupport();
      expect(socialSupportServiceGetSocialSupportsSpy.calledOnce).to.equal(true);
    });
    it('returns an empty array when no social supports are found.', function() {
      expect(service.getSocialSupport().length).to.equal(0);
    });
  });

  describe('#generateNotification', function() {
    it('returns a JSON object with a date for the "at" field.', function() {
      var DAY_OFFSET = 1;
      var notification = service.generateNotification(
        DAY_OFFSET,
        service.MORNING_NOTIFICATION_HOUR_START,
        service.MORNING_NOTIFICATION_HOUR_END);
      expect(notification.at).not.to.be.null;
    });
    it('populates the id field with a uuid.', function() {
      var DAY_OFFSET = 1;
      var notification = service.generateNotification(
        DAY_OFFSET,
        service.MORNING_NOTIFICATION_HOUR_START,
        service.MORNING_NOTIFICATION_HOUR_END);
      expect(notification.id).not.to.be.null;
    });
  });

  describe('#generateEmaNotifications', function() {
    it('returns notification count of four times the\ ' +
      'notification day total.', function() {
      var notifications = service.generateEmaNotifications();
      expect(notifications.length).to.eq(4 * service.NOTIFICATION_DAY_TOTAL);
    });

    it('returns notification count of three times the\ ' +
      'notification day total.', function() {
      var NUMBER_OF_CIGARETTES_PER_DAY = 3;
      localSessionServiceMock.getNumberOfCigarettes = function() {
        return NUMBER_OF_CIGARETTES_PER_DAY
      };
      var notifications = service.generateEmaNotifications();
      expect(notifications.length).to
        .eq(NUMBER_OF_CIGARETTES_PER_DAY * service.NOTIFICATION_DAY_TOTAL);
    });

    it('returns notification count of two times the\ ' +
      'notification day total.', function() {
      var NUMBER_OF_CIGARETTES_PER_DAY = 2;
      localSessionServiceMock.getNumberOfCigarettes = function() {
        return NUMBER_OF_CIGARETTES_PER_DAY
      };
      var notifications = service.generateEmaNotifications();
      expect(notifications.length).to
        .eq(NUMBER_OF_CIGARETTES_PER_DAY * service.NOTIFICATION_DAY_TOTAL);
    });

    it('returns notification count of one times the\ ' +
      'notification day total.', function() {
      var NUMBER_OF_CIGARETTES_PER_DAY = 1;
      localSessionServiceMock.getNumberOfCigarettes = function() {
        return NUMBER_OF_CIGARETTES_PER_DAY
      };
      var notifications = service.generateEmaNotifications();
      expect(notifications.length).to
        .eq(NUMBER_OF_CIGARETTES_PER_DAY * service.NOTIFICATION_DAY_TOTAL);
    });

    it('returns notification count of three times the\ ' +
      'notification day total for 0 cigarettes per day.', function() {
      var NUMBER_OF_CIGARETTES_PER_DAY = 0;
      localSessionServiceMock.getNumberOfCigarettes = function() {
        return NUMBER_OF_CIGARETTES_PER_DAY
      };
      var notifications = service.generateEmaNotifications();
      expect(notifications.length).to
        .eq(service.NOTIFICATION_DAY_TOTAL);
    });

    it('saves the notification with the emaNotification service.', function() {
      service.generateEmaNotifications();
      expect(emaNotificationServiceSaveSpy.calledOnce).to.eq(true);
    });
  });

  describe('#generateEmaNotifications', function() {
    it('returns notification count of three times the\ ' +
      'notification day total.', function() {
      var notifications = service.generateEmaNotifications();
      expect(notifications.length).to.eq(4 * service.NOTIFICATION_DAY_TOTAL);
    });
  });
});
