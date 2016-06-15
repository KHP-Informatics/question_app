(function () {
  'use strict';

  function ConfigurationModal() {

    this.openRiskyTimesModal = function ($modal) {
      return $modal.open({
        animation: true,
        templateUrl: 'partials/risky_times_modal.html',
        controller: 'RiskyTimesController',
        controllerAs: 'risky',
        size: 'lg',
        resolve:{
          modalParameters: function(){
            return {
              isModal: true,
            }
          }
        }
      });
    };

    this.openCessationReasonsModal = function ($modal) {
      return $modal.open({
        animation: true,
        templateUrl: 'partials/cessation_reasons_modal.html',
        controller: 'CessationReasonsController',
        controllerAs: 'reasons',
        size: 'lg',
        resolve:{
          modalParameters: function(){
            return {
              isModal:  true,
              instructionContent:  ''
            }
          }
        }
      });
    };

    this.openSocialSupportModal = function ($modal) {
      return $modal.open({
        animation: true,
        templateUrl: 'partials/social_support_modal.html',
        controller: 'SocialSupportController',
        controllerAs: 'social',
        size: 'lg',
        resolve:{
          modalParameters: function(){
            return {
              isModal: true,
              instructionContent: ''
            }
          }
        }
      });
    };
  }

  function ConfigurationModalFactory() {
    return new ConfigurationModal();
  }

  angular.module('sis.services')
    .factory('configurationModalService',
    [ConfigurationModalFactory]);
})();
