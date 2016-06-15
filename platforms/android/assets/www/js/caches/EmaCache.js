(function() {
  'use strict';

  function Ema(cache) {
    this.KEY = 'emas';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'fetchAllRaw');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
  }

  function EmaCache(resourceCache) {
    return new Ema(resourceCache);
  }

  angular.module('sis.services')
    .factory('emaCache', ['resourceCache', EmaCache]);
})();
