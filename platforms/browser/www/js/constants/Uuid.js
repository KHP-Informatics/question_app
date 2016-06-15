(function() {
  'use strict';

  // Returns a version 4 UUID.
  function uuid() {
    function replacement(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : r & 0x3 | 0x8;

      return v.toString(16);
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, replacement);
  }

  angular.module('sis.constants')
         .constant('uuid', uuid);
})();
