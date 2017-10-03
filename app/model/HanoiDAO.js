class HanoiDAO {

	constructor(connection) {
		this._connection = connection();
		this._collection = 'threads';
	}

	insertThread(thread) {
		return new Promise(
			(resolve, reject) => {
				this._connection.open((err, db) => {
					db.collection(this._collection).insertMany([thread], (err, result) => {
						resolve(result);
						db.close();
					}, err => {
						reject(err);
						db.close();
					});
				});
			});
	}

	updateThread(uuid, thread) {
		return new Promise(
			(resolve, reject) => {
				this._connection.open((err, db) => {
					db.collection(this._collection).updateOne(uuid, thread, (err, result) => {
						resolve(result);
						db.close();
					}, err => {
						reject(err);
						db.close();
					});
				});
			});

	}
	findThread(uuid) {
		return new Promise(
			(resolve, reject) => {
				this._connection.open((err, db) => {
					db.collection(this._collection).find(uuid, { _id: 0 }).limit(1).toArray((err, result) => {
						resolve(result);
						db.close();
					}, err => {
						reject(err);
						db.close();
					});
				});
			});

	}
	getHistory(filter, fields) {
		return new Promise(
			(resolve, reject) => {
				this._connection.open((err, db) => {
					db.collection(this._collection).find(filter, fields).toArray((err, result) => {
						resolve(result);
						db.close();
					}, err => {
						reject(err);
						db.close();
					});
				});
			});

	}

}

module.exports = function () {
	return HanoiDAO;
}