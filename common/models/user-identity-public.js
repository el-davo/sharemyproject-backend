'use strict';

module.exports = UserIdentityPublic => {
  UserIdentityPublic.user = (userId, next) => {
    UserIdentityPublic.app.models.UserIdentity.findOne({where: {userId}}, (error, identity) => {
      next(error, identity);
    });
  };

  UserIdentityPublic.remoteMethod('user',
    {
      accepts: {arg: 'userId', type: 'string', required: true},
      returns: {arg: 'identity', type: 'object'},
      http: {path: '/', verb: 'get'}
    }
  );
};
