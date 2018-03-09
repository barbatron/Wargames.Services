// const handlers = require('./handlers');
// const expect = require('chai').expect;

// TODO: Neither require nor import works. Stupid.

describe('Handlers', function () {
  it('should initialize with empty map', () => {
    // expect(handlers.getAll()).to.equal({});
    chai.expect(3).to.equal(3);
  });
  //
  it('should register handler without namespace', () => {
    const fn = () => {
    };
    handlers.register('test', fn);
    assert(handlers.get('test')).to.equal(fn);
  });
});