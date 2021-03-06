(function() {
  'use strict';

  var EmaQuestionStates = {
    STATE_FINAL: 0,

    STATE_CIGARETTE_LOG_REASON: 1,
    STATE_CIGARETTE_LOG_DESIRE: 2,

    STATE_MOOD: 10,

    STATE_OTHER: 20,

    STATE_THINKING_INTRO: 30,
    STATE_THINKING: 31,

    STATE_CONTEXT_INTRO: 40,
    STATE_CONTEXT_LOCATION: 41,
    STATE_CONTEXT_LOCATION_INSIDE: 42,
    STATE_CONTEXT_LOCATION_PUBLIC_BUILDING: 43,
    STATE_CONTEXT_LOCATION_OUTSIDE: 44,
    STATE_CONTEXT_ALONE: 45,
    STATE_CONTEXT_WITH_OTHERS: 46,
    STATE_CONTEXT_CHILD: 47,
    STATE_CONTEXT_SOCIAL: 48,
    STATE_CONTEXT_WITNESS: 49,
    STATE_CONTEXT_CONSUMPTION: 50,
    STATE_CONTEXT_INTOXICATION: 51
  };

  angular.module('sis.constants')
    .constant('EmaQuestionStates', EmaQuestionStates);
})();

