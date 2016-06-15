(function() {
  'use strict';

  function SocialSupport(cache) {
    this.KEY = 'socialSupports';

    cache.delegate(this, 'persist');
    cache.delegate(this, 'destroyAll');
    cache.delegate(this, 'fetchAllRaw');
    cache.delegate(this, 'fetchAllDirty');
    cache.delegate(this, 'markClean');
    cache.delegate(this, 'destroyItem');
  }

  function SocialSupportCache(socialSupportCache) {
    return new SocialSupport(socialSupportCache);
  }

  angular.module('sis.services')
         .factory('socialSupportCache', ['resourceCache', SocialSupportCache]);
})();
