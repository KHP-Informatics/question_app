'use strict';

var expect = chai.expect;

describe('EmaController', function() {
  var controller,
      emaServiceMock,
      emaServiceSaveEmaSpy,
      sessionsServiceMock,
      sessionsServiceCessationSessionSpy,
      $locationMock,
      $locationMockUrlSpy,
      $anchorScrollMock,
      $routeParamsMock;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function($provide) {
    emaServiceMock = function() {
      this.saveEma = function() { return true };
      emaServiceSaveEmaSpy = sinon.spy(this, 'saveEma');
    };

    sessionsServiceMock = function() {
      this.CESSATION_SESSION_PRE = 'pre';
      this.cessationSession = function() { return 'pre' };
      sessionsServiceCessationSessionSpy = sinon.spy(this, 'cessationSession');
    };

    $locationMock = function() {
      this.url = function() {};
      $locationMockUrlSpy = sinon.spy(this, 'url');
    };

    $routeParamsMock = function() {};

    $anchorScrollMock = function() {
      return function() {};
    };

    $provide.service('$anchorScroll', $anchorScrollMock);
    $provide.service('emaService', emaServiceMock);
    $provide.service('sessionsService', sessionsServiceMock);
    $provide.service('$location', $locationMock);
    $provide.service('$routeParams', $routeParamsMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function($controller) {
    controller = $controller('EmaController');
  }));

  describe('#saveEma', function() {
    it('should persist the ema answers using the ema service.', function() {
      controller.saveEma();
      expect(emaServiceSaveEmaSpy.calledOnce).to.equal(true);
    });

  });

  describe('#saveQuestionAnswer', function() {
    it('should update the current question and question text of the controller.', function() {
      var questionText = 'How well did you sleep last night?';
      expect(controller.emaQuestions.length).to.equal(0);
      controller.saveQuestionAnswer(questionText, controller.STATE_RESTED);
      expect(controller.nextQuestion).to.equal(controller.STATE_RESTED);
      expect(controller.currentQuestionText).to.equal(questionText);
    });
  });

  describe('#next', function() {
    it('should use the ema service to persist answers on final question.', function() {
      controller.saveQuestionAnswer('How well did you sleep last night?',
        controller.questions.STATE_FINAL);
      controller.next();
      expect(emaServiceSaveEmaSpy.calledOnce).to.equal(true);
    });
  });

  describe('#singleClickSaveAnswer', function() {
    it('should set the controller current question text, current answer, and next question.',
      function() {
        var questionText = 'How well did you sleep last night?';
        var answer = 'very well';

        controller.singleClickSaveAnswer(questionText, answer, controller.questions.STATE_FINAL);

        expect(controller.currentQuestionText).to.equal(questionText);
        expect(controller.nextQuestion).to.equal(controller.questions.STATE_FINAL);
    });
  });

  describe('#singleClickSaveAnswer', function() {
    it('should set the controller current question text, current answer, and next question.',
      function() {
        var questionText = 'How well did you sleep last night?';
        var answer = 'very well';

        controller.singleClickSaveAnswer(questionText, answer, controller.questions.STATE_FINAL);

        expect(controller.currentQuestionText).to.equal(questionText);
        expect(controller.nextQuestion).to.equal(controller.questions.STATE_FINAL);
    });
  });

  describe('#cessationSessionQuestionState', function() {
    it('should set the the question to the first param if date is currently pre cessation.',
      function() {
        var question = controller.
          cessationSessionQuestionState('pre-cessation-question', 'post-cessation-question');
        expect(sessionsServiceCessationSessionSpy.calledOnce).to.equal(true);
        expect(question).to.equal('pre-cessation-question');
    });
  });

  describe('#appendToCurrentAnswer', function() {
    it('should append the given answer to the controllers current answer.', function() {
      var questionText = 'How well did you sleep last night?';
      var answer = 'an answer';

      controller.appendToCurrentAnswer(questionText, answer, controller.questions.STATE_CAFFEINE);

      expect(controller.currentAnswer).to.equal(answer);
      expect(controller.nextQuestion).to.equal(controller.questions.STATE_CAFFEINE);
      expect(controller.currentQuestionText).to.equal(questionText);
    });

    it('should append the given answer with formatting to the controllers current answer.',
      function() {
        var firstAnswer = 'an answer';
        var secondAnswer = 'a second answer';

        controller.appendToCurrentAnswer(null, firstAnswer, null);
        controller.appendToCurrentAnswer(null, secondAnswer, null);

        expect(controller.currentAnswer).to.equal('an answer, a second answer');
    });
  });

  describe('#emaComplete', function() {
    it('should navigate /home if no motiviation notification ID is presesnt.', function() {
      controller.emaComplete();
      expect($locationMockUrlSpy.calledWithExactly('/home')).to.equal(true);
    });

    it('should navigate to the motivation page if a motivation notification ID is present.',
      function() {
        controller.notificationId = '12345';
        controller.emaComplete();
        expect($locationMockUrlSpy.calledWithExactly('/motivation/notificationId/12345')).
          to.equal(true);
    });
  });
});
