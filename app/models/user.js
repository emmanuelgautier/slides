'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  provider: String,
  id: String,
  displayNmae: String,
  name: {
    familyName: String,
    givenName: String,
    middleNam: String
  },
  emails: [{
    value: String,
    type: String,

  }],
  photos: [{
    value: String
  }]
});

mongoose.model('User', UserSchema);
