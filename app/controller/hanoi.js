let movedisk = (diskN, origin, destiny, solution) => {
  solution.movimentsList.push({
      disk: diskN,
      origin: origin,
      destiny: destiny
  });
}

let hanoi = (diskN, origin, destiny, tmp, solution) => {
    if (diskN === 1) movedisk(1, origin, destiny, solution);
    else {
        hanoi(diskN-1, origin, tmp, destiny, solution);
        movedisk(diskN, origin, destiny, solution);
        hanoi(diskN-1, tmp, destiny, origin, solution);
    }
}

let resolverHanoy = (numdisks, origin, destiny, tmp) => {
  return new Promise(
    function(resolve, reject) {  
      try{
        let solution = {
            movimentsList : []
        };
        
        hanoi(numdisks, origin, destiny, tmp, solution);

        resolve(solution);
      }catch(e){
        reject(e);
      }
  });
}

module.exports = resolverHanoy;