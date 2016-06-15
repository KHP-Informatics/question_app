(function() {
  'use strict';

  function SessionsController($scope, sessionsService, sessionQuestionService,
                              sessionAnswerService, $sce, $modal, uuid, $filter, Routes,
                              $location, $routeParams, $anchorScroll, localSessionService,
                              eventService) {
    this.currentAnswer = null;
    this.currentQuestion = null;
    this.sessionAnswers = null;
    this.sessionContent = null;
    this.cessationDate = null;
    this.currentNotes = null;
    this.configurationLock = true;
    this.startPosition = $routeParams.start || 0;
    this.endPosition = $routeParams.end;
    this.showStartScreen = $routeParams.showStart || false;
    this.showEndScreen = $routeParams.showEnd || true;
    this.returnRoute = $routeParams.returnRoute || 'home';
    this.currentSessionComplete = null;
    this.currentSessionNumber = null;

    this.getContentAndStartSession = function(){
      this.setCurrentSessionContent();
      if (!this.showStartScreen){
        this.startSession();
      }
    }

    this.containsEndSessionIntegration = function(index) {
      var currentRawLabel = sessionQuestionService.getSessionRawContent()[index].label;

      var endSessionQuestion = this.currentQuestion &&
        currentRawLabel.indexOf('[INTEGRATION|END_SESSION') > -1;
      var endSessionAnswer = this.currentAnswer &&
        this.currentAnswer.indexOf('[INTEGRATION|END_SESSION') > -1;
      var endPoint = null;

      if(endSessionAnswer || endSessionQuestion) {
        if(currentRawLabel.indexOf('HOME') > -1 ||
           this.currentAnswer.indexOf('HOME') > -1) {
          endPoint = Routes.HOME;
        } else if(currentRawLabel.indexOf('RESTART') > -1 ||
                  this.currentAnswer.indexOf('RESTART') > -1) {
          endPoint = Routes.SESSIONS;
        }
      }

      return endPoint;
    };

    this.makeSelection = function (questionDescription, answer) {
      this.currentAnswer = answer;
      this.currentQuestion = questionDescription;
      this.triggerChoiceModal(answer);
    };

    this.setCurrentSessionContent = function () {
      sessionQuestionService.resetSessionQuestions();
      this.currentSessionNumber = 1;
      if(this.startPosition && this.endPosition){
        sessionQuestionService.setSubsessionContent(this.startPosition, this.endPosition);
      } else {
        sessionQuestionService.setSessionContent(this.currentSessionNumber);
      }
    };

    this.saveLocalSessionData = function(question, answer) {
      if(question === this.NUMBER_OF_CIGARETTES_QUESTION) {
        localSessionService.saveNumberOfCigarettes(answer);
        configurationService.scheduleNotifications();
      }
    };

    this.saveSessionAnswer = function() {
      this.sessionAnswers.push({
        question: this.currentQuestion,
        answer: this.currentAnswer || this.currentNotes
      });

      this.saveLocalSessionData(this.currentQuestion, this.currentNotes);

      this.currentAnswer = null;
      this.currentNotes = null;
    };

    this.findAnswer = function(questionLabel){
      var answer = '';
      var answerLocation = $filter('filter')(this.sessionAnswers,
        {question:questionLabel}) || [];
      if (answerLocation.length > 0){ answer = answerLocation[0].answer}
      return answer
    }

    this.questionVisible = function(branchingLogic, evaluatedLogic, index){
      return sessionQuestionService.questionVisible(branchingLogic, evaluatedLogic, index);
    };

    this.getSessionStarted = function() {
      return this.sessionAnswers;
    };

    this.getSessionContent = function() {
      debugger;
      return sessionQuestionService.getCurrentSessionContent();
    };

    this.persistSession = function() {
      var session = {};
      session.sessionDate = moment().toISOString();
      session.id = uuid();
      session.sessionType = sessionsService.SESSION_KEY_PREFIX +
        this.currentSessionNumber;
      sessionsService.saveSession(session);
      sessionAnswerService.save(this.sessionAnswers, session.id);
    };

    this.clearQuestionChoices = function(index) {
      angular.element('#question-' + index + ' input[type=radio]').each(function (index, element) {
        element.checked = false;
      });
      angular.element('#question-' + index + ' input[type=checkbox]').each(function (index, element) {
        element.checked = false;
      });
    };

    this.skipOrShowConclusion = function(){
      if (this.showEndScreen){
        this.currentSessionComplete = true;
      }
      else {
        $location.url(this.returnRoute);
      }
    }

    this.next = function(index, itemQuestion) {

      this.currentQuestion = itemQuestion;
      var endSessionLocation = this.containsEndSessionIntegration(index);
      this.configurationLock = true;
      if(this.currentAnswer || this.currentNotes || this.currentQuestion === this.NUMBER_OF_CIGARETTES_QUESTION) {
        this.saveSessionAnswer();
      }

      sessionQuestionService.savePreviousQuestion();
      sessionQuestionService.next();

      this.clearQuestionChoices(index);

      if(sessionQuestionService.showConclusion) {
        this.persistSession();
        this.skipOrShowConclusion();
      } else if(endSessionLocation) {
        this.persistSession();
        this.setCurrentSessionContent();
        $location.url(endSessionLocation);
      } 

      $anchorScroll();
    };

    this.back = function() {
      if(sessionQuestionService.backButtonVisible() &&
        !sessionQuestionService.showConclusion) {
        self.configurationLock = true;
        sessionQuestionService.back();
        $scope.$apply();
        $anchorScroll();
      }
    };

    this.startSession = function () {
      this.sessionAnswers = [];
      eventService.setSessionBackButtonAction(this.back);
    };

    this.showConclusion = function() {
      return sessionQuestionService.showConclusion;
    };

    this.convertHtmlContent = function(rawContent) {
      var contentWithIntegrationDisplay = this.transformedIntegrationDisplay(rawContent);
      return $sce.trustAsHtml(contentWithIntegrationDisplay.replace(/\[INTEGRATION.*]/, ''));
    };

    this.transformedIntegrationDisplay = function(rawContent) {
      var transformedContent = rawContent;

      // example of a content transformer
      // transformedContent = transformedContent.replace('[DISPLAY_LABEL_INTEGRATION|DATE]',
      //                                 this.formattedCessationDate());

 
      return transformedContent
    };

    this.disableNext = function(choices, label) {
      return (choices.length > 0 && !this.currentAnswer) ||
             (label.indexOf('[INTEGRATION') > -1 && this.configurationLock &&
              label.indexOf('END_SESSION') === -1);
    }; 

    this.stripIntegrationPoints = function(dirtyValue) {
      return dirtyValue.replace(/\[INTEGRATION.*]/, '');
    };


  }

  angular.module('sis.controllers')
    .controller('SessionsController',
    ['$scope',
     'sessionsService',
     'sessionQuestionService',
     'sessionAnswerService',
     '$sce',
     '$modal',
     'uuid',
     '$filter',
     'Routes',
     '$location',
     '$routeParams',
     '$anchorScroll',
     SessionsController]);
})();
