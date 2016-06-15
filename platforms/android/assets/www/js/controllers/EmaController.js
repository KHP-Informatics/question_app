(function() {
  'use strict';

  function EmaController(emaService,
                         sessionsService,
                         emaQuestionStates,
                         $routeParams,
                         $location,
                         Routes,
                         $anchorScroll,
                         $modal) {
    this.currentQuestion = $location.url() === Routes.CIGARETTE_LOG ?
                              emaQuestionStates.STATE_CIGARETTE_LOG_REASON :
                              emaQuestionStates.STATE_MOOD;
    this.currentQuestionText = null;
    this.currentAnswer = null;
    this.emaQuestions = [];
    this.questions = emaQuestionStates;
    this.nextQuestion = null;
    this.notificationId = $routeParams.notificationId;
    this.emaId = $routeParams.id;
    this.showNav = true;

    this.moods = {
      happy: 5,
      relaxed: 5,
      excited: 5,
      irritableAngryFrustrated: 5,
      sad: 5,
      worriedAnxious: 5,
      changedFromDefault: false
    };

    this.otherStates = {
      desire: 5,
      hunger: 5,
      bored: 5,
      concentration: 5,
      changedFromDefault: false
    };

    this.thinking = {
      confidence: 5,
      motivation: 5,
      like: 5,
      dislike: 5,
      changedFromDefault: false
    };

    this.updateChangeFromDefault = function(model){
      model.changedFromDefault = true;
    }

    this.openEmaConfirmationModal = function () {
      $modal.open({
        animation: true,
        templateUrl: 'partials/ema_confirmation_modal.html',
        controller: function($scope, $modalInstance){
          $scope.close = function() {
            $modalInstance.close();
          };
        }
      })
    };

    this.proceed = function(state,model){
      var localModelUpdateStatus = model.changedFromDefault || false;
      if(localModelUpdateStatus){
        this.setState(state);
      }
      else {
        this.openEmaConfirmationModal($modal);
        this.updateChangeFromDefault(model);
      }
    }

    this.cigaretteCount = 0;

    this.showCigaretteLogNavigation = function(){
      return this.showNav && !this.notificationId && this.currentQuestion === this.questions.STATE_CIGARETTE_LOG_REASON;
    }
 
    this.showHistoricalLog  = function(){
      this.showNav = false; 
      this.LOG_HISTORICAL = true;
    }

    this.showOneCigaretteLog = function() {
      this.showNav = false;
      this.ONE_CIGARETTE = true;
      this.cigaretteCount = 1;
    }

    this.showMultiCigaretteLog = function() {
      this.showNav = false;
    }

    this.showCigaretteLog = function() {
      return !this.showNav && this.currentQuestion;
    }

    this.setState = function(state) {
      this.currentQuestion = state;
      $anchorScroll();
    };

    this.saveCigaretteCount = function() {
      var currentDateTime = new Date();
      var cigaretteCountDate = new Date(currentDateTime.getFullYear(),
                                        currentDateTime.getMonth(),
                                        currentDateTime.getDate(), 
                                        0, 0, 0);
      this.emaQuestions.push({question:'How many cigarettes have you smoked?',
                              answer:this.cigaretteCount,
                              cigaretteCountDate: cigaretteCountDate
                             });
    };

    this.saveSliderResponses = function() {
      this.emaQuestions.push({question: 'Your mood RIGHT BEFORE this report (happy)',
                              answer: this.moods.happy,         
                              created_at: new Date()});
      this.emaQuestions.push({question: 'Your mood RIGHT BEFORE this report (relaxed)',
                              answer: this.moods.relaxed});
      this.emaQuestions.push({question: 'Your mood RIGHT BEFORE this report (excited)',
                              answer: this.moods.excited});
      this.emaQuestions.push({question: 'Your mood RIGHT BEFORE this report (irritable/angry/' +
      'frustrated)',
                              answer: this.moods.irritableAngryFrustrated});
      this.emaQuestions.push({question: 'Your mood RIGHT BEFORE this report (sad)',
                              answer: this.moods.sad});
      this.emaQuestions.push({question: 'Your mood RIGHT BEFORE this report (worried/anxious)',
                              answer: this.moods.worriedAnxious});

      this.emaQuestions.push({question: 'Your state RIGHT BEFORE this report (feeling the desire ' +
      '/ urge to smoke)',
                              answer: this.otherStates.desire});
      this.emaQuestions.push({question: 'Your state RIGHT BEFORE this report (hungry)',
                              answer: this.otherStates.hunger});
      this.emaQuestions.push({question: 'Your state RIGHT BEFORE this report (bored)',
                              answer: this.otherStates.boredom});
      this.emaQuestions.push({question: 'Your state RIGHT BEFORE this report (difficulty ' +
      'concentrating)',
                              answer: this.otherStates.concentration});

      this.emaQuestions.push({question: 'RIGHT NOW: How CONFIDENT are you that you will be able ' +
      'to quit smoking / stay quit?',
                              answer: this.thinking.confidence});
      this.emaQuestions.push({question: 'RIGHT NOW: How MOTIVATED are you to quit smoking / ' +
      'stay quit?',
                              answer: this.thinking.motivation});
      this.emaQuestions.push({question: 'RIGHT NOW: Think about all the things you LIKE/LOVE ' +
      'about quitting / being smoke-free: taken together, how important are those things to you ' +
      'RIGHT NOW?',
                              answer: this.thinking.like});
      this.emaQuestions.push({question: 'RIGHT NOW: Think about all the things you DISLIKE/HATE ' +
      'about quitting / being smoke-free: taken together, how important are those things to you ' +
      'RIGHT NOW?',
                              answer: this.thinking.dislike});
    };

    this.saveEma = function() {
      this.saveSliderResponses();
      this.saveCigaretteCount();

      $location.url() === Routes.CIGARETTE_LOG ?
        emaService.saveCigaretteLog(this.emaQuestions) :
        emaService.saveEma(this.emaQuestions);
    };

    this.saveQuestionAnswer = function(question, nextQuestion) {
      this.currentQuestionText = question;
      this.nextQuestion = nextQuestion;
    };

    this.next = function() {
      this.emaQuestions.push({
        question: this.currentQuestionText,
        answer: this.currentAnswer
      });

      this.currentQuestion = this.nextQuestion;
      this.currentAnswer = null;
      if(this.nextQuestion === this.questions.STATE_FINAL) {
        this.saveEma();
      }

      $anchorScroll();
    };

    this.cessationSessionQuestionState = function(preCessationQuestionState,
                                                  postCessationQuestionState) {
      var question;
      if(sessionsService.cessationSession() === sessionsService.CESSATION_SESSION_PRE) {
        question = preCessationQuestionState;
      } else {
        question = postCessationQuestionState;
      }
      return question;
    };

    this.appendToCurrentAnswer = function(questionText, valueToAppend, nextQuestion) {
      this.saveQuestionAnswer(questionText, nextQuestion);

      if(this.currentAnswer) {
        this.currentAnswer += ', ' + valueToAppend;
      } else {
        this.currentAnswer = valueToAppend;
      }
    };

    this.singleClickSaveAnswer = function(question, answer, nextQuestion) {
      this.currentAnswer = answer;
      this.saveQuestionAnswer(question, nextQuestion);
      this.next();
    };

    this.emaComplete = function() {
      var destination = Routes.HOME;
      if(this.notificationId) {
        destination = Routes.MOTIVATION + '/notificationId/' + this.notificationId;
      }
      $location.url(destination);
    };

    this.intoxicationCheck = function(question, value) {
      this.appendToCurrentAnswer(question, value, this.questions.STATE_FINAL);
      if(this.currentAnswer.indexOf('alcohol') > -1 ||
         this.currentAnswer.indexOf('other intoxicating substance') > -1) {
        this.nextQuestion = this.questions.STATE_CONTEXT_INTOXICATION;
      }
    }
  }

  angular.module('sis.controllers')
    .controller('EmaController',
    ['emaService',
     'sessionsService',
     'EmaQuestionStates',
     '$routeParams',
     '$location',
     'Routes',
     '$anchorScroll',
     '$modal',
     EmaController]);
})();
