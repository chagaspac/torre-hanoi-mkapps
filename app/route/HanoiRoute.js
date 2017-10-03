var request = require('request');
var url = 'mongodb://localhost:27017/myproject';
const uuidv1 = require('uuid/v1');

module.exports = (application) => {

  application.get('/api/hanoi', (req, res) => {
    let number = req.query.number;
    if (number != undefined && number != null && number > 1) {
      let uuid = uuidv1();
      res.status(200).json({ "uuid": uuid });
      application.app.controller.HanoiController.resolverHanoi(application, number, uuid);
      console.log("resolverHanoi - " + uuid);
    } else {
      res.status(502).json({ "error": "You have to inform the number parameter greater than 1." });
    }
  });

  application.get('/api/hanoi/state', (req, res) => {
    let uuid = req.query.uuid;
    if (uuid != undefined && uuid != null && uuid != "") {
      application.app.controller.HanoiController.getState(application, uuid).then(result => {
        res.status(200).json(result);
      }, err => {
        console.error(err);
        res.status(500).json({ "error": "internal server error" });
      });
    } else {
      res.status(502).json({ "error": "You have to inform the transaction uuid parameter not empty." });
    }
  });


  application.get('/api/hanoi/history', (req, res) => {
    application.app.controller.HanoiController.getHistory(application).then(result => {
      res.status(200).json(result);
    }, err => {
      console.error(err);
      res.status(500).json({ "error": "internal server error" });
    });
  });


}
