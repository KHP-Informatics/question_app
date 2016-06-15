(function() {
  'use strict';

  function EmaAnswer(cache) {
    this.KEY = 'emaQuestionAnswers';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'fetchAllRaw');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
  }

  function EmaAnswerCache(resourceCache) {
    return new EmaAnswer(resourceCache);
  }

  angular.module('sis.services')
    .factory('emaAnswerCache', ['resourceCache', EmaAnswerCache]);
})();
