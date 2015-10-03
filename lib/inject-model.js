'use strict';

import getModel from 'waterline-models';

export default (modelName, modelKey = 'Model') => {
  let modelPromise = getModel(modelName);
  return (req, res, next) => {
    modelPromise
      .then((Model) => {
        req[modelKey] = Model;
        next();
      })
      .catch(next);
  };
};
