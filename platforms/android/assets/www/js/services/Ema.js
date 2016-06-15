(function () {
  'use strict';

  function Ema(emaCache, emaAnswerService, emaAnswerCache, uuid, $filter) {

    var CIGARETTE_LOG_TYPE = 'cigarette_log';

    this.saveEma = function (emaQuestions, emaType) {
      var ema = {};
      ema.id = uuid();
      ema.assessmentType = emaType ? emaType : 'ema';
      ema.assessmentDate = moment().local().toJSON();
      ema.type = emaCache.KEY;
      emaCache.persist(ema);
      emaAnswerService.saveEmaAnswers(emaQuestions, ema.id);
    };

    this.saveCigaretteLog = function(emaQuestions) {
      this.saveEma(emaQuestions, CIGARETTE_LOG_TYPE);
    };

    this.getLastEma = function() {
      var emaData = emaCache.fetchAllRaw();
      var lastEma = null;
      if(emaData && emaData.length > 0) {
        lastEma = emaData[emaData.length - 1];
      }
      return lastEma;
    };

    this.getSmokingHistory = function(){
      var emaAnswerData = emaAnswerCache.fetchAllRaw();
      var smokingHistory = null;
      if (emaAnswerData && emaAnswerData.length > 0){
        smokingHistory = $filter('filter')(emaAnswerData,
        {
          question:'How many cigarettes have you smoked?'
        });
      }
      return smokingHistory;
    };

    this.getHappinessHistory = function(){
      var emaAnswerData = emaAnswerCache.fetchAllRaw();
      var happinessHistory = null;
      if (emaAnswerData && emaAnswerData.length > 0){
        happinessHistory = $filter('filter')(emaAnswerData,
        {
          question:'Your mood RIGHT BEFORE this report (happy)'
        });
      }
      return happinessHistory
    };

  }

  function EmaFactory(emaCache, emaAnswerService, emaAnswerCache, uuid, $filter) {
    return new Ema(emaCache, emaAnswerService, emaAnswerCache, uuid, $filter);
  }

  angular.module('sis.services')
    .factory('emaService',
    ['emaCache', 'emaAnswerService', 'emaAnswerCache', 'uuid', '$filter', EmaFactory]);
})();
