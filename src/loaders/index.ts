import * as express from 'express';
import Logger from './logger';
import expressLoader from './express';
import socketConnection from './socket';

export default async (app: express.Application) => {
  await expressLoader(app);
  Logger.info('Express loaded!');
  // await socketConnection();
  // Logger.info('Sockets loaded!');
};
