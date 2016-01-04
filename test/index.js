var chai = require('chai')
  , sinon = require('sinon')
  , should = chai.should()
  , proxyquire = require('proxyquire')

chai.use(require('sinon-chai'));

var fake = { then: function(response) { return { data: null }}};

describe('Request', function() {

  var axios = {
    get: sinon.stub().returns(fake)
  , post: sinon.stub().returns(fake)
  , put: sinon.stub().returns(fake)
  , delete: sinon.stub().returns(fake)
  };

  var sut = proxyquire('../lib', { axios: axios })
    , data = { name: 'john' };

  describe('#get', function() {

    before(function() {
      sut('users/users').get();
    });

    it('should call axios.get', function() {
      axios.get.should.have.been.called;
    });

  });

  describe('#get with string query', function() {

    before(function() {
      axios.get.reset();
      sut('users/users').get('q=123');
    });

    it('should call axios.get', function() {
      axios.get.should.have.been.called;
    });

    it('should call axios.get with correct url', function() {
      axios.get.should.have.been.calledWith('/users?q=123');
    });
  });

  describe('#get with hash query', function() {

    before(function() {
      axios.get.reset();
      sut('users/users').get({ q: 123, count: 10 });
    });

    it('should call axios.get', function() {
      axios.get.should.have.been.called;
    });

    it('should call axios.get with correct url', function() {
      axios.get.should.have.been.calledWith('/users?q=123&count=10');
    });
  });

  describe('#post', function() {

    before(function() {
      sut('users/users').post(data);
    });

    it('should call axios.post', function() {
      axios.post.should.have.been.called;
    });

    it('should call axios.post with correct parameters', function() {
      axios.post.should.have.been.calledWith('/users', data);
    });

  });

  describe('#put', function() {

    before(function() {
      sut('users/users/123').put(data);
    });

    it('should call axios.put', function() {
      axios.put.should.have.been.called;
    });

    it('should call axios.put with correct parameters', function() {
      axios.put.should.have.been.calledWith('/users/123', data);
    });

  });

  describe('#delete', function() {

    before(function() {
      sut('users/users/123').delete();
    });

    it('should call axios.delete', function() {
      axios.delete.should.have.been.called;
    });

    it('should call axios.delete with correct url', function() {
      axios.delete.should.have.been.calledWith('/users/123');
    });

  });

});