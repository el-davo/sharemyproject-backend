'use strict';

const URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports = Link => {
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

  Link.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      if (!ctx.instance.url.match(/^[a-zA-Z]+:\/\//)) {
        ctx.instance.url = `http://${ctx.instance.url}`;
      }
    } else {
      if (!ctx.data.url.match(/^[a-zA-Z]+:\/\//)) {
        ctx.data.url = `http://${ctx.data.url}`;
      }
    }
    next();
  });
};
