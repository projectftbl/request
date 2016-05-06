var chai = require('chai')
  , sinon = require('sinon')
  , should = chai.should()
  , proxyquire = require('proxyquire')

chai.use(require('sinon-chai'));

var fake = { then: function(response) { return { data: null }}};

describe('Request', function() {

  var client = {
    getAsync: sinon.stub().returns(fake)
  , postAsync: sinon.stub().returns(fake)
  , putAsync: sinon.stub().returns(fake)
  , deleteAsync: sinon.stub().returns(fake)      
  };

  var restify = {
    createJsonClient: sinon.stub().returns(client)
  };

  var sut = proxyquire('../lib', { restify: restify })
    , data = { name: 'john' };

  describe('#get', function() {

    before(function() {
      sut('users/users').get();
    });

    it('should call client.getAsync', function() {
      client.getAsync.should.have.been.called;
    });

  });

  describe('#get with string query', function() {

    before(function() {
      client.getAsync.reset();
      sut('users/users').get('q=123');
    });

    it('should call client.getAsync', function() {
      client.getAsync.should.have.been.called;
    });

    it('should call client.getAsync with correct url', function() {
      client.getAsync.should.have.been.calledWith('/users?q=123');
    });
  });

  describe('#get with hash query', function() {

    before(function() {
      client.getAsync.reset();
      sut('users/users').get({ q: 123, count: 10 });
    });

    it('should call client.getAsync', function() {
      client.getAsync.should.have.been.called;
    });

    it('should call client.getAsync with correct url', function() {
      client.getAsync.should.have.been.calledWith('/users?q=123&count=10');
    });
  });

  describe('#post', function() {

    before(function() {
      sut('users/users').post(data);
    });

    it('should call client.postAsync', function() {
      client.postAsync.should.have.been.called;
    });

    it('should call client.postAsync with correct parameters', function() {
      client.postAsync.should.have.been.calledWith('/users', data);
    });

  });

  describe('#put', function() {

    before(function() {
      sut('users/users/123').put(data);
    });

    it('should call client.putAsync', function() {
      client.putAsync.should.have.been.called;
    });

    it('should call client.putAsync with correct parameters', function() {
      client.putAsync.should.have.been.calledWith('/users/123', data);
    });

  });

  describe('#delete', function() {

    before(function() {
      sut('users/users/123').delete();
    });

    it('should call client.deleteAsync', function() {
      client.deleteAsync.should.have.been.called;
    });

    it('should call client.deleteAsync with correct url', function() {
      client.deleteAsync.should.have.been.calledWith('/users/123');
    });

  });

});