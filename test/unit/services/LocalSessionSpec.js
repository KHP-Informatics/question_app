'use strict';

var expect = chai.expect;

describe('LocalSession', function () {
  var localSessionService,
      localSessionCacheMock,
      localSessionCachePersistSpy,
      localSessionCacheFirstSpy,
      localSessionCacheDestroyAllSpy;

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    localSessionCacheMock = {
      persist: function () {},
      first: function() { return {number_of_cigarettes_per_day: 2} },
      destroyAll: function() {}
    }

    localSessionCachePersistSpy = sinon.spy(localSessionCacheMock, 'persist');
    localSessionCacheFirstSpy = sinon.spy(localSessionCacheMock, 'first');
    localSessionCacheDestroyAllSpy = sinon.spy(localSessionCacheMock, 'destroyAll');

    $provide.constant('localSessionCache', localSessionCacheMock);
  }));

  beforeEach(inject(function (_localSessionService_) {
    localSessionService = _localSessionService_;
  }));

  describe('#saveNumberOfCigarettes', function () {
    it('should use the cache to persist the number of cigarettes per day.', function () {
      var NUMBER_OF_CIGARETTES = 3;
      localSessionService.saveNumberOfCigarettes(NUMBER_OF_CIGARETTES);
      expect(localSessionCacheFirstSpy.calledOnce).to.equal(true);
      expect(localSessionCacheDestroyAllSpy.calledOnce).to.equal(true);
      expect(localSessionCachePersistSpy.calledOnce).to.equal(true);
      expect(localSessionCachePersistSpy.
        args[0][0][localSessionService.CIGARETTES_PER_DAY]).
        to.equal(NUMBER_OF_CIGARETTES);

    });
  });

  describe('#getNumberOfCigarettes', function () {
    it('should use the cache to retrieve social supports.', function () {
      expect(localSessionService.getNumberOfCigarettes()).to.equal(2);
      expect(localSessionCacheFirstSpy.calledOnce).to.equal(true);
    });
  });
});
