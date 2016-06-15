'use strict';

var expect = chai.expect;

describe('CessationReason', function () {
  var cessationReasonService,
      cessationReasonCacheMock,
      cessationReasonCachePersistSpy,
      cessationReasonCacheFetchAllRawSpy,
      cessationReasonCacheDestroyItemSpy;

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    cessationReasonCacheMock = function () {
      this.persist = function () {};
      this.fetchAllRaw = function() {};
      this.destroyItem = function() {};

      cessationReasonCachePersistSpy = sinon.spy(this, 'persist');
      cessationReasonCacheFetchAllRawSpy = sinon.spy(this, 'fetchAllRaw');
      cessationReasonCacheDestroyItemSpy = sinon.spy(this, 'destroyItem');
    };

    $provide.service('cessationReasonCache', cessationReasonCacheMock);
  }));

  beforeEach(inject(function (_cessationReasonService_) {
    cessationReasonService = _cessationReasonService_;
  }));

  describe('#save', function () {
    it('should use the cache to persist a cessation reason.', function () {
      cessationReasonService.save({ description: 'I want to be healthy.'});
      expect(cessationReasonCachePersistSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getCessationReasons', function () {
    it('should use the cache to retrieve cessation reasons.', function () {
      cessationReasonService.getCessationReasons();
      expect(cessationReasonCacheFetchAllRawSpy.calledOnce).to.equal(true);
    });
  });

  describe('#delete', function () {
    it('should use the cache to delete a cessation reason.', function () {
      cessationReasonService.delete();
      expect(cessationReasonCacheDestroyItemSpy.calledOnce).to.equal(true);
    });
  });
});
