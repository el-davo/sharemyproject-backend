'use strict';

module.exports = {
  mq: {
    host: process.env.mq_host || 'localhost',
    username: process.env.mq_username || 'user',
    password: process.env.mq_password || 'pass'
  },
  screenshot: {
    token: '1b01e9c0-9326-11e7-9d15-69df2d37871c',
    s3Name: 'test'
  }
};
