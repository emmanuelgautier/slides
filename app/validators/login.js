'use strict';

/*jshint camelcase:false */
/*jshint maxlen:false */

var validator = require('validator');

exports.validate = function(params) {
  if(validator.isNull(params.username)) {
    return 'The username field is required.';
  }

  if(validator.isNull(params.password)) {
    return 'The password field is required.';
  }

  return null;
};
