import Chai from 'Chai';
let assert = Chai.assert;

describe('Babel', () => {
    it('x', () => {
        let a = eval('({ a: function(m) { m.name} })');
        console.log(a);
        assert.equal(2, 2);
    });
});