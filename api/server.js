var Q = require('q'),
  bootable = require('bootable'),
  express = require('express'),
  http = require('http');

console.log("Booting Development Server");

// Wrap express with bootable
var app = bootable(express());

// Add environement phases to configure express for the target environment
app.phase(bootable.initializers('api/config/initializers'));
app.phase(require('bootable-environment')('api/config/environments'));

// Load the Routes
app.phase(bootable.routes('api/config/routes'));

// Boot the application
app.boot(function(err) {
  if (err) { throw err; }

  // Start the HTTP server
  Q.fcall(function() {
    var deferred = Q.defer();
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
      deferred.resolve();
    });
    return deferred.promise;
  })
  // Then send the ready to any parent processes
  .then(function() {
    if (process.send) {
      process.send({ status: 'ready' });
    }
  });

});
