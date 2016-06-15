(function() {
  'use strict';

  function Configuration(cache) {
    this.KEY = 'configurations';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'first');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
  }

  function ConfigurationCache(resourceCache) {
    return new Configuration(resourceCache);
  }

  angular.module('sis.services')
         .factory('configurationCache', ['resourceCache', ConfigurationCache]);
})();
