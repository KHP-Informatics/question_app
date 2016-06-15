'use strict';

var expect = chai.expect;

describe('SmokingStatus', function () {
  var smokingStatusService, smokingStatusCacheMock,
      smokingStatusCachePersistSpy, smokingStatusCacheFetchAllSpy;
  var today = moment().format('YYYY-MM-DD');

  var LAST_TEMPTATION_LOG_DESCRIPTION = 'second description';

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    smokingStatusCacheMock = function () {
      this.persist = function () {
      };
      this.fetchAll = function () {
        return [
          {'date': today, 'description': 'some description'},
          {'date': today, 'description': LAST_TEMPTATION_LOG_DESCRIPTION}
        ];
      };

      smokingStatusCachePersistSpy = sinon.spy(this, 'persist');
      smokingStatusCacheFetchAllSpy = sinon.spy(this, 'fetchAll');
    };

    $provide.service('smokingStatusCache', smokingStatusCacheMock);
  }));

  beforeEach(inject(function (_smokingStatusService_) {
    smokingStatusService = _smokingStatusService_;
  }));

  describe('#getSmokingStatus', function () {
    it('retrieve the last temptation log saved', function () {
      var smokingStatus = smokingStatusService.getSmokingStatus();
      expect(smokingStatusCacheFetchAllSpy.calledOnce).to.equal(true);
      expect(smokingStatus).to.equal(LAST_TEMPTATION_LOG_DESCRIPTION);
    });
  });

  describe('#saveSmokingStatus', function () {
    it('should use the cache to persist a temptation log.', function () {
      smokingStatusService.saveSmokingStatus(
        {'date': today, 'description': LAST_TEMPTATION_LOG_DESCRIPTION}
      );
      expect(smokingStatusCachePersistSpy.calledOnce).to.equal(true);
    });
  });
});
