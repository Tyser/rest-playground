'use strict';

import {STATUS_CODES} from 'http';

export function errorHandler(err, req, res, next) {
  // If there is no stack, we're assuming it's a waterline error...
  // TODO find a better way to distiguish waterline errors
  if (err.toJSON && err.toJSON().error === 'E_VALIDATION') {
    err.details = err.invalidAttributes;
    err.message = err.toJSON().summary;
  }

  err.status = err.status || 500;
  res.status(err.status);

  res.json({
    error: STATUS_CODES[err.status],
    code: err.status,
    message: err.message,
    details: err.details
  });
}
