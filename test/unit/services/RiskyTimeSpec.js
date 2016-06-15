'use strict';

var expect = chai.expect;

describe('RiskyTime', function () {
  var riskyTimeService,
      riskyTimeCacheMock,
      riskyTimeCachePersistSpy,
      riskyTimeCacheFetchAllRawSpy,
      riskyTimeCacheDestroyItemSpy;

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    riskyTimeCacheMock = function () {
      this.persist = function () {};
      this.fetchAllRaw = function() {};
      this.destroyItem = function() {};

      riskyTimeCachePersistSpy = sinon.spy(this, 'persist');
      riskyTimeCacheFetchAllRawSpy = sinon.spy(this, 'fetchAllRaw');
      riskyTimeCacheDestroyItemSpy = sinon.spy(this, 'destroyItem');
    };

    $provide.service('riskyTimeCache', riskyTimeCacheMock);
  }));

  beforeEach(inject(function (_riskyTimeService_) {
    riskyTimeService = _riskyTimeService_;
  }));

  describe('#save', function () {
    it('should use the cache to persist a risky time.', function () {
      riskyTimeService.save({ description: 'I want to be healthy.'});
      expect(riskyTimeCachePersistSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getRiskyTimes', function () {
    it('should use the cache to retrieve risky times.', function () {
      riskyTimeService.getRiskyTimes();
      expect(riskyTimeCacheFetchAllRawSpy.calledOnce).to.equal(true);
    });
  });

  describe('#delete', function () {
    it('should use the cache to delete a risky time.', function () {
      riskyTimeService.delete();
      expect(riskyTimeCacheDestroyItemSpy.calledOnce).to.equal(true);
    });
  });
});
