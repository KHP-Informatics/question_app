'use strict';

var expect = chai.expect;

describe('EmaAnswer', function () {
  var emaAnswerService,
      emaAnswerCacheMock,
      emaAnswerCachePersistSpy;

  var emaAnswerKey = 'emaAnswerKey';

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    emaAnswerCacheMock = function () {
      this.KEY = emaAnswerKey;
      this.persist = function () {};

      emaAnswerCachePersistSpy = sinon.spy(this, 'persist');
    };

    $provide.service('emaAnswerCache', emaAnswerCacheMock);
  }));

  beforeEach(inject(function (_emaAnswerService_) {
    emaAnswerService = _emaAnswerService_;
  }));

  describe('#saveEmaAnswers', function () {
    it('should set the service\'s ema ID.', function () {
      var emaId = '1234';
      expect(emaAnswerService.emaId).to.be.null
      emaAnswerService.saveEmaAnswers([], emaId);
      expect(emaAnswerService.emaId).to.equal(emaId);
    });
  });

  describe('#saveEmaAnswer', function () {
    it('should set the type, emaId and id of the ema answer given, then persist.', function () {
      var emaId = '1234';
      emaAnswerService.emaId = emaId;
      emaAnswerService.saveEmaAnswer({});
      expect(emaAnswerCachePersistSpy.calledOnce).to.equal(true);
      expect(emaAnswerCachePersistSpy.args[0][0].id).to.not.be.null;
      expect(emaAnswerCachePersistSpy.args[0][0].emaId).to.equal(emaId);
      expect(emaAnswerCachePersistSpy.args[0][0].type).to.equal(emaAnswerKey);
    });
  });

});
