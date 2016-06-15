'use strict';

var expect = chai.expect;

describe('SessionQuestion', function() {
  var sessionQuestionService,
      $filterMock;

  var SESSION_2_INDEX = 2;

  var rawContent = [{
      'order':1,
      'variable':'session1_1',
      'form':'session_1',
      'section':'',
      'type':'radio',
      'label':'Welcome to your first smoking cessation session!\n\n\n\nNow, let\'s\ ' +
      'start simple: do you smoke?',
      'choices':'First Choice | Second Choice | Third Choice',
      'field':'',
      'validation':'',
      'min':'',
      'max':'',
      'identifier':'',
      'branching_logic':'',
      'required':'y',
      'alignment':'',
      'question_number':'',
      'matrix_group':'',
      'matrix_ranking':''
    },
    {
      'order':2,
      'variable':'session1_2',
      'form':'session_1',
      'section':'',
      'type':'descriptive',
      'label':'That\'s great!  Maybe you know a smoker, whom you want to support in his\ ' +
      'or her smoking cessation attempt, or maybe you are just curious about how we set\ ' +
      'up these sessions.  Either way, if you have feedback for us, we\'d greatly\ ' +
      'appreciate hearing from you.  Just email us at CoSSEMA@partners.org.  We\'d be happy\ ' +
      'to hear from you!\n\nFor now, this session will continue as if you were smoking.',
      'choices':'',
      'field':'',
      'validation':'',
      'min':'',
      'max':'',
      'identifier':'',
      'branching_logic':'[session1_1] = \'4\' and [session1_1] = \'7\'',
      'required':'',
      'alignment':'',
      'question_number':'',
      'matrix_group':'',
      'matrix_ranking':''
    },
    {
      'order':3,
      'variable':'session2_smokingstatus',
      'form':'session_2',
      'section':'Smoking Cessation Session #2',
      'type':'radio',
      'label':'<h3>Today is your Quit Day!</h3><h4>How is it going so far?</h4>',
      'choices':'1, Great, I\'ve quit smoking | 2, I lapsed/ had a slip, but I\'m\ ' +
      'still trying to quit today | 3, I lapsed/ had a slip, and want to schedule a\ ' +
      'new quit day | 4, I forgot today was my quit day and want to schedule a new\ ' +
      'quit day | 5, I changed my mind - I\'m no longer interested in quitting smoking today',
      'field':'A lapse or slip is any cigarette (even a puff) on or after\ ' +
      'your intended quit day. ',
      'validation':'',
      'min':'',
      'max':'',
      'identifier':'',
      'branching_logic':'',
      'required':'y',
      'alignment':'',
      'question_number':'',
      'matrix_group':'',
      'matrix_ranking':''
    },
    {
      'order':4,
      'variable':'session2_1',
      'form':'session_2',
      'section':'',
      'type':'descriptive',
      'label':'<h3>That\'s great! </h3>Quitting smoking is one of the most important\ ' +
      'things you can do for your health.  Having no slips means that you\'re really\ ' +
      'doing your best to quit smoking. Let\'s review your strategies for staying\ ' +
      'smoke-free in the days to come to make sure they are still working for you.<br/>',
      'choices':'',
      'field':'',
      'validation':'',
      'min':'',
      'max':'',
      'identifier':'',
      'branching_logic':'[session2_smokingstatus] = \'1\'',
      'required':'',
      'alignment':'',
      'question_number':'',
      'matrix_group':'',
      'matrix_ranking':''
    }];

  var sessionContent = { sessionContent: rawContent };

  var expectedBranchingLogic = ['session1_1,==,\'4\',and,session1_1,==,\'7\''];

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {
    $filterMock = function () {
      return function () {
        return function() {
          return rawContent[SESSION_2_INDEX];
        }
      }
    };

    $provide.service('$filter', $filterMock);
  }));

  beforeEach(inject(function (_sessionQuestionService_) {
    sessionQuestionService = _sessionQuestionService_;
  }));

  describe('#parsingHelpers', function() {
    beforeEach(inject(function() {
      localStorage.clear();
      sessionQuestionService.rawContent = rawContent;
    }));

    it('splitChoices should split discrete choices in RedCap\ ' +
      'choices string into array', function() {
      expect(sessionQuestionService.splitChoices(rawContent)[0].choices.toString())
        .to.equal(['First Choice','Second Choice','Third Choice'].toString());
    });

    it('cleanBranchingLogic should alter the branching logic to allow parsing', function() {
      expect(sessionQuestionService.cleanBranchingLogic(rawContent[1].branching_logic).toString())
        .to.equal(expectedBranchingLogic.toString());
    });

    it('parseItemLogic should parse individual item logic array to allow evaluation', function() {
      expect(sessionQuestionService.parseItemLogic(expectedBranchingLogic))
        .to.equal('this.responses[\'session1_1,==,\'4\',and,session1_1,==,\'7\'\']');
    });
  });

  describe('#resetSessionQuestions', function() {
    beforeEach(inject(function() {
      sessionQuestionService.rawContent = { content: 'this is some raw content' };
      sessionQuestionService.currentSessionNumber = 2;
      sessionQuestionService.content = { content: 'this is some processed content' };
      sessionQuestionService.showConclusion = true;
      sessionQuestionService.currentIndex = 4;
      sessionQuestionService.sessionNumber = 1;
    }));

    it('should set all sessionQuestion variables back to default states.', function() {
      expect(sessionQuestionService.rawContent).not.to.be.null;
      expect(sessionQuestionService.currentSessionNumber).not.to.be.null;
      expect(sessionQuestionService.content).not.to.be.null;
      expect(sessionQuestionService.showConclusion).to.be.true;
      expect(sessionQuestionService.currentIndex).not.to.eq(0);

      sessionQuestionService.resetSessionQuestions();

      expect(sessionQuestionService.rawContent).to.be.null;
      expect(sessionQuestionService.currentSessionNumber).to.be.null;
      expect(sessionQuestionService.content).to.be.null;
      expect(sessionQuestionService.showConclusion).to.be.false;
      expect(sessionQuestionService.currentIndex).to.eq(0);
    });
  });

  describe('#setSessionContent', function() {
    it('sets current session number to parameter passed.', function() {
      var SESSION_NUMBER = 1;
      expect(sessionQuestionService.currentSessionNumber).to.be.null;
      sessionQuestionService.setSessionContent(SESSION_NUMBER);
      expect(sessionQuestionService.currentSessionNumber).to.eq(SESSION_NUMBER);
    });
  });

  describe('#populateContentForSession', function() {
    it('populates content based on session number.', function() {
      var SESSION_NUMBER = 2;

      sessionQuestionService.currentSessionNumber = SESSION_NUMBER;
      expect(sessionQuestionService.rawContent).to.be.null;
      sessionQuestionService.populateContentForSession(rawContent);
      expect(sessionQuestionService.rawContent).not.to.be.null;
    });
  });

  describe('#setSubsessionContent', function() {
    it('sets current subsession beginning and endpoint.', function() {
      var startPoint = 'session1_1';
      var endPoint = 'session1_2';
      expect(sessionQuestionService.startPosition).to.be.null;
      expect(sessionQuestionService.endPosition).to.be.null;
      sessionQuestionService.setSubsessionContent(startPoint, endPoint);
      expect(sessionQuestionService.startPosition).to.eq(startPoint);
      expect(sessionQuestionService.endPosition).to.eq(endPoint);
    });
  });

  describe('#populateContentForSubSession', function() {
    it('populates content based on session number.', function() {
      var startPoint = 'session1_1';
      var endPoint = 'session1_2';

      sessionQuestionService.startPosition = startPoint;
      sessionQuestionService.endPosition = endPoint;

      expect(sessionQuestionService.rawContent).to.be.null;
      sessionQuestionService.populateContentForSubSession(sessionContent);
      expect(sessionQuestionService.rawContent).not.to.be.null;
    });
  });

  describe('#backButtonVisible', function() {
    it('returns false if previous questions is not initialized.', function() {
      sessionQuestionService.previousQuestions = null;
      expect(sessionQuestionService.backButtonVisible()).to.eq.false;
    });

    it('returns false if there are no previous questions.', function() {
      sessionQuestionService.previousQuestions = [];
      expect(sessionQuestionService.backButtonVisible()).to.eq.false;
    });
  });

  describe('#savePreviousQuestion', function() {
    it('Adds the previous question index to the previous questions array.',
      function() {
        sessionQuestionService.previousQuestions = [];
        sessionQuestionService.currentIndex = 0;
        sessionQuestionService.savePreviousQuestion();
        expect(sessionQuestionService.previousQuestions.length).to.eq(1);
    });
  });
});