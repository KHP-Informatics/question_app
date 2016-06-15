'use strict';

var expect = chai.expect;

describe('ResourceCache', function() {
  var cache,
      KEY1 = 'key1',
      FAKE_ID = 'baz';

  beforeEach(module('sis.services'));

  beforeEach(inject(function(_resourceCache_) {
    cache = _resourceCache_;
  }));

  afterEach(function() {
    cache.destroyAll(KEY1);
  });

  describe('#persist', function() {
    it('ignores undefined and null values', function() {
      cache.persist(KEY1, undefined);
      cache.persist(KEY1, null);

      expect(cache.fetchAll(KEY1)).to.have.length(0);
    });

    it('ignores duplicate values', function() {
      cache.persist(KEY1, { value: 'foo' });
      cache.persist(KEY1, { value: 'foo' });
      cache.persist(KEY1, { data: { id: 'x', value: 3 } });
      cache.persist(KEY1, { data: { id: 'x', value: 3 } });

      expect(cache.fetchAll(KEY1)).to.have.length(2);
    });
  });

  describe('#fetch', function() {
    it('returns null when there are no values', function() {
      expect(cache.fetch(KEY1, FAKE_ID)).to.be.null;
    });

    it('returns null when there are no matching ids', function() {
      cache.persist(KEY1, { id: 'abcd', text: 'something' });

      expect(cache.fetch(KEY1, 'baz')).to.be.null;
    });

    it('returns a record with a matching id', function() {
      var record = { id: 'abcd', text: 'something' };
      cache.persist(KEY1, record);

      expect(cache.fetch(KEY1, 'abcd')).to.deep.equal(record);
    });
  });

  describe('#fetchAll', function() {
    it('returns an empty array when there are no values', function() {
      expect(cache.fetchAll(KEY1)).to.have.length(0);
    });

    it('returns all records', function() {
      var record1 = { id: 'abcd', text: 'something' };
      cache.persist(KEY1, record1);
      var record2 = { id: 'efgh', text: 'something' };
      cache.persist(KEY1, record2);

      var records = cache.fetchAll(KEY1);
      expect(records).to.have.length(2);
      expect(records[0]).to.deep.equal(record1);
      expect(records[1]).to.deep.equal(record2);
    });
  });

  describe('#fetchAllDirty', function() {
    it('returns an empty array when there are no dirty records', function() {
      cache.persist(KEY1, { foo: 'bar', isDirty: false });

      expect(cache.fetchAllDirty(KEY1)).to.have.length(0);
    });

    it('returns an array of dirty records', function() {
      cache.persist(KEY1, { foo: 'bar' });
      cache.persist(KEY1, { baz: 'qux' });
      cache.persist(KEY1, { qoo: 'faz', isDirty: false });

      expect(cache.fetchAllDirty(KEY1)).to.have.length(2);
    });
  });

  describe('#markClean', function() {
    it('updates a dirty record with isDirty set to false', function() {
      var dirtyRecord = { id: 'dirty' };
      var cleanRecord = { id: 'clean', isDirty: false };

      cache.persist(KEY1, dirtyRecord);
      cache.persist(KEY1, cleanRecord);

      expect(cache.fetchAllDirty(KEY1)).to.have.length(1);

      cache.markClean(KEY1, 'dirty');

      expect(cache.fetchAllDirty(KEY1)).to.have.length(0);
    });
  });
});
