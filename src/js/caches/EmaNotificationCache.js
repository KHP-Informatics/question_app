(function() {
  'use strict';

  function EmaNotification(cache) {
    this.KEY = 'emaNotification';

    cache.delegate(this, 'fetch');
    cache.delegate(this, 'fetchAllRaw');
    cache.delegate(this, 'persist');
    cache.delegate(this, 'destroyAll');
  }

  function EmaNotificationCache(resourceCache) {
    return new EmaNotification(resourceCache);
  }

  angular.module('sis.services')
         .factory('emaNotificationCache', ['resourceCache', EmaNotificationCache]);
})();
