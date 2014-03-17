module.exports = function routes () {
  this.get('/', require('../src/controllers/application'));
};
