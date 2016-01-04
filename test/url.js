var should = require('chai').should()
  , sut = require('../lib/url');

describe('Url', function() {

  it('should return url without host for /users', function() {
    sut('users/users').should.equal('/users');
  });

  it('should return correct url for /users/123', function() {
    sut('users/users/123').should.equal('/users/123');
  });

  it('should return url with host for /groups', function() {
    sut('groups/groups').should.equal('https://api.defacto.io/groups/groups');
  });
  
});