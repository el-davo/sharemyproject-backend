'use strict';

let sqlUrl = process.env.sql_url;
let sqlUsername = process.env.sql_username;
let sqlPassword = process.env.sql_password;

module.exports = {
  db: {
    connector: 'mysql',
    connectionLimit: 4,
    url: sqlUrl,
    username: sqlUsername,
    password: sqlPassword
  }
};
