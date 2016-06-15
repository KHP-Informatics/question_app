(function() {
  'use strict';

  // Wraps the Cordova Local-Notification Plugin
  function LocalNotifications($window) {
    this.schedule = function(notification) {
      $window.plugin.notification.local.schedule(notification);
      if(notification.data) {
        $window.plugin.notification.local.on('click', function(notificationToDisplay) {
          $window.location.href = '#/motivation/notificationId/' +
            JSON.parse(notificationToDisplay.data).notificationId;
        });
      }
    };

    this.clear = function (notificationId) {
      $window.plugin.notification.local.cancel(notificationId);
    };
  }

  function LocalNotificationsFactory($window) {
    return new LocalNotifications($window);
  }

  angular.module('sis.services')
    .factory('localNotifications', ['$window', LocalNotificationsFactory]);
})();
