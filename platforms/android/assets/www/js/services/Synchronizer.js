(function() {
  'use strict';

  // Coordinates data synchronization between the cache and the server.
  function Synchronizer($timeout, payloads, connection) {
    var PERIOD_BETWEEN_SYNCS = 10 * 1000,
        self = this;

    function persistDirtyData() {
      var dirtyData = [];

      function markClean(datum) {
        var cache = Synchronizer.getCache(datum.type);

        if (cache) { cache.markClean(datum.id); }
      }

      angular.forEach(Synchronizer.caches, function(cache) {
        dirtyData = dirtyData.concat(cache.fetchAllDirty());
      });

      if (dirtyData.length > 0) {
        payloads.persist(dirtyData).then(function(response) {
          angular.forEach(response.data, markClean);
        });
      }
    }

    function fetchData() {
      function persistClean(datum) {
        var cache = Synchronizer.getCache(datum.type);

        if (cache) {
          cache.persist(datum);
          cache.markClean(datum.id);
        }
      }

      payloads.fetch().then(function(response) {
        angular.forEach(response.data, persistClean);
      });
    }

    this.registerCache = function(cache) {
      Synchronizer.registerCache(cache);
    };

    this.unregisterCaches = function() {
      Synchronizer.unregisterCaches();
    };

    this.run = function() {
      self.synchronize();
      $timeout(self.run, PERIOD_BETWEEN_SYNCS, false);
    };

    this.synchronize = function() {
      if (!connection.hasConnection()) { return; }

      persistDirtyData();
      fetchData();
    };
  }

  Synchronizer.registerCache = function(cache) {
    this.cacheTypeIndices[cache.KEY] = this.caches.length;
    this.caches.push(cache);
  };

  Synchronizer.unregisterCaches = function() {
    this.caches = [];
    this.cacheTypeIndices = {};
  };

  Synchronizer.getCache = function(type) {
    return this.caches[this.cacheTypeIndices[type]];
  };

  Synchronizer.unregisterCaches();

  function SynchronizerFactory($timeout, payloads, connection) {
    return new Synchronizer($timeout, payloads, connection);
  }

  angular.module('sis.services')
         .factory('synchronizer',
                  ['$timeout', 'payloads', 'connection', SynchronizerFactory]);
})();
