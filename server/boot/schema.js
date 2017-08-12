'use strict';

module.exports = app => {
  let ds = app.datasources.db;

  ds.autoupdate(err => {
    if (err) throw err;

    createBootstrapUsers();
  });

  function createBootstrapUsers() {
    let user = app.models.user;

    user.create([
      {
        username: 'test',
        email: 'test6@test.com',
        password: 'testpassword',
        emailVerified: true
      }
    ]);
  }
};
