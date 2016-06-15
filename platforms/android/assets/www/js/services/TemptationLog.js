(function () {
  'use strict';

  function TemptationLog(temptationLogCache) {

    this.saveTemptationLog = function (temptationLog) {
      temptationLog.logDate = JSON.stringify(moment());
      temptationLog.type = temptationLogCache.KEY;
      temptationLogCache.persist(temptationLog);
    };
  }

  function TemptationLogFactory(temptationLogCache) {
    return new TemptationLog(temptationLogCache);
  }

  angular.module('sis.services')
    .factory('temptationLogService',
    ['temptationLogCache', TemptationLogFactory]);
})();
