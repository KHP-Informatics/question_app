/* General Services */
(function() {
  'use strict';

  var BASE_URL = 'https://sis.northwestern.edu';

  angular
  .module('sis.constant', [])
  .constant('sisConfig', {
    clickKey: 'sisClickEvents',
    sisPin: 'sisPin'
  })
  .constant('routes', {
    HOST: BASE_URL,
    POST_EVENT_CLICKS: BASE_URL + '/api/event_clicks.json',
    AUTH: BASE_URL + '/token_auth/api/authentication_tokens'
  });
})();
