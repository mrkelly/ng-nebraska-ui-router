var security = require('../services/security.js');

module.exports = {
  logout : function(req, res, next) {
    security.logout(req, res, next);
  }
}
