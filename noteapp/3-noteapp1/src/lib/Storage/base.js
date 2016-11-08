var uuid = require('uuid');

export default class Storage {
 	// implemented by sub-classes
	insertOne(record) {
	}
	deleteOne(idKey) {
	}
	findAll() {
	}
	findOne(idKey) {
	}
	
	_getKey(){
		return uuid.v1();
	}
}
