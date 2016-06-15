'use strict';

var expect = chai.expect;

describe('HomeController', function () {
  var controller,
      sessionsServiceMock,
      sessionsServiceCessationDayOffsetSpy,
      sessionsServiceCessationDayOffsetAbsSpy,
      exerciseAnswerServiceMock,
      exerciseAnswerServiceGetExerciseAnswersSpy,
      emaServiceMock;

  beforeEach(module('sis.controllers'));

  beforeEach(module(function ($provide) {
    sessionsServiceMock = function () {
      this.cessationDayOffset = function () {
        return -6
      };
      this.cessationDayOffsetAbs = function () { return 7 };
      this.cessationSession = function () {};
      this.isComplete = function() { return true; };

      sessionsServiceCessationDayOffsetSpy = sinon.spy(this, 'cessationDayOffset');
      sessionsServiceCessationDayOffsetAbsSpy = sinon.spy(this, 'cessationDayOffsetAbs');
    };

    exerciseAnswerServiceMock = function() {
      this.getExerciseAnswers = function() {};

      exerciseAnswerServiceGetExerciseAnswersSpy = sinon.spy(this, 'getExerciseAnswers');
    }

    emaServiceMock = {
      getLastEma: function() { return null }
    }

    $provide.service('sessionsService', sessionsServiceMock);
    $provide.service('exerciseAnswerService', exerciseAnswerServiceMock);
    $provide.constant('emaService', emaServiceMock);
  }));

  beforeEach(inject(function ($controller) {
    controller = $controller('HomeController');
  }));

  describe('initialization', function () {
    it('should use exercise answer service to populate existing exercise answers.', function () {
      expect(exerciseAnswerServiceGetExerciseAnswersSpy.calledOnce).to.equal(true);
    });
  });

  describe('#cessationDayOffset', function () {
    it('should delegate cessationDayOffset logic to the session service.', function () {
      controller.cessationDayOffset();
      expect(sessionsServiceCessationDayOffsetSpy.calledOnce).to.equal(true);
    });
  });

  describe('#cessationDayOffsetAbs', function () {
    it('should delegate cessationDayOffsetAbs logic to the session service.', function () {
      controller.cessationDayOffsetAbs();
      expect(sessionsServiceCessationDayOffsetAbsSpy.calledOnce).to.equal(true);
    });
  });

  describe('#getCurrentSession', function () {
    it('returns pre-cessation session if current day is before cessation date', function () {
      controller.cessationDate = moment().add(7, 'days');
      expect(controller.getCurrentSession()).to.equal(controller.CESSATION_SESSION_PRE);
    });
    it('returns pre-cessation session if current day is before cessation date', function () {
      controller.cessationDate = moment();
      expect(controller.getCurrentSession()).to.equal(controller.CESSATION_SESSION_DURING);
    });
    it('returns pre-cessation session if current day is before cessation date', function () {
      controller.cessationDate = moment().subtract(7, 'days');
      expect(controller.getCurrentSession()).to.equal(controller.CESSATION_SESSION_POST);
    });
  });

  describe('#emaNotificationRemainingTime', function() {
    it('returns null if there is no ema notification is in the past', function() {
      expect(controller.emaNotificationRemainingTime()).to.equal(null);
    });

    it('returns a positive value if there is ema notification is in the past 15 minutes', function() {
      controller.lastEmaNotification = {};
      controller.lastEmaNotification.at = moment().subtract(5, 'minutes');
      expect(controller.emaNotificationRemainingTime()).to.equal(10);
    });
  });

  describe('#showEmaAlert', function() {
    it('returns false if no ema notification is in the past', function() {
      expect(controller.showEmaAlert()).to.equal(false);
    });

    it('returns true if no ema exists for the current notification period', function() {
      controller.lastEmaNotification = {};
      controller.lastEmaNotification.at = moment().subtract(5, 'minutes');
      expect(controller.showEmaAlert()).to.equal(true);
    });

    it('returns false if an ema exists for the current notification period', function() {
      emaServiceMock.getLastEma = function() {
        return { assessmentDate: moment() };
      }

      controller.lastEmaNotification = {};
      controller.lastEmaNotification.at = moment().subtract(5, 'minutes');
      expect(controller.showEmaAlert()).to.equal(false);
    });
  });
});
