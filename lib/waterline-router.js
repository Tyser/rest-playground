'use strict';

import getModels from 'waterline-models';
import {Router} from 'express';
import {set} from 'object-path';
import CustomError from './custom-error';

class NotFoundError extends CustomError {
  constructor(message) { super(message, 404); }
}

class WaterlineRouter {

  constructor(schema) {
    this.router = new Router({mergeParams: true});
    Object.keys(schema).forEach((url) => {
      this.router.use(new Resource(url, schema[url]).router);
    });
  }

  express() {
    return this.router;
  }

}


class Resource {
  constructor(url, definition) {
    this.router = new Router({mergeParams: true});
    this.model = getModels(definition.model || '');
    this.parent = definition.parent;

    let keyPath = definition.model + 'Id';

    this.router.route(url)
      .get(this.query())
      .post((req, res, next) => {
        if (this.parent) {
          req.body[this.parent.key] = req.params[this.parent.param];
        }
        this.model
          .then((Model) => Model.create(req.body))
          .then((doc) => res.status(201).json(doc))
          .catch(next);
      });

    this.router.route(url + '/:' + keyPath)
      .get([
        (req, res, next) => (this.model
          .then((Model) => set(
            req,
            `query.where.${Model.primaryKey}`, req.params[keyPath]
          ))
          .then(() => next())
          .catch(next)
        ),
        this.query()
      ])
      .put((req, res, next) => {
        this.model
          .then((Model) => Model.update({
            [Model.primaryKey]: req.params[keyPath]
          }, req.body))
          .then(([doc]) => {
            if (!doc) { throw new NotFoundError(`Not found`); }
            return doc;
          })
          .then((doc) => res.status(200).json(doc))
          .catch(next);
      })
      .delete((req, res, next) => {
        this.model
          .then((Model) => Model.destroy({
            [Model.primaryKey]: req.params[keyPath]
          }))
          .then(([doc]) => {
            if (!doc) { throw new NotFoundError(`Not found`); }
          })
          .then(() => res.sendStatus(204))
          .catch(next);
      });
  }
  query() {
    return (req, res, next) => {
      this.model.then((Model) => {
        let filter = Object.assign({
          where: null,
          limit: null,
          include: [],
          sort: null,
          offset: null
        }, req.query);

        if (this.parent) {
          filter.where = Object.assign({}, filter.where, {
            [this.parent.key]: req.params[this.parent.param]
          });
        }

        filter.include = toArray(filter.include);

        let method = 'find';
        let single = false;

        if (filter.where && filter.where[Model.primaryKey]) {
          method += 'One';
          single = true;
        }

        let query = Model[method](filter.where);

        if (filter.sort) { query.sort(filter.sort); }
        if (filter.offset) { query.skip(filter.offset); }
        if (filter.limit) { query.limit(filter.limit); }
        if (filter.include.length) {
          filter.include.forEach((sub) => query.populate(sub));
        }

        return query.then((results) => {
          if (single && !results) {
            throw new NotFoundError(`Not found`);
          }
          res.status(200).json(results);
        });
      }).catch(next);
    };
  }
}


function findParentKey(model, parent) {
  return Object.keys(model.definition).find((key) => {
    return model.definition[key].model === parent;
  });
}


function toArray(str) {
  if (Array.isArray(str)) { return str; }
  return str.split(',').map((piece) => piece.trim());
}



export default WaterlineRouter;
