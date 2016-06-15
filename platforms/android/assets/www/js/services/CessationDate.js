(function () {
  'use strict';

  function CessationDate(cessationDateCache) {
    this.TYPE = cessationDateCache.KEY;

    this.save = function (cessationDates) {
      cessationDateCache.destroyAll();
      cessationDateCache.persist(cessationDates);
    };

    this.getCessationDate = function() {
      return cessationDateCache.first();
    };
  }

  function CessationDateFactory(cessationDateCache) {
    return new CessationDate(cessationDateCache);
  }

  angular.module('sis.services')
    .factory('cessationDateService',
    ['cessationDateCache', CessationDateFactory]);
})();
