(function () {
  'use strict';

  function LocalSession(localSessionCache) {
    this.CIGARETTES_PER_DAY = 'number_of_cigarettes_per_day';

    this.getNumberOfCigarettes = function () {
      var localSessionData = localSessionCache.first();
      return localSessionData ? localSessionData[this.CIGARETTES_PER_DAY] : null;
    };

    this.saveNumberOfCigarettes = function (numberOfCigarettes) {
      var currentLocalSessionData = localSessionCache.first() || {};
      localSessionCache.destroyAll();
      currentLocalSessionData[this.CIGARETTES_PER_DAY] = numberOfCigarettes;
      localSessionCache.persist(currentLocalSessionData);
    };
  }

  function LocalSessionFactory(localSessionCache) {
    return new LocalSession(localSessionCache);
  }

  angular.module('sis.services')
    .factory('localSessionService',
    ['localSessionCache', LocalSessionFactory]);
})();
