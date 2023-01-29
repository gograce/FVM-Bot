import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { errors, celebrate, Joi } from 'celebrate';
import Logger from '../../loaders/logger';
import QueryService from '../../services/query';

const route = Router();

export default (app: Router) => {
  app.use(errors());
  app.use(route);

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        command: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      Logger.debug('Calling with command: %o', req.body.command);
      try {
        const queryInstance = Container.get(QueryService);
        const response = await queryInstance.solveQuery(req.body.command);
        console.log(response.result);
        return res.status(201).json(response);
      } catch (e) {
        Logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
