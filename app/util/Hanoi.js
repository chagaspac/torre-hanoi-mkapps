class Hanoi {
  
  constructor(numdisks, origin, destiny, tmp) {
    this._numdisks = numdisks;
    this._origin = origin;
    this._destiny = destiny;
    this._tmp = tmp;
  }

  movedisk(diskN, origin, destiny, solution) {
    solution.movimentsList.push({
      disk: diskN,
      origin: origin,
      destiny: destiny
    });
  }

  hanoi(diskN, origin, destiny, tmp, solution) {
    if (diskN === 1) this.movedisk(1, origin, destiny, solution);
    else {
      this.hanoi(diskN - 1, origin, tmp, destiny, solution);
      this.movedisk(diskN, origin, destiny, solution);
      this.hanoi(diskN - 1, tmp, destiny, origin, solution);
    }
  }

  getResultOfHanoi() {
    return new Promise(
      (resolve, reject) => {
        try {
          let solution = {
            movimentsList: []
          };

          this.hanoi(this._numdisks, this._origin, this._destiny, this._tmp, solution);

          resolve(solution);
        } catch (e) {
          reject(e);
        }
      });
  }

}

module.exports = function () {
	return Hanoi;
}