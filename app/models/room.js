var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    RoomSchema = new Schema({
      key: { type: String },
      name: { type: String, default: null },
      createdAt: { type: Date, default: Date.now }
    });

mongoose.model('Room', RoomSchema);