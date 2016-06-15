(function () {
  'use strict';

  function SocialSupport(socialSupportCache) {
    this.TYPE = socialSupportCache.KEY;

    this.getSocialSupports = function () {
      return socialSupportCache.fetchAllRaw();
    };

    this.save = function (socialSupport) {
      socialSupportCache.persist(socialSupport);
    };

    this.delete = function (id) {
      socialSupportCache.destroyItem(id);
    };
  }

  function SocialSupportFactory(socialSupportCache) {
    return new SocialSupport(socialSupportCache);
  }

  angular.module('sis.services')
    .factory('socialSupportService',
    ['socialSupportCache', SocialSupportFactory]);
})();
