/*global module, require, console*/
/*jslint nomen: false*/
module.exports = {

  appName: "Luchador",

  server : {
    dev : {
      port: 3000
    },

    debug : {
      port: 3003
    },

    prod : {
      port: 3033
    }
  },

  proxy : {
    '\/api\/.*' : {
      target: 'http://localhost:8000',
    }
  }
};