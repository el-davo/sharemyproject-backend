'use strict';

module.exports = List => {
  // Validations
  List.validatesLengthOf('name', {
    min: 1,
    max: 256,
    message: {
      min: 'Name is to short',
      max: 'Name is to long'
    }
  });

  List.validatesLengthOf('description', {
    max: 500,
    message: {
      min: 'Description is to short',
      max: 'Description is to long'
    }
  });
};
