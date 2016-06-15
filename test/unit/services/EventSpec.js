'use strict';

var expect = chai.expect;

describe('Event', function () {
  var eventService,
      eventLocationMock,
      eventWindowMock,
      eventLocationUrlSpy,
      eventWindowHistoryBackSpy;

  beforeEach(module('sis.services'));

  beforeEach(module(function ($provide) {

    eventLocationMock = {
      url: function() {
        return '/some/path/'
      }
    };
    eventLocationUrlSpy = sinon.spy(eventLocationMock, 'url');

    eventWindowMock = {
      history: { back: function () { return true } }
    };
    eventWindowHistoryBackSpy = sinon.spy(eventWindowMock.history, 'back');

    $provide.constant('$location', eventLocationMock);
    $provide.constant('$window', eventWindowMock);
  }));

  beforeEach(inject(function (_eventService_) {
    eventService = _eventService_;
  }));

  describe('#handleBackButton', function () {
    it('should go back to the previous page.', function () {
      eventService.handleBackButton();
      expect(eventLocationUrlSpy.calledOnce).to.equal(true);
      expect(eventWindowHistoryBackSpy.calledOnce).to.equal(true);
    });

    it('should not go back to the previous page in case of sessions.', function () {
      eventLocationMock.url = function() {
        return '/some/path/session'
      };
      eventLocationUrlSpy = sinon.spy(eventLocationMock, 'url');
      eventService.handleBackButton();
      expect(eventLocationUrlSpy.calledOnce).to.equal(true);
      expect(eventWindowHistoryBackSpy.called).to.equal(false);
    });

    it('should go back to the previous page in case of morning ema.', function () {
      eventLocationMock.url = function() {
        return '/some/path/morning'
      };
      eventLocationUrlSpy = sinon.spy(eventLocationMock, 'url');
      eventService.handleBackButton();
      expect(eventLocationUrlSpy.calledOnce).to.equal(true);
      expect(eventWindowHistoryBackSpy.called).to.equal(false);
    });

    it('should go back to the previous page in case of evening ema.', function () {
      eventLocationMock.url = function() {
        return '/some/path/evening'
      };
      eventLocationUrlSpy = sinon.spy(eventLocationMock, 'url');
      eventService.handleBackButton();
      expect(eventLocationUrlSpy.calledOnce).to.equal(true);
      expect(eventWindowHistoryBackSpy.called).to.equal(false);
    });
  });
});
