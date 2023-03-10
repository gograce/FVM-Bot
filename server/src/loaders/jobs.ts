import * as cron from 'node-cron';
import { callApi } from '../helpers/api';
import config from '../config';
import Logger from './logger';

export default () => {
  // schedule the cron job to run every 5 minutes
  // Hack to prevent webhook to go in sleep mode
  cron.schedule('*/1 * * * *', async () => {
    callApi(config.botWebhookURL, '', {});
    Logger.info('Pinged Push Chat WebHook');
  });
};
