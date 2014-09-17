'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var generateToken = function() {

  //génération d'un hash à partir de la date et d'un nombre aléatoire
  return crypto.createHash('md5')
              .update( Date.now() + Math.random().toString() )
              .digest('hex');
};

var RoomSchema = new Schema({
  name: { type: String, default: null },
  description: { type: String},
  public: { type: Boolean, default: true },
  token: { type: String, index: { unique: true }, default: generateToken },
  master: { type: String, select: false, default: generateToken },
  createdAt: { type: Date, default: Date.now }
});

RoomSchema.statics = {
  list: function(options, number, page, callback) {
    this.find(options)
      .sort('createdAt')
      .limit(number)
      .skip(number * page)
      .exec(callback); //sort par date
  }
};

mongoose.model('Room', RoomSchema);
