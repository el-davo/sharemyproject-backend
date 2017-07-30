'use strict';

module.exports = Me => {

  Me.me = function (req, next) {
    let AccessToken = Me.app.models.AccessToken;
    AccessToken.findForRequest(req, {},  (aux, accesstoken) => {
      let UserModel = Me.app.models.User;
      UserModel.findById(accesstoken.userId, next);
    });
  };

  Me.remoteMethod(
    'me',
    {
      accepts: {arg: 'req', type: 'object', http: {source: 'req'}},
      returns: {arg: 'user', type: 'object'},
      http: {path: '/', verb: 'get'},
    }
  );
};
