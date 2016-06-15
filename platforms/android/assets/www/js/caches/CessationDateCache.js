(function() {
  'use strict';

  function CessationDate(cache) {
    this.KEY = 'cessationDate';

    cache.delegate(this, 'first');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'persist');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'markClean');
  }

  function CessationDateCache(resourceCache) {
    return new CessationDate(resourceCache);
  }

  angular.module('sis.services')
         .factory('cessationDateCache', ['resourceCache', CessationDateCache]);
})();
