(function() {
  'use strict';

  function SmokingStatus(cache) {
    this.KEY = 'smokingStatuses';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'fetchAll');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
  }

  function SmokingStatusCache(resourceCache) {
    return new SmokingStatus(resourceCache);
  }

  angular.module('sis.services')
         .factory('smokingStatusCache', ['resourceCache', SmokingStatusCache]);
})();
