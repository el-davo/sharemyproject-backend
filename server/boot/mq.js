'use strict';

const {mq} = require('../../common/config/config');
const amqp = require('amqp');
const QUEUE_NAME_IN = 'linkcouch-screenshot-s3-response';

module.exports = app => {
  const connection = amqp.createConnection({host: mq.host, login: mq.username, password: mq.password});

  connection.on('error', console.error);

  connection.on('ready', () => {
    connection.queue(QUEUE_NAME_IN, q => {
      q.subscribe(messageInfo => {
        let link = app.models.link;

        if (!messageInfo.s3.Location) {
          return console.info('Location does not exist');
        }

        link.findById(messageInfo.screenshotId, (err, dbLink) => {
          if (err || !dbLink) {
            return console.info('Link does not exist');
          }

          dbLink.updateAttribute('imageLocation', messageInfo.s3.Location, (err) => {
            if (err) {
              return console.error('Unable to update imageLocation');
            }
          });
        });
      });
    });
  });
};
