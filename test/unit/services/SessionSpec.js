'use strict';

var expect = chai.expect;

describe('Session', function () {
  var sessionsService,
      sessionsCacheMock,
      configurationServiceMock,
      sessionCachePersistSpy,
      sessionCacheFetchAllRawSpy,
      configurationServiceGetCessationDateSpy;

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    sessionsCacheMock = function () {
      this.KEY = 'some_type';
      this.persist = function () {};
      this.destroyAll = function () {};
      this.first = function () {};
      this.fetchAllRaw = function () {
        return [{sessionType: 'session_2'}]
      };

      sessionCachePersistSpy = sinon.spy(this, 'persist');
      sessionCacheFetchAllRawSpy = sinon.spy(this, 'fetchAllRaw');
    };

    configurationServiceMock = {
      getCessationDate: function () { return null }
    };

    configurationServiceGetCessationDateSpy =
      sinon.spy(configurationServiceMock, 'getCessationDate');

    $provide.service('sessionsCache', sessionsCacheMock);
    $provide.constant('configurationService', configurationServiceMock);
  }));

  beforeEach(inject(function (_sessionsService_) {
    sessionsService = _sessionsService_;
  }));

  describe('#saveSession', function () {
    it('should set the sessions type and save it with the cache.', function () {
      sessionsService.saveSession({});

      expect(sessionCachePersistSpy.calledOnce).to.equal(true);
      expect(sessionCachePersistSpy.args[0][0].type).to.equal('some_type');
    });
  });

  describe('#cessationSession', function () {
    it('should returns session 1 for 6 days in the past.', function () {
      expect(sessionsService.cessationSession(7)).to.equal(sessionsService.CESSATION_SESSION_PRE);
    });
    it('should return session 2 for a cessation day of today.', function () {
      expect(sessionsService.cessationSession(0)).to.
        equal(sessionsService.CESSATION_SESSION_DURING);
    });
    it('returns an session 3 for 7 days in the future', function () {
      expect(sessionsService.cessationSession(-6)).to.equal(sessionsService.CESSATION_SESSION_POST);
    });
  });

  describe('#cessationDayOffset', function () {
    it('should delegate the cessation date request to configuration service.', function() {
      sessionsService.cessationDayOffset();
      expect(configurationServiceGetCessationDateSpy.calledOnce).to.eq(true);
    });

    it('should delegate the cessation date request to configuration service.', function() {
      configurationServiceMock.getCessationDate = function () { return moment(); }
      expect(sessionsService.cessationDayOffset()).to.eq(0);
    });
  });

  describe('#cessationDayOffsetAbs', function () {
    it('should delegate the cessation date request to configuration service.', function () {
      sessionsService.cessationDayOffsetAbs();
      expect(configurationServiceGetCessationDateSpy.calledOnce).to.eq(true);
    });
  });

  describe('#isComplete', function () {
    it('should look up session data and return a true boolean if the\ ' +
      'current session is complete.', function () {
      var completeSessionNumber = 2;
      expect(sessionsService.isComplete(completeSessionNumber)).to.eq(true);
      expect(sessionCacheFetchAllRawSpy.calledOnce).to.eq(true);
    });
    it('should look up session data and return a false boolean if the\ ' +
      'current session is not found.', function () {
      var incompleteSessionNumber = 1;
      expect(sessionsService.isComplete(incompleteSessionNumber)).to.eq(false);
    });
  });

});
