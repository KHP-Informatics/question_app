'use strict';

var expect = chai.expect;

describe('EmaNotification', function () {
  var emaNotificationService,
      emaNotificationCacheMock,
      emaNotificationCachePersistSpy,
      emaNotificationCacheFetchAllRawSpy,
      emaNotificationCacheFetchSpy;

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    emaNotificationCacheMock = {
      persist: function () {},
      fetchAllRaw: function () {},
      fetch: function () {}
    };

    emaNotificationCachePersistSpy = sinon.spy(emaNotificationCacheMock, 'persist');
    emaNotificationCacheFetchAllRawSpy = sinon.spy(emaNotificationCacheMock, 'fetchAllRaw');
    emaNotificationCacheFetchSpy = sinon.spy(emaNotificationCacheMock, 'fetch');

    $provide.constant('emaNotificationCache', emaNotificationCacheMock);
  }));

  beforeEach(inject(function (_emaNotificationService_) {
    emaNotificationService = _emaNotificationService_;
  }));

  describe('#save', function () {
    it('should use the cache to persist a cessation reason.', function () {
      emaNotificationService.save({ description: 'notify me!'});
      expect(emaNotificationCachePersistSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getEmaNotifications', function () {
    it('should use the cache to retrieve cessation reasons.', function () {
      emaNotificationService.getEmaNotifications();
      expect(emaNotificationCacheFetchAllRawSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getEmaNotification', function () {
    it('should use the cache to retrieve a specific notification.', function () {
      emaNotificationService.getEmaNotification();
      expect(emaNotificationCacheFetchSpy.calledOnce).to.equal(true);
    });
  });

  describe('#lastEmaNotification', function () {
    var expectedEma = {
      id: '54321',
      at: moment().subtract(1, 'minute')
    };
    var olderEma = {
      id: '99999',
      at: moment().subtract(20, 'minutes')
    };
    var futureEma = {
      id: '11111',
      at: moment().add(20, 'minutes')
    };
    it('should return the most recent EMA notification from the past.', function () {
      emaNotificationCacheMock.fetchAllRaw = function() {
        return [olderEma, expectedEma, futureEma];
      }
      var lastEma = emaNotificationService.lastEmaNotification();
      expect(lastEma.id).to.equal('54321');
    });
    it('should return a null if no notifications occur in the past.', function () {
      emaNotificationCacheMock.fetchAllRaw = function() {
        return [futureEma];
      }
      expect(emaNotificationService.lastEmaNotification()).to.be.null;
    });
  });
});
