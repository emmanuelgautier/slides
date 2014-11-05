'use strict';

var mongoose = require('mongoose'),
    crypto   = require('crypto'),
    Schema   = mongoose.Schema,

    //génération d'un hash à partir de la date et d'un nombre aléatoire
    generateToken = function() {
      return crypto.createHash('md5')
                  .update( Date.now() + Math.random().toString() )
                  .digest('hex');
    };

var RoomSchema = new Schema({
  name: { type: String, default: null },
  description: { type: String},
  public: { type: Boolean, default: true },
  token: { type: String, index: { unique: true }, default: generateToken },
  master: { type: String, select: false },
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Room', RoomSchema);
