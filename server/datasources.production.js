'use strict';

let sqlUrl = process.env.sql_url;

module.exports = {
  db: {
    connector: 'mysql',
    connectionLimit: 4,
    url: sqlUrl
  }
};
