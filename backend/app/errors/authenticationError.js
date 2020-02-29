import BaseError from './base';

class AuthenticationError extends BaseError {

  constructor(message) {
    super(message, 401);
  }

}

module.exports =  AuthenticationError;
