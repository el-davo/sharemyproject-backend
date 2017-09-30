'use strict';

const amqp = require('amqp');
let {mq, screenshot} = require('../config/config');

module.exports = Link => {

  const connection = amqp.createConnection({host: mq.host, login: mq.username, password: mq.password});

  connection.on('ready', () => {
    console.log('Connected to amqp');
  });

  connection.on('error', console.error);

  // Validations
  Link.validatesLengthOf('name', {
    min: 1,
    max: 256,
    message: {
      min: 'Name is to short',
      max: 'Name is to long'
    }
  });

  Link.validatesLengthOf('description', {
    max: 500,
    message: {
      min: 'Description is to short',
      max: 'Description is to long'
    }
  });

  Link.validatesFormatOf('url', {with: /\w+/});

  Link.observe('before save', (ctx, next) => {
    if (ctx.instance && ctx.instance.url) {
      if (!ctx.instance.url.match(/^[a-zA-Z]+:\/\//)) {
        ctx.instance.url = `http://${ctx.instance.url}`;
      }
    } else {
      if (ctx.data.url && !ctx.data.url.match(/^[a-zA-Z]+:\/\//)) {
        ctx.data.url = `http://${ctx.data.url}`;
      }
    }
    next();
  });

  Link.observe('after save', (ctx, next) => {
    if (ctx.isNewInstance) {
      connection.publish('linkcouch-screenshot-s3', {
        token: screenshot.token,
        s3Name: screenshot.s3Name,
        url: ctx.instance.url,
        screenshotId: ctx.instance.id
      });
    }
    next();
  });
};
