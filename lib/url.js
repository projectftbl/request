var configuration = require('@recipher/configuration');

module.exports = function(uri) {
  var index = uri.indexOf('/')
    , host = configuration([ 'hosts', uri.substr(0, index) ].join(':')) || configuration('host')
    , path = uri.substr(index);

  return { host: host, path: path };
};
