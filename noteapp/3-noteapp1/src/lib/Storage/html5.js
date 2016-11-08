
import Storage from './base';

export default class HTML5Storage extends Storage {
	insertOne(record) {
		let id = super._getKey();
		console.log(id)
	}
	deleteOne(idKey) {
	}
	findAll() {
	}
	findOne(idKey) {
	}
}
