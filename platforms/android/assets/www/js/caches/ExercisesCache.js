(function() {
  'use strict';

  function Exercise(cache) {
    this.KEY = 'exercises';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'fetchAllRaw');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
  }

  function ExerciseCache(resourceCache) {
    return new Exercise(resourceCache);
  }

  angular.module('sis.services')
         .factory('exerciseCache', ['resourceCache', ExerciseCache]);
})();
