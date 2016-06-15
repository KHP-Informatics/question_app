'use strict';

var expect = chai.expect;

describe('HappinessHistoryController', function() {
  var controller, emaServiceMock,
    happinessHistoryEmaServiceSpy;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function($provide) {
    emaServiceMock = function() {
      this.getHappinessHistory = function() {
        return [{
          "question": "Your mood RIGHT BEFORE this report (happy)",
          "answer": "8",
          "created_at": "2016-05-03T03:43:03.363Z"
        }]

      };
      happinessHistoryEmaServiceSpy = sinon.spy(this, 'getHappinessHistory');
    };

    $provide.service('emaService', emaServiceMock);
    $provide.service('$scope', function(){});
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function($controller) {
    controller = $controller('HappinessHistoryController');
  }));

  describe('#getHappinessHistoryData', function() {
    it('should reformat the happiness history so that be displayed on a highchart', function() {
      var dateSummedCigaretteCount = [
        [
          [1462246983363, 8]
        ]
      ];
      expect([controller.getHappinessHistoryData()]).to.deep.equal(dateSummedCigaretteCount);
    });
  });

});