'use strict';

var expect = chai.expect;

describe('CigaretteLog', function () {
  var cigaretteLogService, cigaretteLogCacheMock, cigaretteLogCachePersistSpy;
  var today = moment().format('YYYY-MM-DD');

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    cigaretteLogCacheMock = function () {
      this.persist = function () {
      };
      cigaretteLogCachePersistSpy = sinon.spy(this, 'persist');
    };

    $provide.service('cigaretteLogCache', cigaretteLogCacheMock);
  }));

  beforeEach(inject(function (_cigaretteLogService_) {
    cigaretteLogService = _cigaretteLogService_;
  }));

  describe('#saveCigaretteLog', function () {
    it('should use the cache to persist a cigarette log.', function () {
      cigaretteLogService.saveCigaretteLog(
        {'date': today, 'description': 'some description'}
      );
      expect(cigaretteLogCachePersistSpy.calledOnce).to.equal(true);
    });
  });
});
