(function() {
  'use strict';

  function DeviceCache(cache) {
    this.KEY = 'devices';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
  }

  function DeviceCacheFactory(resourceCache) {
    return new DeviceCache(resourceCache);
  }

  angular.module('sis.services')
         .factory('deviceCache',
                  ['resourceCache', DeviceCacheFactory]);
})();
