'use strict';

var crypto = require('crypto'),
	rooms = {},
	roomsId = [],
	roomsName = [],

	roomProperties = ['name'],

	hash = null,
	lastId = 0;

exports.create = function(room){
	//verification des attributs
	for(var property in roomProperties){
		if(!room.hasOwnProperty(property)){
			return false;
		}
	}

	room.id = ++lastId;
	hash = crypto.createHash('sha1').update(room.name + room.id).digest('base64');

	//suppression des charactères spéciaux
	hash = hash.replace(/[^0-9a-zA-Z]+/, '');

	//ajout des index dans les tabes de nom et d'id
	roomsId[room.id] 	 = hash;
	roomsName[room.name] = hash;

	rooms[hash] = room;

	return true;
};

exports.getByName = function(name){
	return (hash = roomsName[name]) ? rooms[hash] : {};
};

exports.getById = function(id){
	return (hash = roomsId[id]) ? rooms[hash] : {};
};

exports.rooms = {
	all: function(){
		return rooms;
	},

	public: function(){

	},

	private: function(){

	}
};

exports.session = {
	start: function(){

	},

	stop: function(){

	},

	suspend: function(){

	}
};
