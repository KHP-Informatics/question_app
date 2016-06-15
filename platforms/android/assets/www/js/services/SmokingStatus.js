(function () {
  'use strict';

  function SmokingStatus(smokingStatusCache, uuid) {
    // Smoking status keys
    this.KEY_DESCRIPTION = 'description';

    this.getSmokingStatus = function () {
      var smokingStatuses = smokingStatusCache.fetchAll();
      return smokingStatuses && smokingStatuses.length > 0 ?
        smokingStatuses[smokingStatuses.length - 1][this.KEY_DESCRIPTION] : undefined;
    };

    this.saveSmokingStatus = function (description) {
      smokingStatusCache.persist({
        'id': uuid(),
        'statusDate': JSON.stringify(moment()),
        'description': description,
        'type': smokingStatusCache.KEY
      });
    };
  }

  function SmokingStatusFactory(smokingStatusCache, uuid) {
    return new SmokingStatus(smokingStatusCache, uuid);
  }

  angular.module('sis.services')
    .factory('smokingStatusService',
    ['smokingStatusCache', 'uuid', SmokingStatusFactory]);
})();
