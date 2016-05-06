var qs = require('qs')
  , Promise = require('bluebird')
  , restify = require('restify')
  , getUrl = require('./url');

var extractData = function(response) {
  return JSON.parse(response.res.body);
};

var toBase64 = function(str) {
  return (new Buffer(str || '', 'utf8')).toString('base64');
};

var buildHeaders = function(options) {
  var headers = {};

  if (options == null) options = {};

  if (options.origin) headers['x-original-host'] = options.origin;
  if (options.session && options.session.id) headers['x-original-session'] = options.session.id;
  if (options.token) headers['x-session-token'] = options.token;
  if (options.user) headers['authorization'] = 'Basic ' + toBase64([ options.user.name, options.user.pass ].join(':'));

  return headers;
};

module.exports = function(uri, options) {
  var url = getUrl(uri)
    , client = restify.createJsonClient({ url: url.host, agent: false, headers: buildHeaders(options), retry: { retries: 3 }});

  Promise.promisifyAll(client);

  return {
    get: function(query) {
      if (typeof query === 'object') query = qs.stringify(query);

      return client.getAsync([ url.path, query ].join('?')).then(extractData);
    }
    
  , post: function(data) {
      return client.postAsync(url.path, data).then(extractData);
    }
    
  , put: function(data) {
      return client.putAsync(url.path, data).then(extractData);
    }
    
  , delete: function() {
      return client.deleteAsync(url.path).then(extractData);      
    }
  }
};
