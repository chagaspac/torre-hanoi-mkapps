module.exports = () => {
  return {
    resolverHanoi: (application, numdisks, uuid) => {
      let hanoiDAO = new application.app.model.HanoiDAO(application.config.dbConnection);
      hanoiDAO.insertThread({ uuid: uuid, status: "1", diskNumber: Number(numdisks), creationTimestamp: +new Date() }).then(res => {
        console.log(uuid + " - Inserted");
        let hanoi = new application.app.util.Hanoi(numdisks, 'A', 'B', 'C');
        hanoi.getResultOfHanoi().then((a) => {
          if (a != null && a != undefined) {
            hanoiDAO.updateThread({ uuid: uuid }, { $set: { returnCode: 0, resultado: a, endTimestamp: +new Date() } }).then(res => {
              console.log(uuid + " - Updated");
            });
          } else {
            hanoiDAO.updateThread({ uuid: uuid }, { $set: { returnCode: 98, resultado: a, endTimestamp: +new Date(), error: "Invalid result - " + a } }).then(res => {
              console.log(uuid + " - Updated with error");
            });
          }
        });
      }, (err) => {
        hanoiDAO.updateThread({ uuid: uuid }, { $set: { returnCode: 99, resultado: a, endTimestamp: +new Date(), error: "DAO error - " + err } }).then(res => {
          console.log(uuid + " - Updated with error");
        });
      });
    },
    getState: (application, uuid) => {
      return new Promise(
        (resolve, reject) => {
          let hanoiDAO = new application.app.model.HanoiDAO(application.config.dbConnection);
          hanoiDAO.findThread({ uuid: uuid }).then(res => {
            resolve(res);
          }, err => {
            reject(err);
          })
        }
      );
    },
    getHistory: (application) => {
      return new Promise(
        (resolve, reject) => {
          let hanoiDAO = new application.app.model.HanoiDAO(application.config.dbConnection);
          hanoiDAO.getHistory({}, { _id: 0, creationTimestamp: 1, endTimestamp: 1, diskNumber: 1 }).then(res => {
            resolve(res);
          }, err => {
            reject(err);
          })
        }
      );
    }
  }
}
