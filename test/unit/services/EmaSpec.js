'use strict';

var expect = chai.expect;

describe('Ema', function() {
  var emaService,
    emaCacheMock,
    emaAnswerCacheMock,
    emaCachePersistSpy,
    emaAnswerServiceMock;

  var today = moment().format('YYYY-MM-DD');
  var morningEmaId = 1;
  var eveningEmaId = 2;

  beforeEach(module('sis.services'));

  beforeEach(module(function($provide) {
    emaCacheMock = {
      persist: function() {},
      fetchAllRaw: function() {
        return [{
          'assessmentDate': moment().hours(4),
          'assessmentType': 'evening',
          id: eveningEmaId
        }, {
          'assessmentDate': moment().hours(10),
          'assessmentType': 'morning',
          id: morningEmaId
        }];
      }
    };
    emaCachePersistSpy = sinon.spy(emaCacheMock, 'persist');

    emaAnswerServiceMock = function() {
      this.saveEmaAnswers = function() {};
    };

    emaAnswerCacheMock = {
      fetchAllRaw: function() {
       return [{
          'question': 'Your mood RIGHT BEFORE this report (happy)',
          'answer': '8',
          'created_at': '2016-05-03T03:43:03.363Z',
          'id': '7f218819-7757-4511-80a4-3fb764d6f813',
          'emaId': 'fe6726f5-7ac4-4101-bdde-85790fab8014',
          'type': 'emaQuestionAnswers',
          'isDirty': true
        }, {
          'question': 'How many cigarettes have you smoked?',
          'answer': 1,
          'cigaretteCountDate': '2016-05-02T05:00:00.000Z',
          'id': 'f67f916c-8010-454d-9057-9c067bc25845',
          'emaId': 'fe6726f5-7ac4-4101-bdde-85790fab8014',
          'type': 'emaQuestionAnswers',
          'isDirty': true
        }];
      }
    };

    $provide.constant('emaCache', emaCacheMock);
    $provide.service('emaAnswerService', emaAnswerServiceMock);
    $provide.constant('emaAnswerCache', emaAnswerCacheMock);

  }));

  beforeEach(inject(function(_emaService_) {
    emaService = _emaService_;
  }));

  describe('#saveEma', function() {
    it('should use the cache to persist an ema question and answer pair.', function() {
      emaService.saveEma({
        'date': today,
        'description': 'some description'
      });
      expect(emaCachePersistSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getLastEma', function() {
    it('returns null if no ema was found.', function() {
      emaCacheMock.fetchAllRaw = function() {
        return []
      };
      expect(emaService.getLastEma()).to.equal(null);
    });
    it('returns only the last element of an array', function() {
      var lastElement = {'y':'2'};
      emaCacheMock.fetchAllRaw = function() {
        return [{'x':'1'},{'y':'2'}]
      };
      expect(emaService.getLastEma()).to.deep.equal(lastElement);
    });
  });

  describe('#getSmokingHistory', function() {
    it('returns null if no smoking history was found.', function() {
      emaAnswerCacheMock.fetchAllRaw = function() {
        return []
      };
      expect(emaService.getSmokingHistory()).to.equal(null);
    });
    it('returns a filtered object if a smoking history was found.', function() {
      var filteredCigarettes = [{
        'question': 'How many cigarettes have you smoked?',
        'answer': 1,
        'cigaretteCountDate': '2016-05-02T05:00:00.000Z',
        'id': 'f67f916c-8010-454d-9057-9c067bc25845',
        'emaId': 'fe6726f5-7ac4-4101-bdde-85790fab8014',
        'type': 'emaQuestionAnswers',
        'isDirty': true
      }]
      expect(emaService.getSmokingHistory()).to.deep.equal(filteredCigarettes);
    });

  });

  describe('#getHappinessHistory', function() {
    it('returns null if no happiness history was found.', function() {
      emaAnswerCacheMock.fetchAllRaw = function() {
        return []
      };
      expect(emaService.getHappinessHistory()).to.equal(null);
    });
    it('returns a filtered object if a happiness history was found.', function() {
      var filteredHappiness = [{
        'question': 'Your mood RIGHT BEFORE this report (happy)',
        'answer': '8',
        'created_at': '2016-05-03T03:43:03.363Z',
        'id': '7f218819-7757-4511-80a4-3fb764d6f813',
        'emaId': 'fe6726f5-7ac4-4101-bdde-85790fab8014',
        'type': 'emaQuestionAnswers',
        'isDirty': true
      }]
      expect(emaService.getHappinessHistory()).to.deep.equal(filteredHappiness);
    });

  });

  describe('#saveCigaretteLog', function() {
    it('should add the "cigarette_log" type to saved ema questions..', function() {
      emaService.saveCigaretteLog({
        'date': today,
        'description': 'some description'
      });
      expect(emaCachePersistSpy.calledOnce).to.equal(true);
      expect(emaCachePersistSpy.args[0][0].assessmentType).to.equal('cigarette_log');
    });
  });
});