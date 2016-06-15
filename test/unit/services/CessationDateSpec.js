'use strict';

var expect = chai.expect;

describe('CessationDate', function () {
  var cessationDateService, 
    cessationDateCacheMock, 
    cessationDateCachePersistSpy,
    cessationDateCacheDestroyAllSpy,
    cessationDateCacheFirstSpy;

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    cessationDateCacheMock = function () {
      this.persist = function () {};
      this.destroyAll = function () {};
      this.first = function() {};
      cessationDateCachePersistSpy = sinon.spy(this, 'persist');
      cessationDateCacheDestroyAllSpy = sinon.spy(this, 'destroyAll');
      cessationDateCacheFirstSpy = sinon.spy(this, 'first');
    };

    $provide.service('cessationDateCache', cessationDateCacheMock);
  }));

  beforeEach(inject(function (_cessationDateService_) {
    cessationDateService = _cessationDateService_;
  }));

  describe('#save', function () {
    it('should use the cache to remove previous and persist a cessation date.', function () {
      cessationDateService.save('2015-01-01');
      expect(cessationDateCacheDestroyAllSpy.calledOnce).to.equal(true);
      expect(cessationDateCachePersistSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getCessationDate', function () {
    it('should use the cache to retrieve the last pushed cessation date.', function () {
      cessationDateService.getCessationDate();
      expect(cessationDateCacheFirstSpy.calledOnce).to.equal(true);
    });
  });
});
