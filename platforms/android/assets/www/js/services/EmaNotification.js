(function () {
  'use strict';

  function EmaNotification(emaNotificationCache) {
    this.TYPE = emaNotificationCache.KEY;

    this.deleteAll = function() {
      emaNotificationCache.destroyAll();
    };

    this.getEmaNotifications = function() {
      return emaNotificationCache.fetchAllRaw();
    };

    this.getEmaNotification = function(id) {
      return emaNotificationCache.fetch(id);
    };

    this.save = function (emaNotification) {
      emaNotificationCache.persist(emaNotification);
    };

    this.lastEmaNotification = function () {
      var smallestTimeDifference = null;
      var emaNotificationToReturn = null;
      var emaNotifications = this.getEmaNotifications();
      var currentTime = moment();
      for(var index=0; index < emaNotifications.length; index++) {
        var emaNotificationTime = moment(emaNotifications[index].at);
        if(currentTime.diff(emaNotificationTime) > 0 &&
          (!emaNotificationToReturn ||
           currentTime.diff(emaNotificationTime) < smallestTimeDifference)) {
          smallestTimeDifference = currentTime.diff(emaNotificationTime);
          emaNotificationToReturn = emaNotifications[index];
        }
      }
      return emaNotificationToReturn;
    };
  }

  function EmaNotificationFactory(emaNotificationCache) {
    return new EmaNotification(emaNotificationCache);
  }

  angular.module('sis.services')
    .factory('emaNotificationService',
    ['emaNotificationCache', EmaNotificationFactory]);
})();
