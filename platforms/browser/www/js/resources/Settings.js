(function() {
  'use strict';

  function Resource($http, settingsCache, uuid) {
    var RESOURCE_PATH = 'config.json',
        DEFAULT_DEVICE_ID = 'DUMMY-DEVICE';

    this.fetch = function fetch() {
      return $http.get(RESOURCE_PATH)
        .then(function(settings) {
          var settingsData = angular.copy(settings.data);

          settingsData.clientUuid = uuid() || DEFAULT_DEVICE_ID;
          settingsData.type = 'authenticationTokens';
          settingsCache.persist(settingsData);
        });
    };
  }

  function Settings($http, settingsCache, uuid) {
    return new Resource($http, settingsCache, uuid);
  }

  angular.module('sis.resources')
    .factory('settings', ['$http', 'settingsCache', 'uuid', Settings]);
})();
