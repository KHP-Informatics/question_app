'use strict';

var expect = chai.expect;

describe('Synchronizer', function() {
  var $timeout, synchronizer, payloadsPersistSpy, payloadsFetchSpy,
      mockCache, dirtyData, hasConnection, resourceData;

  beforeEach(module('sis.services'));

  beforeEach(module(function($provide) {
    var payloads = function() {
      this.persist = function() {
        return {
          then: function(callback) {
                  callback({ data: dirtyData });
                }
        };
      };
      payloadsPersistSpy = sinon.spy(this, 'persist');
      this.fetch = function() {
        return {
          then: function(callback) {
                  callback({ data: resourceData });
                }
        };
      };
      payloadsFetchSpy = sinon.spy(this, 'fetch');
    };
    var connection = function() {
      this.hasConnection = function() {
        return hasConnection;
      };
    };

    $provide.service('payloads', payloads);
    $provide.service('connection', connection);
  }));

  beforeEach(inject(function(_$timeout_, _synchronizer_) {
    $timeout = _$timeout_;
    synchronizer = _synchronizer_;
  }));

  beforeEach(function() {
    dirtyData = [{ name: 'response1' }];
    resourceData = [{ tag: 'thing1', id: 'id1' }];
    mockCache = {
      fetchAllDirty: function() { return dirtyData; },
      markClean: function() {},
      persist: function() {}
    };
    synchronizer.registerCache(mockCache);
    hasConnection = true;
  });

  afterEach(function() {
    synchronizer.unregisterCaches();
  });

  describe('#run', function() {
    describe('when there is dirty data', function() {
      describe('periodic synchronization is started', function() {
        it('persists dirty data to the server', function() {
          synchronizer.run();
          expect(payloadsPersistSpy.callCount).to.equal(1);
          expect(payloadsPersistSpy.args[0][0]).to.deep.equal(dirtyData);
          $timeout.flush();
          expect(payloadsPersistSpy.callCount).to.equal(2);
        });

        describe('when the server responds with success', function() {
          it('marks the created records as clean', function() {
            sinon.spy(mockCache, 'markClean');

            synchronizer.run();
            $timeout.flush();

            expect(mockCache.markClean.args[0][0]).to.equal(dirtyData.id);
          });
        });
      });
    });

    describe('when there is no dirty data', function() {
      it('does not synchronize', function() {
        dirtyData = [];
        synchronizer.run();
        expect(payloadsPersistSpy.callCount).to.equal(0);
        $timeout.flush();
        expect(payloadsPersistSpy.callCount).to.equal(0);
      });
    });

    describe('when there is no connection', function() {
      it('does not synchronize', function() {
        hasConnection = false;
        synchronizer.registerCache(mockCache);
        synchronizer.run();
        expect(payloadsPersistSpy.callCount).to.equal(0);
        $timeout.flush();
        expect(payloadsPersistSpy.callCount).to.equal(0);
      });
    });

    describe('when there are no registered caches', function() {
      it('does not synchronize', function() {
        synchronizer.unregisterCaches();
        synchronizer.run();
        expect(payloadsPersistSpy.callCount).to.equal(0);
        $timeout.flush();
        expect(payloadsPersistSpy.callCount).to.equal(0);
      });
    });

    describe('when there is data on the server', function () {
      it('persists it locally as clean records', function() {
        sinon.spy(mockCache, 'persist');
        sinon.spy(mockCache, 'markClean');

        synchronizer.run();

        expect(payloadsFetchSpy.callCount).to.equal(1);
        $timeout.flush();
        expect(payloadsFetchSpy.callCount).to.equal(2);
        expect(mockCache.persist.args[0][0]).to.equal(resourceData[0]);
        expect(mockCache.markClean.args[1][0]).to.equal(resourceData[0].id);
      });
    });
  });
});
