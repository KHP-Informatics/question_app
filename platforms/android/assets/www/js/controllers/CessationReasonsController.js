(function () {
  'use strict';

  function CessationReasonsController(configurationService, $modalInstance, uuid, modalParameters) {
    this.cessationReason = {};
    this.cessationReasons = configurationService.getCessationReasons();

    this.saveCessationReason = function () {
      if (this.cessationReason.description) {
        this.cessationReason.id = uuid();
        this.cessationReason.type = configurationService.CESSATION_REASON_TYPE;
        configurationService.saveCessationReasons(this.cessationReason);
        this.cessationReasons = configurationService.getCessationReasons();
        this.cessationReason = {};
      }
    };

    this.deleteCessationReason = function (cessationReasonId) {
      configurationService.deleteCessationReason(cessationReasonId);
      this.cessationReasons = configurationService.getCessationReasons();
    };

    this.cancel = function () {
      $modalInstance.close();
    };

    this.isModal = modalParameters.isModal || false;
    this.instructionContent = modalParameters.instructionContent || '';
     
  }

  angular.module('sis.controllers')
    .controller('CessationReasonsController',
    ['configurationService',
     '$modalInstance',
     'uuid',
     'modalParameters',
     CessationReasonsController]);
})();
