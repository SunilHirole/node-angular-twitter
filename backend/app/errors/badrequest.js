import BaseError from './base';

class BadRequestError extends BaseError {

  constructor(message) {
    super(message, 400);
  }

}

module.exports =  BadRequestError;
