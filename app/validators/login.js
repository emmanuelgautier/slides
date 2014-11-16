'use strict';

/*jshint camelcase:false */
/*jshint maxlen:false */

var validator = require('validator');

exports.validate = function(params) {
  var validateStatement = {
    messages: {
      username: null,
      password: null
    },
    error: false
  };

  if(validator.isNull(params.username)) {
    validateStatement.messages.username = 'The username field is required.';
  }

  if(validator.isNull(params.password)) {
    validateStatement.messages.password = 'The password field is required.';
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
