var request = require('request');
var hanoi = require('../controller/hanoi')
const uuidv1 = require('uuid/v1');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myproject';

module.exports = (application) => {

  application.get('/api/hanoi', (req, res) => {
    let number = req.query.number;
    console.log(number);
    if (number != undefined && number != null && number > 1) {
      let uuid = uuidv1();
      res.status(200).json({ "uuid": uuid });

      MongoClient.connect(url, (err, db) => {
        db.collection('processando').insertMany([{ uuid: uuid, status: "1", diskNumber: Number(number), creationTimestamp: +new Date() }], (err, result) => {
          console.log(uuid + " - Inserted");
          //console.log(result);

          hanoi(number, 'A', 'B', 'C').then((a) => {
            if (a != null && a != undefined) {
              db.collection('processando').updateOne({ uuid: uuid }, { $set: { returnCode: 0, resultado: a, endTimestamp: +new Date() } }, (err, result) => {
                console.log(uuid + " - Updated");
              });
            } else {
              db.collection('processando').updateOne({ uuid: uuid }, { $set: { returnCode: 98, resultado: a, endTimestamp: +new Date() } }, (err, result) => {
                console.log(uuid + " - Updated null");
              });
            }
          }, err => {
            db.collection('processando').updateOne({ uuid: uuid }, { $set: { returnCode: 99, resultado: a, endTimestamp: +new Date(), error: err } }, (err, result) => {
              console.log(uuid + " - Updated with error");
            });
          }).then(() => {
            db.close();
          });
        });
      });

    } else {
      res.status(502).json({ "error": "You have to inform the number parameter greater than 1." });
    }
  });

  application.get('/api/hanoi/state', (req, res) => {
    let uuid = req.query.uuid;
    if (uuid != undefined && uuid != null && uuid != "") {

      MongoClient.connect(url, (err, db) => {
        db.collection('processando').find({ uuid: uuid },{_id:0}).limit(1).toArray(function (err, doc) {
          console.log(doc);
          res.status(200).json(doc[0]);
        });
      });
    } else {
      res.status(502).json({ "error": "You have to inform the transaction uuid parameter not empty." });
    }
  });
  application.get('/api/hanoi/history', (req, res) => {
    MongoClient.connect(url, (err, db) => {
      db.collection('processando').find({}, { _id:0, creationTimestamp: 1, endTimestamp: 1, diskNumber: 1 }).toArray(function (err, doc) {
        res.status(200).json(doc);
      });
    });
  });

}
