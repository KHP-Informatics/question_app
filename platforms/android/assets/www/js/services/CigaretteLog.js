(function () {
  'use strict';

  function CigaretteLog(cigaretteLogCache) {

    this.saveCigaretteLog = function (cigaretteLog) {
      cigaretteLog.logDate = JSON.stringify(moment());
      cigaretteLog.type = cigaretteLogCache.KEY;
      cigaretteLogCache.persist(cigaretteLog);
    };
  }

  function CigaretteLogFactory(cigaretteLogCache) {
    return new CigaretteLog(cigaretteLogCache);
  }

  angular.module('sis.services')
    .factory('cigaretteLogService',
    ['cigaretteLogCache', CigaretteLogFactory]);
})();
