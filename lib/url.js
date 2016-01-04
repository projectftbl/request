var configuration = require('@ftbl/configuration');

module.exports = function(uri) {

  var index = uri.indexOf('/')
    , host = configuration([ 'hosts', uri.substr(0, index) ].join(':')) || configuration('host')
    , uri = uri.substr(index + 1);

  return [ host, uri ].join('/')
};
