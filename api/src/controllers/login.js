var security = require('../services/security.js');

module.exports = {
  currentUser : function(req, res, next) {
    security.sendCurrentUser(req, res, next);
  },
  login : function(req, res, next) {
    security.login(req, res, next);
  }
}
