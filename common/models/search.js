'use strict';

module.exports = Search => {
  Search.search = (term, next) => {
    let list = Search.app.models.list;
    list.find({limit: 10, where: {name: {ilike: `${term}`}, isPrivate: false}}, (err, lists) => {
      if (err) {
        return next(err);
      }

      next(err, {lists});
    });
  };

  Search.remoteMethod(
    'search',
    {
      accepts: {arg: 'term', type: 'string', required: true},
      returns: {arg: 'results', type: 'object'},
      http: {path: '/', verb: 'get'}
    }
  );
};
