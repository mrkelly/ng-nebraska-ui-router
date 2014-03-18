module.exports = function routes () {
  this.get('/', require('../src/controllers/application'));
  this.get('/api/login', require('../src/controllers/login').currentUser);
  this.post('/api/login', require('../src/controllers/login').login);
  this.post('/api/logout', require('../src/controllers/logout').logout);
};
