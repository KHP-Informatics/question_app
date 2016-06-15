(function () {
  'use strict';

  function SocialSupportController(configurationService, $modalInstance, uuid, modalParameters) {
    this.socialSupport = {};
    this.socialSupports = configurationService.getSocialSupport();

    this.socialSupportReasons = [
      { id:1,
        reason: 'By telling him/her about my quitting smoking,'+
                ' I\'m making my quit attempt "official", thereby committing myself more to it.',
        summary: 'By telling him/her, I\'m making my quit attempt "official".'
      },
      { id:2,
        reason: 'Knowing I\'m attempting to quit, ' +
                ' he/she will not offer me cigarettes or otherwise tempt me to smoke.',
        summary: 'He/she will not tempt me to smoke.'
      },
      { id:3,
        reason: 'He/she will offer encouragement along the way.',
        summary: 'He/she will offer encouragement.'
      },
      { id:4,
        reason:'He/she will support my decision to stop smoking'+
          ' and help me in tricky social situations.',
        summary: 'He/she will help me in tricky social situations.'
      },
      { id:5,
        reason: 'He/she will reward me (e.g., dinner) for achieving ' +
                ' milestones along my quit attempt (e.g., 1 week abstinence)',
        summary: 'He/she will reward me for achieving milestones.'
      },
      { id:6,
        reason:'Other',
        summary: 'Other'
      }
    ];

    this.isModal = modalParameters.isModal || false;
    this.instructionContent = modalParameters.instructionContent || '';

    this.saveSocialSupport = function () {
      this.socialSupport.id = uuid();
      this.socialSupport.type = configurationService.SOCIAL_SUPPORT_TYPE;
      configurationService.saveSocialSupport(this.socialSupport);
      this.socialSupport = {};
      this.socialSupports = configurationService.getSocialSupport();
    };

    this.deleteSocialSupport = function (socialSupportId) {
      configurationService.deleteSocialSupport(socialSupportId);
      this.socialSupports = configurationService.getSocialSupport();
    };

    this.hasSocialSupports = function() {
      return this.socialSupports.length > 0;
    };

    this.cancel = function () {
      $modalInstance.close();
    };

  }

  angular.module('sis.controllers')
    .controller('SocialSupportController',
    ['configurationService', '$modalInstance', 'uuid',
     'modalParameters', SocialSupportController]);
})();
