var qs = require('qs')
  , axios = require('axios')
  , getUrl = require('./url');

var extractData = function(response) {
  return response.data;
};

var toBase64 = function(str) {
  return (new Buffer(str || '', 'utf8')).toString('base64');
};

var buildConfig = function(options) {
  var headers = {};

  if (options.origin) headers['x-original-host'] = options.origin;
  if (options.session && options.session.id) headers['x-original-session'] = options.session.id;
  if (options.user) headers['authorization'] = 'Basic ' + toBase64([ options.user.name, options.user.pass ].join(':'));

  return { headers: headers };
};

module.exports = function(uri, options) {
  var url = getUrl(uri)
    , config = buildConfig(options || {});

  return {
    get: function(query) {
      if (typeof query === 'object') query = qs.stringify(query);

      return axios.get([ url, query ].join('?'), config).then(extractData);
    }
    
  , post: function(data) {
      return axios.post(url, data, config).then(extractData);
    }
    
  , put: function(data) {
      return axios.put(url, data, config).then(extractData);
    }
    
  , delete: function() {
      return axios.delete(url, config).then(extractData);      
    }
  }
};
