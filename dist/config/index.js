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
    unit: 'TFIL'
};
