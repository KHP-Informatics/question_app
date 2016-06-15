'use strict';

var expect = chai.expect;

describe('SessionAnswer', function () {
  var sessionAnswerService,
      sessionAnswerCacheMock,
      sessionAnswerCachePersistSpy;

  var sessionAnswerKey = 'sessionAnswerKey';

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    sessionAnswerCacheMock = function () {
      this.KEY = sessionAnswerKey;
      this.persist = function () {};

      sessionAnswerCachePersistSpy = sinon.spy(this, 'persist');
    };

    $provide.service('sessionAnswerCache', sessionAnswerCacheMock);
  }));

  beforeEach(inject(function (_sessionAnswerService_) {
    sessionAnswerService = _sessionAnswerService_;
  }));
  
  describe('#save', function () {
    it('should set the service\'s session ID.', function () {
      var sessionId = '1234';
      expect(sessionAnswerService.sessionId).to.be.null
      sessionAnswerService.save([], sessionId);
      expect(sessionAnswerService.sessionId).to.equal(sessionId);
    });
  });

  describe('#saveSessionAnswer', function () {
    it('should set the type, sessionId and id of the session answer given,\ ' +
      'then persist.', function () {
      var sessionId = '1234';
      sessionAnswerService.sessionId = sessionId;
      sessionAnswerService.saveSessionAnswer({});
      expect(sessionAnswerCachePersistSpy.calledOnce).to.equal(true);
      expect(sessionAnswerCachePersistSpy.args[0][0].id).to.not.be.null;
      expect(sessionAnswerCachePersistSpy.args[0][0].sessionId).to.equal(sessionId);
      expect(sessionAnswerCachePersistSpy.args[0][0].type).to.equal(sessionAnswerKey);
    });
  });

});
