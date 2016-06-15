(function() {
  'use strict';

  function AuthenticationTokenCache(cache) {
    this.KEY = 'authenticationToken';
    this.FAKE_TOKEN = 'FAKE_TOKEN';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'first');
  }

  function AuthenticationTokenCacheFactory(resourceCache) {
    return new AuthenticationTokenCache(resourceCache);
  }

  angular.module('sis.services')
         .constant('AuthenticationTokenCache', AuthenticationTokenCache)
         .factory('authenticationTokenCache',
                  ['resourceCache', AuthenticationTokenCacheFactory]);
})();
