import dotenv from 'dotenv';
const envFound = dotenv.config();

// if (envFound.error) {
//   // This error should crash whole process
//   throw new Error("⚠️  Couldn't find .env file  ⚠️");
// }

export default {
  // Environment
  env: process.env.NODE_ENV || 'development',
  // Server Port
  port: process.env.PORT || 3000,
  // Winston logger level
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  // API configs
  api: {
    prefix: '/api',
  },
  // Bot Name
  bot: 'FVM HyperSpace Bot',
  // Provider
  provider: process.env.FVM_PROVIDER,
  // Unit
  unit: 'TFIL',
  //Newtwork
  network: 'Filecoin - HyperSpace Testnet',
  //chainId
  chainId: 3141,
  //evm address of bot
  botAddr: '0x7B2880C0aC607cFea7cE67DAb0F8f562Cee73f76',
  //bot private key
  botAccPvtKey: process.env.PRIVATE_KEY || ""
};
