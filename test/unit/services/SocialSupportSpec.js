'use strict';

var expect = chai.expect;

describe('SocialSupport', function () {
  var socialSupportService,
      socialSupportCacheMock,
      socialSupportCachePersistSpy,
      socialSupportCacheFetchAllRawSpy,
      socialSupportCacheDestroyItemSpy;

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    socialSupportCacheMock = function () {
      this.persist = function () {};
      this.fetchAllRaw = function() {};
      this.destroyItem = function() {};

      socialSupportCachePersistSpy = sinon.spy(this, 'persist');
      socialSupportCacheFetchAllRawSpy = sinon.spy(this, 'fetchAllRaw');
      socialSupportCacheDestroyItemSpy = sinon.spy(this, 'destroyItem');
    };

    $provide.service('socialSupportCache', socialSupportCacheMock);
  }));

  beforeEach(inject(function (_socialSupportService_) {
    socialSupportService = _socialSupportService_;
  }));

  describe('#save', function () {
    it('should use the cache to persist a social support.', function () {
      socialSupportService.save({ description: 'I want to be healthy.'});
      expect(socialSupportCachePersistSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getSocialSupports', function () {
    it('should use the cache to retrieve social supports.', function () {
      socialSupportService.getSocialSupports();
      expect(socialSupportCacheFetchAllRawSpy.calledOnce).to.equal(true);
    });
  });

  describe('#delete', function () {
    it('should use the cache to delete a social support.', function () {
      socialSupportService.delete();
      expect(socialSupportCacheDestroyItemSpy.calledOnce).to.equal(true);
    });
  });
});
