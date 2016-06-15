(function() {
  'use strict';

  function Sessions(cache) {
    this.KEY = 'sessions';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'first');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'fetchAllRaw');
    cache.delegate(this, 'markClean');
  }

  function SessionsCache(resourceCache) {
    return new Sessions(resourceCache);
  }

  angular.module('sis.services')
         .factory('sessionsCache', ['resourceCache', SessionsCache]);
})();
