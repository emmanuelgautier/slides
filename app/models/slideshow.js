'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SlideShowSchema = new Schema({
  name: {type: String},
  description: {type: String},
  public: {type: boolean, default: true},
  user: {type: Schema.ObjectId, ref: 'User'},
  token: {type: String}
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('SlideShow', SlideShowSchema);