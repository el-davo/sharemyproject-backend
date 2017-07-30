'use strict';

const FACEBOOK_CLIENTID = process.env.facebookClientId;
const FACEBOOK_CLIENT_SECRET = process.env.facebookClientSecret;

module.exports = {
  'facebook-login': {
    provider: 'facebook',
    module: 'passport-facebook',
    clientID: FACEBOOK_CLIENTID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    callbackPath: '/auth/facebook/callback',
    authPath: '/auth/facebook',
    successRedirect: 'http://localhost:3000',
    scope: ['email', 'public_profile'],
    profileFields: ['gender', 'locale', 'name', 'timezone', 'email', 'picture'],
  },
};

