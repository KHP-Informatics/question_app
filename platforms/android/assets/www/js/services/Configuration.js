(function () {
  'use strict';

  function Configuration(localNotifications, $window,
                         cessationDateService, cessationReasonService,
                         riskyTimeService, socialSupportService, uuid,
                         emaNotificationService, randomInt, localSessionService) {

    this.CESSATION_DATE_TYPE = cessationDateService.TYPE;
    this.CESSATION_REASON_TYPE = cessationReasonService.TYPE;
    this.RISKY_TIME_TYPE = riskyTimeService.TYPE;
    this.SOCIAL_SUPPORT_TYPE = socialSupportService.TYPE;

    // Notification time specifications
    this.MORNING_NOTIFICATION_HOUR_START = 9;
    this.MORNING_NOTIFICATION_HOUR_END = 11;

    this.NOON_NOTIFICATION_HOUR_START = 12;
    this.NOON_NOTIFICATION_HOUR_END = 14;

    this.AFTERNOON_NOTIFICATION_HOUR_START = 15;
    this.AFTERNOON_NOTIFICATION_HOUR_END = 17;

    this.EVENING_NOTIFICATION_HOUR_START = 18;
    this.EVENING_NOTIFICATION_HOUR_END = 20;

    // Indicates the number of days for which EMA notifications are scheduled
    this.NOTIFICATION_DAY_TOTAL = 60;

    this.getCessationDate = function () {
      return cessationDateService.getCessationDate() || null;
    };

    this.getCessationReasons = function () {
      return cessationReasonService.getCessationReasons() || [];
    };

    this.getRiskyTimes = function () {
      return riskyTimeService.getRiskyTimes() || [];
    };
    
    this.getSocialSupport = function () {
      return socialSupportService.getSocialSupports() || [];
    };

    this.getRiskyTimesByNotificationId = function (notificationId) {
      var riskyTimes = this.getRiskyTimes();
      var riskyTimeToReturn = null;

      riskyTimes.forEach(function(riskyTime) {
        if(notificationId === riskyTime.notificationId) {
          riskyTimeToReturn = riskyTime;
        }
      });
      return riskyTimeToReturn;
    };

    this.generateNotification = function(dayOffset, hourMinimum, hourMaximum) {
      var notificationId = randomInt(1000,90000000);
      var notification = {
        id: notificationId,
        title: 'SiS: Survey Time!',
        text: 'It\'s time to enter some information for the smoking study.',
        at: $window
          .moment().add(dayOffset, 'days')
          .local()
          .hours(randomInt(hourMinimum, hourMaximum))
          .minutes(randomInt(0, 59))
          .seconds(0)
          .milliseconds(0)
          .toDate()
      };
      return notification;
    };

    this.generateEmaNotifications = function() {
      var notifications = [];
      var cigarettesPerDay = localSessionService.getNumberOfCigarettes();
      for(var day=0; day < this.NOTIFICATION_DAY_TOTAL; day++){
        // morning
        if(cigarettesPerDay == null || cigarettesPerDay >= 0) {
          notifications.push(
            this.generateNotification(day+1,
              this.MORNING_NOTIFICATION_HOUR_START,
              this.MORNING_NOTIFICATION_HOUR_END));
        }
        // noon
        if(cigarettesPerDay == null || cigarettesPerDay > 1) {
          notifications.push(
            this.generateNotification(day + 1,
              this.NOON_NOTIFICATION_HOUR_START,
              this.NOON_NOTIFICATION_HOUR_END));
        }
        // afternoon
        if(cigarettesPerDay == null || cigarettesPerDay > 2) {
          notifications.push(
            this.generateNotification(day + 1,
              this.AFTERNOON_NOTIFICATION_HOUR_START,
              this.AFTERNOON_NOTIFICATION_HOUR_END));
        }
        // evening
        if(cigarettesPerDay == null || cigarettesPerDay > 3) {
          notifications.push(
            this.generateNotification(day + 1,
              this.EVENING_NOTIFICATION_HOUR_START,
              this.EVENING_NOTIFICATION_HOUR_END));
        }
      }
      emaNotificationService.save(notifications);
      return notifications;
    };

    this.deletePreviousEmaNotifications = function() {
      if (emaNotificationService.getEmaNotifications() && emaNotificationService.getEmaNotifications().length > 0) {
        var invalidEmaNotifications = emaNotificationService.getEmaNotifications();
        for(var index = 0; index < invalidEmaNotifications.length; index++) {
          localNotifications.clear(invalidEmaNotifications[index].id);
        }
        emaNotificationService.deleteAll();
      }
    }

    this.scheduleNotifications = function() {
      this.deletePreviousEmaNotifications();
      localNotifications.schedule(this.generateEmaNotifications());
    };

    this.saveCessationDate = function (date) {
      date.id = uuid();
      date.type = this.CESSATION_DATE_TYPE;
      cessationDateService.save(date);
    };

    this.saveCessationReasons = function (cessationReasons) {
      cessationReasonService.save(cessationReasons);
    };

    this.saveRiskyTimes = function (riskyTimes) {
      riskyTimeService.save(riskyTimes);
    };

    this.saveSocialSupport = function (socialSupport) {
      socialSupportService.save(socialSupport);
    };

    this.configurationComplete = function () {
      return this.getCessationDate() &&
             this.getCessationReasons().length > 0 &&
             this.getRiskyTimes().length > 0 &&
             this.getSocialSupport().length > 0;
    };

    this.deleteCessationReason = function (cessationReasonId) {
      cessationReasonService.delete(cessationReasonId);
    };

    this.deleteRiskyTime = function (riskyTimeId) {
      riskyTimeService.delete(riskyTimeId);
    };

    this.deleteSocialSupport = function (socialSupportId) {
      socialSupportService.delete(socialSupportId);
    };
  }

  function ConfigurationFactory(configurationCache, localNotifications,
                                $window, cessationDateService, cessationReasonService,
                                riskyTimeService, socialSupportService, uuid,
                                emaNotificationService, randomInt, localSessionService) {
    return new Configuration(configurationCache, localNotifications,
                             $window, cessationDateService, cessationReasonService,
                             riskyTimeService, socialSupportService, uuid,
                             emaNotificationService, randomInt, localSessionService);
  }

  angular.module('sis.services')
    .factory('configurationService',
    ['localNotifications',
     '$window',
     'cessationDateService',
     'cessationReasonService',
     'riskyTimeService',
     'socialSupportService',
     'uuid',
     'emaNotificationService',
     'randomInt',
     'localSessionService',
     ConfigurationFactory]);
})();
