import * as express from 'express';
import Logger from './logger';
import expressLoader from './express';
import socketConnection from './socket';
import jobs from './jobs';

export default async (app: express.Application) => {
  await expressLoader(app);
  Logger.info('Express loaded!');
  // await socketConnection();
  // Logger.info('Sockets loaded!');
  jobs();
  Logger.info('Cron Jobs loaded!');
};
