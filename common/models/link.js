'use strict';

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
    min: 1,
    max: 500,
    message: {
      min: 'Description is to short',
      max: 'Description is to long'
    }
  });
};
