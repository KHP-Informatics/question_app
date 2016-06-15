(function() {
  'use strict';

  function CigaretteLog(cache) {
    this.KEY = 'cigaretteLogs';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
    cache.delegate(this, 'destoryItem');
  }

  function CigaretteLogCache(resourceCache) {
    return new CigaretteLog(resourceCache);
  }

  angular.module('sis.services')
         .factory('cigaretteLogCache', ['resourceCache', CigaretteLogCache]);
})();
