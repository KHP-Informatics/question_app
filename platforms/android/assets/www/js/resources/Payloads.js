(function() {
  'use strict';

  // A polymorphic collection of resources bundled together.
  function Payloads($resource, $q, settingsCache,
                    authenticationTokenCache) {
    var RESOURCE_PATH = '/api/payloads';

    function getResource() {
      var authToken = authenticationTokenCache.first();

      if (!authToken) { return null; }

      var settings = settingsCache.first();
      var authHeaders = { 'X-AUTH-TOKEN': authToken.value };

      return $resource(settings.server + RESOURCE_PATH,
                       { clientUuid: settings.clientUuid },
                       {
                         get: { method: 'GET', headers: authHeaders },
                         post: { method: 'POST', headers: authHeaders }
                       });
    }

    function rejectUnauthenticated() {
      var deferred = $q.defer();

      deferred.reject('No authentication token available');

      return deferred.promise;
    }

    this.persist = function(data) {
      var Payload = getResource();

      if (!Payload) { return rejectUnauthenticated(); }

      return (new Payload({ data: data })).$post();
    };

    this.fetch = function() {
      var Payload = getResource();

      if (!Payload) { return rejectUnauthenticated(); }

      return (new Payload()).$get();
    };
  }

  function PayloadsFactory($resource, $q, settingsCache,
                           authenticationTokenCache) {
    return new Payloads($resource, $q, settingsCache,
                        authenticationTokenCache);
  }

  angular.module('sis.resources')
         .factory('payloads',
                  ['$resource', '$q', 'settingsCache',
                   'authenticationTokenCache', PayloadsFactory]);
})();
