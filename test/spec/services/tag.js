'use strict';

describe('Service: tag', function() {

  // load the service's module
  beforeEach(module('phoneappApp'));
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  // instantiate service
  var tag;
  beforeEach(inject(function(_Tag_) {
    tag = _Tag_;
  }));

  it('should do something', function() {
    expect( !! tag).toBe(true);
  });

  describe('MultiTagLoader', function() {
    var mockBackend, tag, loader;
    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function(_$httpBackend_, Tag, MultiTagLoader) {
      tag = Tag;
      mockBackend = _$httpBackend_;
      loader = MultiTagLoader;
    }));

    it('should load list of tags', function() {
      mockBackend.expectGET('http://llewandowski.waw.eo.pl:3000/api/tags').respond([{
        "name": "Tag A",
        "id": 1
      }, {
        "name": "Tag B",
        "id": 2
      }, {
        "name": "Tag C",
        "id": 3
      }]);

      var tags;

      var promise = loader();
      promise.then(function(rec) {
        tags = rec;
      });

      expect(tags).toBeUndefined();

      mockBackend.flush();

      expect(tags).toEqualData([{
        "name": "Tag A",
        "id": 1
      }, {
        "name": "Tag B",
        "id": 2
      }, {
        "name": "Tag C",
        "id": 3
      }]);
    });
  });

});