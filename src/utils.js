import { ApolloError } from 'apollo-server-errors';

import { errors } from './constant';

export class CustomApolloError extends ApolloError {
  constructor(error, messageExtension = '') {
    if (!(error instanceof Error)) {
      // eslint-disable-next-line no-param-reassign
      error = new Error(error);
    }
    if (errors[error.message] === undefined) {
      super(error.message, 'UnknownError', {
        httpCode: 400,
      });
    } else {
      const { httpCode, message } = errors[error.message];
      super(`${message} ${messageExtension}`, error.message, {
        httpCode,
      });
    }
  }
}

export function isValidDate(d) {
  return d instanceof Date && !Number.isNaN(d.getTime());
}

export function formatDateTime(date, time) {
  const formattedTime = `${time}`.padStart(2, 0);
  return new Date(`${date}T${formattedTime}:00:00`);
}
