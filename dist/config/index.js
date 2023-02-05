"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var envFound = dotenv_1.default.config();
// if (envFound.error) {
//   // This error should crash whole process
//   throw new Error("⚠️  Couldn't find .env file  ⚠️");
// }
exports.default = {
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
    botAccPvtKey: process.env.PRIVATE_KEY || '',
    //Zondax API URL
    zondaxURL: 'https://api.zondax.ch/fil/data/v1/hyperspace/',
    //Zondax Token
    zondaxToken: process.env.ZONDAX_TOKEN || '',
    //Push chat webhook URL
    botWebhookURL: 'https://push-bot-webhook.onrender.com/',
};
