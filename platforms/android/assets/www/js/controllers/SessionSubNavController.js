(function () {
  'use strict';

  function SessionSubNavController() {

    this.SECTIONS = [

        {
          label: 'Benefits of Quitting', 
          startLabel:'',
          startVariable: 'session1_benefits', 
          endVariable: 'session1_benefits10', 
          sessionAvailable: 1,
        },
        {
          label: 'Concerns About Quitting', 
          startLabel:'', 
          startVariable: 'session1_10', 
          endVariable: 'session1_18', 
          sessionAvailable: 1,
        },
        { 
          label: 'Combating Sabotaging Thoughts',
          startLabel:'',
          startVariable: 'got_time', 
          endVariable: 'session2_traps10c',
          sessionAvailable: 1,
        }];

    this.SECTION_RETURN_ROUTE = 'session_sub_nav'; 

  }

  angular.module('sis.controllers')
    .controller('SessionSubNavController',
    ['$scope',SessionSubNavController]);
})();
