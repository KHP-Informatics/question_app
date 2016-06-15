(function() {
  'use strict';

  function CessationReason(cache) {
    this.KEY = 'cessationReasons';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'fetchAllRaw');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
    cache.delegate(this, 'destroyItem');
  }

  function CessationReasonCache(resourceCache) {
    return new CessationReason(resourceCache);
  }

  angular.module('sis.services')
         .factory('cessationReasonCache', ['resourceCache', CessationReasonCache]);
})();
