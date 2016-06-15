'use strict';

var expect = chai.expect;

describe('SmokingHistoryController', function() {
  var controller, emaServiceMock,
    smokingHistoryEmaServiceSpy;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function($provide) {
    emaServiceMock = function() {
      this.getSmokingHistory = function() {
        return [{
          "question": "How many cigarettes have you smoked?",
          "answer": 5,
          "cigaretteCountDate": "2016-05-02T05:00:00.000Z",
        }, {
          "question": "How many cigarettes have you smoked?",
          "answer": 4,
          "cigaretteCountDate": "2016-05-02T05:00:00.000Z",

        }, {
          "question": "How many cigarettes have you smoked?",
          "answer": 3,
          "cigaretteCountDate": "2016-05-03T05:00:00.000Z",
        }]
      };
      smokingHistoryEmaServiceSpy = sinon.spy(this, 'getSmokingHistory');
    };

    $provide.service('emaService', emaServiceMock);
    $provide.service('$scope', function(){});
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function($controller) {
    controller = $controller('SmokingHistoryController');
  }));

  describe('#getSmokingHistoryData', function() {
    it('should reformat the smoking history so that it sums cigarettes smoked into specific days', function() {
      var dateSummedCigaretteCount = [
        [1462165200000, 9],
        [1462251600000, 3]
      ];
      expect(controller.getSmokingHistoryData()).to.deep.equal(dateSummedCigaretteCount);
    });
  });

});