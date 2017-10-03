class HanoiDAO {
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
    if (diskN === 1) movedisk(1, origin, destiny, solution);
    else {
      hanoi(diskN - 1, origin, tmp, destiny, solution);
      movedisk(diskN, origin, destiny, solution);
      hanoi(diskN - 1, tmp, destiny, origin, solution);
    }
  }

  getResultOfHanoi(numdisks, origin, destiny, tmp) {
    return new Promise(
      (resolve, reject) => {
        try {
          let solution = {
            movimentsList: []
          };

          hanoi(numdisks, origin, destiny, tmp, solution);

          resolve(solution);
        } catch (e) {
          reject(e);
        }
      });
  }

}
