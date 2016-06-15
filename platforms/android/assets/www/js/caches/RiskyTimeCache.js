(function() {
  'use strict';

  function RiskyTime(cache) {
    this.KEY = 'riskyTimes';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'fetchAllRaw');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
    cache.delegate(this, 'destroyItem');
  }

  function RiskyTimeCache(resourceCache) {
    return new RiskyTime(resourceCache);
  }

  angular.module('sis.services')
         .factory('riskyTimeCache', ['resourceCache', RiskyTimeCache]);
})();
