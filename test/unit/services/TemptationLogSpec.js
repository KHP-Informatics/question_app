'use strict';

var expect = chai.expect;

describe('TemptationLog', function () {
  var temptationLogService, temptationLogCacheMock,
      temptationLogCachePersistSpy;
  var today = moment().format('YYYY-MM-DD');

  var LAST_TEMPTATION_LOG_DESCRIPTION = 'second description';

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    temptationLogCacheMock = function () {
      this.persist = function () {
      };
      this.fetchAll = function () {
        return [
          {'date': today, 'description': 'some description'},
          {'date': today, 'description': LAST_TEMPTATION_LOG_DESCRIPTION}
        ];
      };

      temptationLogCachePersistSpy = sinon.spy(this, 'persist');
    };

    $provide.service('temptationLogCache', temptationLogCacheMock);
  }));

  beforeEach(inject(function (_temptationLogService_) {
    temptationLogService = _temptationLogService_;
  }));

  describe('#saveTemptationLog', function () {
    it('should use the cache to persist a temptation log.', function () {
      temptationLogService.saveTemptationLog(
        {'date': today, 'description': LAST_TEMPTATION_LOG_DESCRIPTION}
      );
      expect(temptationLogCachePersistSpy.calledOnce).to.equal(true);
    });
  });
});
