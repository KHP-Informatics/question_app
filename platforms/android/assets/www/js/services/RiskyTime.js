(function () {
  'use strict';

  function RiskyTime(riskyTimeCache) {
    this.TYPE = riskyTimeCache.KEY;

    this.getRiskyTimes = function () {
      return riskyTimeCache.fetchAllRaw();
    };

    this.save = function (riskyTime) {
      riskyTimeCache.persist(riskyTime);
    };

    this.delete = function (id) {
      riskyTimeCache.destroyItem(id);
    };
  }

  function RiskyTimeFactory(riskyTimeCache) {
    return new RiskyTime(riskyTimeCache);
  }

  angular.module('sis.services')
    .factory('riskyTimeService',
    ['riskyTimeCache', RiskyTimeFactory]);
})();
