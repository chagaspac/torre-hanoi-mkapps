const test = require('tape')
var Hanoi = require('../app/util/Hanoi');


test('Testar hanoi com 2', (t) => {
    let h = new Hanoi(2, 'A', 'B', 'C');
    h.getResultOfHanoi().then(res => {
        t.assert(true, "Processou com sucesso")
    }, err => {
        t.error(err, "Deu erro");
    }).then(() => {
        t.end();
    });
});
