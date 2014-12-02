'use strict';

/*jshint camelcase:false */
/*jshint maxlen:false */

var validator = require('validator');

exports.validate = function(params) {
  if(validator.isNull(params.username)) {
    return 'The username field is required.';
  } else if(!validator.isLength(params.username, 3, 255)) {
    return 'The username must be between 3 and 255 characters.';
  }

  if(validator.isNull(params.password)) {
    return 'The password field is required.';
  } else if(!validator.isLength(params.password, 6)) {
    return 'The password must be at least 6 characters.';
  }

  if(validator.isNull(params.password_confirmation)) {
    return 'The password confirmation field is required.';
  } else if(!validator.equals(params.password, params.password_confirmation)) {
    return 'The password confirmation does not match.';
  }

  if(validator.isNull(params.email)) {
    return 'The password confirmation field is required.';
  } else if(!validator.isEmail(params.email)) {
    return 'The email format is invalid.';
  }

  return null;
};
