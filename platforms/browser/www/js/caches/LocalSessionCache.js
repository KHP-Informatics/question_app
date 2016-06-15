(function() {
  'use strict';

  function LocalSession(cache) {
    this.KEY = 'localSession';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'first');
  }

  function LocalSessionCache(localSessionCache) {
    return new LocalSession(localSessionCache);
  }

  angular.module('sis.services')
         .factory('localSessionCache', ['resourceCache', LocalSessionCache]);
})();
