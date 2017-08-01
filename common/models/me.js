'use strict';

module.exports = Me => {
  Me.me = (req, next) => {
    let AccessToken = Me.app.models.AccessToken;
    AccessToken.findForRequest(req, {},  (aux, accesstoken) => {
      let UserModel = Me.app.models.User;
      let UserIdentityModel = Me.app.models.UserIdentity;
      UserModel.findById(accesstoken.userId, (error, user) => {
        if (error) {
          return next(error);
        }

        UserIdentityModel.findById(accesstoken.userId, (error, identity) => {
          next(error, {user, identity});
        });
      });
    });
  };

  Me.remoteMethod(
    'me',
    {
      accepts: {arg: 'req', type: 'object', http: {source: 'req'}},
      returns: {arg: 'user', type: 'object'},
      http: {path: '/', verb: 'get'}
    }
  );
};
