'use strict';

var expect = chai.expect;

describe('SessionsController', function () {
  var controller,
      sessionsServiceMock,
      sessionQuestionServiceMock,
      configurationModalServiceMock,
      sessionQuestionServiceQuestionVisibleSpy,
      sessionQuestionServiceNextSpy,
      sessionQuestionServiceBackSpy,
      sessionsServiceSaveSessionSpy,
      configurationModalServiceOpenRiskyTimesModalSpy,
      configurationModalServiceOpenCessationReasonsModalSpy,
      configurationModalServiceOpenSocialSupportModalSpy,
      uuidMock,
      sessionAnswerServiceMock,
      configurationServiceMock,
      configurationServiceGetCessationDateSpy,
      $routeParamsMock,
      $anchorScrollMock,
      $scopeMock,
      eventServiceMock,
      eventServiceSetSessionBackButtonActionSpy,
      startSessionSpy;

  var SAMPLE_CONTENT = [];

  SAMPLE_CONTENT[0] = {label: 'I AM A CONTENT LABEL'};

  beforeEach(module('sis.controllers'));

  beforeEach(module(function ($provide) {
    var cessationDate = {};
    cessationDate.cessationDay = new Date(2015, 0, 1);
    configurationServiceMock = {
      getCessationDate: function () { return cessationDate },
      getSocialSupport: function () { return [
        { name: 'first person' },
        { name: 'second person' }
      ]}
    };

    configurationServiceGetCessationDateSpy =
      sinon.spy(configurationServiceMock, 'getCessationDate');

    sessionAnswerServiceMock = function() {
      this.save = function() {};
    };

    sessionsServiceMock = function () {
      this.SESSION_KEY_PREFIX = 'session_';
      this.currentSessionNumber = function() { return 1 };
      this.isComplete = function() { return true };
      this.saveSession = function() {};

      sessionsServiceSaveSessionSpy = sinon.spy(this, 'saveSession');
    };

    sessionQuestionServiceMock = {
      questionVisible: function() { return true },
      next: function() { return {} },
      getCurrentSessionContent: function() { return SAMPLE_CONTENT },
      showConclusion: true,
      content: 'some_content',
      resetSessionQuestions: function() {},
      setSessionContent: function() {},
      getSessionRawContent: function() { return SAMPLE_CONTENT },
      savePreviousQuestion: function() {},
      backButtonVisible: function() {return true},
      back: function() {},
      startSession: function{}
    };
    sessionQuestionServiceQuestionVisibleSpy =
      sinon.spy(sessionQuestionServiceMock, 'questionVisible');
    sessionQuestionServiceNextSpy = sinon.spy(sessionQuestionServiceMock, 'next');
    sessionQuestionServiceBackSpy = sinon.spy(sessionQuestionServiceMock, 'back');

    configurationModalServiceMock = function() {
      this.openRiskyTimesModal = function () {};
      this.openCessationReasonsModal = function () {};
      this.openSocialSupportModal = function () {};
      configurationModalServiceOpenRiskyTimesModalSpy = sinon.spy(this, 'openRiskyTimesModal');
      configurationModalServiceOpenCessationReasonsModalSpy =
        sinon.spy(this, 'openCessationReasonsModal');
      configurationModalServiceOpenSocialSupportModalSpy =
        sinon.spy(this, 'openSocialSupportModal');
    };

    uuidMock = function() {
      return 'someUuid';
    };

    $routeParamsMock = {
      start: null,
      end: 'starting point'
    };

    $anchorScrollMock = function() {
      return function() {};
    };

    $scopeMock = {
      $apply: function() {}
    };

    eventServiceMock = {
      setSessionBackButtonAction: function() {}
    };
    eventServiceSetSessionBackButtonActionSpy =
      sinon.spy(eventServiceMock, 'setSessionBackButtonAction');

    $provide.service('uuid', uuidMock);
    $provide.service('sessionsService', sessionsServiceMock);
    $provide.constant('sessionQuestionService', sessionQuestionServiceMock);
    $provide.service('configurationModalService', configurationModalServiceMock);
    $provide.service('sessionAnswerService', sessionAnswerServiceMock);
    $provide.constant('configurationService', configurationServiceMock);
    $provide.constant('$routeParams', $routeParamsMock);
    $provide.service('$anchorScroll', $anchorScrollMock);
    $provide.constant('$scope', $scopeMock);
    $provide.constant('eventService', eventServiceMock);
  }));

  beforeEach(module('sis.controllers'));

  beforeEach(inject(function ($controller) {
    controller = $controller('SessionsController');
  }));

  describe('#makeSelection', function () {
    it('should set the answer and question values for the answered question.', function () {
      var sampleAnswer = 'answer';
      var sampleQuestion = 'question';

      expect(controller.currentAnswer).to.equal(null);
      expect(controller.currentQuestion).to.equal(null);

      controller.makeSelection(sampleQuestion, sampleAnswer);

      expect(controller.currentAnswer).to.equal(sampleAnswer);
      expect(controller.currentQuestion).to.equal(sampleQuestion);
    });
  });

  describe('#questionVisible', function () {
    it('should delegate questionVisible logic to the session question service.', function () {
      expect(controller.questionVisible('test-1', 'test-2', 'test-3')).to.equal(true);
      expect(sessionQuestionServiceQuestionVisibleSpy.calledOnce).to.equal(true);
    });
  });

  describe('#showConclusion', function () {
    it('should delegate showConclusion logic to the session question service.', function () {
      expect(controller.showConclusion()).to.equal(true);
    });
  });

  describe('#startSession', function () {
    it('should initialize the session answers.', function () {
      expect(controller.sessionAnswers).to.be.null;
      controller.startSession();
      expect(controller.sessionAnswers.length).to.equal(0);
    });

    it('should set the back button event action.', function () {
      controller.startSession();
      expect(eventServiceSetSessionBackButtonActionSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getSessionStarted', function () {
    it('should return null if sessionData is not initialized.', function () {
      expect(controller.getSessionStarted()).to.be.null;
    });

    it('should return null if sessionData[sessionKey] is undefined.', function () {
      controller.sessionData = {};
      expect(controller.getSessionStarted()).to.be.null;
    });

    it('should return truthy if sessionData[sessionKey] is defined.', function () {
      controller.sessionKey = 'session_1';
      controller.sessionData = {session_1: 'something'};
      expect(controller.getSessionStarted()).to.be.truthy;
    });
  });

  describe('#getSessionContent', function () {
    it('should retrieve session content from service if undefined.', function () {
      expect(controller.getSessionContent()).to.equal(SAMPLE_CONTENT);
    });
  });

  describe('#disableNext', function() {
    var label = 'This is a question label';
    var integrationLabel = 'This is a question label with an integration point. [INTEGRATION]';
    it('should return true if there is not current answer.', function () {
      var choices = ['someChoice'];
      expect(controller.disableNext(choices, label)).to.equal(true);
    });

    it('should return false if there is a current answer.', function () {
      var choices = ['someChoice'];
      controller.currentAnswer = 'someAnswer';
      expect(controller.disableNext(choices, label)).to.equal(false);
    });

    it('should return false if there are no choices.', function () {
      var choices = [];
      expect(controller.disableNext(choices, label)).to.equal(false);
    });

    it('should return true if label contains a configuration integration\ ' +
      'point and a lock.', function () {
      var choices = ['someChoice'];
      expect(controller.configurationLock).to.equal(true);
      expect(controller.disableNext(choices, integrationLabel)).to.equal(true);
    });

    it('should return true if label contains a configuration integration\ ' +
      'point and no lock.', function () {
      var choices = ['someChoice'];
      controller.configurationLock = false;
      expect(controller.configurationLock).to.equal(false);
      expect(controller.disableNext(choices, integrationLabel)).to.equal(true);
    });

    it('should return false if an end integration point in label.', function () {
      var choices = [];
      integrationLabel = 'This is a question label with an integration point. ' +
        '[INTEGRATION|END_SESSION|HOME]';
      controller.configurationLock = true;
      expect(controller.disableNext(choices, integrationLabel)).to.equal(false);
    });

  });

  describe('#saveSessionAnswer', function() {
    it('should save the current answer and wipe the current answer', function() {
      var CURRENT_QUESTION = 'some question';
      var CURRENT_ANSWER = 'some answer';
      var SESSION_KEY = 'session_1';

      controller.currentQuestion = CURRENT_QUESTION;
      controller.currentAnswer = CURRENT_ANSWER;
      controller.sessionKey = SESSION_KEY;
      controller.sessionAnswers = [];

      controller.saveSessionAnswer();

      expect(controller.sessionAnswers[0].question).to.equal(CURRENT_QUESTION);
      expect(controller.sessionAnswers[0].answer).to.equal(CURRENT_ANSWER);
      expect(controller.currentAnswer).to.equal(null);
    });

    it('should save current notes if no answer is given, the set value back to default',
      function() {
        var CURRENT_QUESTION = 'some question';
        var CURRENT_NOTES = 'some notes';
        var SESSION_KEY = 'session_1';

        controller.currentQuestion = CURRENT_QUESTION;
        controller.currentAnswer = null;
        controller.currentNotes = CURRENT_NOTES;
        controller.sessionKey = SESSION_KEY;
        controller.sessionAnswers = [];

        controller.saveSessionAnswer();

        expect(controller.sessionAnswers[0].question).to.equal(CURRENT_QUESTION);
        expect(controller.sessionAnswers[0].answer).to.equal(CURRENT_NOTES);
        expect(controller.currentNotes).to.equal(null);
    });
  });

  describe('#next', function() {
    var QUESTION_INDEX = 0;

    it('should navigate to the next sessionQuestion', function() {
      var SESSION_KEY = 'session_1';
      controller.sessionKey = SESSION_KEY;
      controller.sessionAnswers = [];

      controller.next(QUESTION_INDEX);
      expect(sessionQuestionServiceNextSpy.calledOnce).to.equal(true);
    });

    it('should complete the session and save it', function() {
      var SESSION_KEY = 'session_1';
      controller.sessionKey = SESSION_KEY;
      controller.sessionAnswers = [];

      controller.next(QUESTION_INDEX);
      expect(controller.sessionAnswers.sessionDate).to.be.not.null;
      expect(sessionsServiceSaveSessionSpy.calledOnce).to.equal(true);
    });

    it('should complete the session and save it', function() {
      var SESSION_KEY = 'session_1';
      controller.sessionKey = SESSION_KEY;
      controller.sessionAnswers = [];

      controller.next(QUESTION_INDEX);
      expect(controller.sessionAnswers.sessionDate).to.be.not.null;
      expect(sessionsServiceSaveSessionSpy.calledOnce).to.equal(true);
    });

    it('route back to the home screen given the integration end home tag', function() {
      sessionQuestionServiceMock.showConclusion = false;
      controller.sessionAnswers = [];
      controller.currentQuestion ='[INTEGRATION|END_SESSION|HOME]';
      controller.currentAnswer ='[INTEGRATION|END_SESSION|HOME]';
      controller.next(QUESTION_INDEX);

      expect(controller.sessionAnswers.sessionDate).to.be.not.null;
      expect(sessionsServiceSaveSessionSpy.calledOnce).to.equal(true);
    });

    it('route back to the home screen given the integration end home tag', function() {
      sessionQuestionServiceMock.showConclusion = false;
      controller.sessionAnswers = [];
      controller.currentQuestion ='[INTEGRATION|END_SESSION|RESTART]';
      controller.currentAnswer ='[INTEGRATION|END_SESSION|RESTART]';
      controller.next(QUESTION_INDEX);

      expect(controller.sessionAnswers.sessionDate).to.be.not.null;
      expect(sessionsServiceSaveSessionSpy.calledOnce).to.equal(true);
    });
  });

  describe('#back', function() {
    it('should not trigger the sessionQuestion back navigation if on conclusion.',
      function() {
        sessionQuestionServiceMock.backButtonVisible = function() { return false };
        sessionQuestionServiceMock.showConclusion = false;
        controller.back();
        expect(sessionQuestionServiceBackSpy.calledOnce).to.equal(false);
    });

    it('should not trigger the sessionQuestion back navigation if back button invisible.',
      function() {
        sessionQuestionServiceMock.backButtonVisible = function() { return true };
        sessionQuestionServiceMock.showConclusion = true;
        controller.back();
        expect(sessionQuestionServiceBackSpy.calledOnce).to.equal(false);
    });

    it('should trigger the sessionQuestion back navigation if back button visible and' +
      'not on the conclusion.',
      function() {
        sessionQuestionServiceMock.backButtonVisible = function() { return true };
        sessionQuestionServiceMock.showConclusion = false;
        controller.back();
        expect(sessionQuestionServiceBackSpy.calledOnce).to.equal(true);
    });
  });

  describe('#openRiskyTimesModal', function() {
    it('should delegate the modal opening to the service and remove the config lock', function() {
      expect(controller.configurationLock).to.equal(true);
      controller.openRiskyTimesModal();
      expect(configurationModalServiceOpenRiskyTimesModalSpy.calledOnce).to.equal(true);
      expect(controller.configurationLock).to.equal(false);
    });
  });

  describe('#getContentAndStartSession', function() {
    it('should skip the start screen if not specified to load it', function() {
      controller.showStartScreen = false;
      //HOW DO I WRITE THIS SPY?
      expect(startSessionSpy.calledOnce).to.equal(true);
    });
    it('should go the start screen if specified to load it', function() {
      controller.showStartScreen = true;
      //HOW DO I WRITE THIS SPY?
      expect(startSessionSpy.notCalled).to.equal(true);
    });
  });

  describe('#openSocialSupportModal', function() {
    it('should delegate the modal opening to the service and remove the config lock', function() {
      expect(controller.configurationLock).to.equal(true);
      controller.openSocialSupportModal();
      expect(configurationModalServiceOpenSocialSupportModalSpy.calledOnce).to.equal(true);
      expect(controller.configurationLock).to.equal(false);
    });
  });

  describe('#openCessationReasonsModal', function() {
    it('should delegate the cessation reason modal opening to the service and\ ' +
      'remove the config lock', function() {
      expect(controller.configurationLock).to.equal(true);
      controller.openCessationReasonsModal();
      expect(configurationModalServiceOpenCessationReasonsModalSpy.calledOnce).to.equal(true);
      expect(controller.configurationLock).to.equal(false);
    });
  });

  describe('#transformedIntegrationDisplay', function () {
    it('should replace a date display integration point with a cessation date.', function () {
      var rawContent = 'this is a cessation date: [DISPLAY_LABEL_INTEGRATION|DATE]';
      var expectedResult = 'this is a cessation date: Thursday, Jan. 1';
      expect(controller.transformedIntegrationDisplay(rawContent)).to.eq(expectedResult);
    });
  });

  describe('#formattedCessationDate', function () {
    it('should retreive the cessation date and format it.', function () {
      var expectedResult = 'Thursday, Jan. 1';
      expect(controller.formattedCessationDate()).to.eq(expectedResult);
      expect(configurationServiceGetCessationDateSpy.calledTwice).to.be.true;
    });
  });

  describe('#triggerChoiceModal', function () {
    it('should trigger a cessation reasons modal when integration point exists.', function () {
      var choice = 'edit cessation reasons [INTEGRATION|REASONS]';
      controller.triggerChoiceModal(choice);
      expect(configurationModalServiceOpenCessationReasonsModalSpy.called).to.be.true;
    });
    it('should trigger a risky modal when integration point exists.', function () {
      var choice = 'edit risky times [INTEGRATION|RISKY]';
      controller.triggerChoiceModal(choice);
      expect(configurationModalServiceOpenRiskyTimesModalSpy.calledOnce).to.be.true;
    });
    it('should trigger a support modal when integration point exists.', function () {
      var choice = 'edit social support [INTEGRATION|SOCIAL]';
      controller.triggerChoiceModal(choice);
      expect(configurationModalServiceOpenSocialSupportModalSpy.called).to.be.true;
    });
  });

  describe('#stripIntegrationPoints', function () {
    it('should remove integration tags from given strings.', function () {
      var choice = 'integration: [INTEGRATION|SOCIAL]';
      expect(controller.stripIntegrationPoints(choice)).to.eq('integration: ');
    });
  });
});
