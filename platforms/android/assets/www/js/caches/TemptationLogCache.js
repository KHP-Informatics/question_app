(function() {
  'use strict';

  function TemptationLog(cache) {
    this.KEY = 'temptationLogs';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
  }

  function TemptationLogCache(resourceCache) {
    return new TemptationLog(resourceCache);
  }

  angular.module('sis.services')
    .factory('temptationLogCache', ['resourceCache', TemptationLogCache]);
})();
