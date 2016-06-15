(function () {
  'use strict';

  function CessationReason(cessationReasonCache) {
    this.TYPE = cessationReasonCache.KEY;

    this.getCessationReasons = function() {
      return cessationReasonCache.fetchAllRaw();
    };

    this.save = function (cessationReason) {
      cessationReasonCache.persist(cessationReason);
    };

    this.delete = function (id) {
      cessationReasonCache.destroyItem(id);
    };
  }

  function CessationReasonFactory(cessationReasonCache) {
    return new CessationReason(cessationReasonCache);
  }

  angular.module('sis.services')
    .factory('cessationReasonService',
    ['cessationReasonCache', CessationReasonFactory]);
})();
