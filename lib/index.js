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

var buildUrl = function(path, query) {
  if (query == null) return path;
  return [ path, query ].join('?');
};

module.exports = function(uri, options) {
  var url = getUrl(uri)
    , client = restify.createJsonClient({ url: url.host, agent: false, headers: buildHeaders(options), retry: { retries: 3 }});

  Promise.promisifyAll(client);

  return {
    get: function(query) {
      if (typeof query === 'object') query = qs.stringify(query);

      return client.getAsync(buildUrl(url.path, query)).then(extractData);
    }
    
  , post: function(data, query) {
      return client.postAsync(buildUrl(url.path, query), data).then(extractData);
    }
    
  , put: function(data, query) {
      return client.putAsync(buildUrl(url.path, query), data).then(extractData);
    }
    
  , delete: function(query) {
      return client.delAsync(buildUrl(url.path, query)).then(extractData);      
    }
  }
};
