'use strict';

/*jshint camelcase:false */
/*jshint maxlen:false */

var validator = require('validator');

exports.validate = function(params) {
  var validateStatement = {
    messages: {
      username: null,
      password: null,
      password_confirmation: null,
      email: null
    },
    error: false
  };

  if(validator.isNull(params.username)) {
    validateStatement.messages.username = 'The username field is required.';
  } else if(!validator.isLength(params.username, 3, 255)) {
    validateStatement.messages.username = 'The username must be between 3 and 255 characters.';
  }

  if(validator.isNull(params.password)) {
    validateStatement.messages.password = 'The password field is required.';
  } else if(!validator.isLength(params.password, 6)) {
    validateStatement.messages.password = 'The password must be at least 6 characters.';
  }

  if(validator.isNull(params.password_confirmation)) {
    validateStatement.messages.password_confirmation = 'The password confirmation field is required.';
  } else if(!validator.equals(params.password, params.password_confirmation)) {
    validateStatement.messages.password_confirmation = 'The password confirmation does not match.';
  }

  if(validator.isNull(params.email)) {
    validateStatement.messages.email = 'The password confirmation field is required.';
  } else if(!validator.isEmail(params.email)) {
    validateStatement.messages.email = 'The email format is invalid.';
  }

  for(var field in validateStatement.messages) {
    if( validateStatement.messages.hasOwnProperty(field) && 
        !validator.isNull(validateStatement.messages[field])) {
      validateStatement.error = true;
      break;
    }
  }

  return validateStatement;
};
