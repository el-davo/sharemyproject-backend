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
};
