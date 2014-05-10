'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema,

    generateToken = function() {
      //génération d'un hash à partir de la date et d'un nombre aléatoire
      var hash = crypto.createHash('sha1')
                    .update( Date.now().toString() + Math.random().toString() )
                    .digest('base64');

      //suppression des caractères spéciaux
      hash = hash.replace(/[^0-9a-zA-Z]+/, '');

      //suppression du caractère = de fin
      hash = hash.substr(0, hash.length - 1);

      return hash;
    },

    RoomSchema = new Schema({
      name: { type: String, default: null },
      description: { type: String},
      public: { type: Boolean, default: true },
      token: { type: String, index: { unique: true }, default: generateToken },
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