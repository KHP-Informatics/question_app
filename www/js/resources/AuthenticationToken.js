(function() {
  'use strict';

  function Resource($resource, settingsCache,
                    authenticationTokenCache) {
    var RESOURCE_TYPE = 'authenticationTokens';
    var RESOURCE_PATH = '/token_auth/api/authentication_tokens';

    this.create = function(configurationToken) {
      var settings = settingsCache.first();
      var Token = $resource(settings.server + RESOURCE_PATH);
      var token = new Token({
        data: {
          type: RESOURCE_TYPE,
          clientUuid: settings.clientUuid
        }
      });
      var params = { configurationToken: configurationToken };

      return token.$save(params)
        .then(function(response) {
          authenticationTokenCache.persist({ value: response.data.value });
        });
    };

    this.createFakeToken = function() {
      authenticationTokenCache.persist({ value: authenticationTokenCache.FAKE_TOKEN });
    };
  }

  function AuthenticationToken($resource, settingsCache,
                               AuthenticationTokenCache) {
    return new Resource($resource, settingsCache,
                        AuthenticationTokenCache);
  }

  angular.module('sis.resources')
         .factory('authenticationToken',
                  ['$resource', 'settingsCache', 'authenticationTokenCache', AuthenticationToken]);
})();
