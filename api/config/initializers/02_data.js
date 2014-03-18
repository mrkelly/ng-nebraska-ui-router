var _ = require('lodash'),
  db = require('../../src/services/db.js'),
  Q = require('q');


////////////  USERS //////////////////
function seed() {
  console.log('Seeding Users into DB');
  var users = require('../../data/users').users;

  Q.fcall(function () {
    var userPromises = [];

    _.forEach(users, function (user) {
      console.log("Seeding " + user.username);

      db.insert('users', user)
        .then(function (newUser) {
          console.log("Created " + newUser.username);
        });
    });
  })

  .then(function (){
    console.log("Created user " + user.username + " and timesheets.");
  })

  .fail(function (err) {
    console.log("Error creating " + user.username + " : " + err);
  });
}

db.findOne('users', {username: 'admin'})
  .then(function (user) {
      console.log("User -> " + JSON.stringify(user));
      console.log("Found user. DB already seeded.");
      if (user === null) seed();
  }, function (err) {
    console.log("Error : " + err);
  });
