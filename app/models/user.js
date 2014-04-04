'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

 var UserSchema = new Schema({
 	name: {type: String},
 	firstname: {type:  String}
 });

 mongoose.model('User', UserSchema);