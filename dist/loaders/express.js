'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var body_parser_1 = __importDefault(require('body-parser'));
var celebrate_1 = require('celebrate');
var cors_1 = __importDefault(require('cors'));
var helmet_1 = __importDefault(require('helmet'));
var config_1 = __importDefault(require('../config'));
var api_1 = __importDefault(require('../api'));
exports.default = function (app) {
  app.enable('trust proxy');
  app.use((0, cors_1.default)());
  app.use((0, helmet_1.default)());
  app.use(body_parser_1.default.json());
  app.use((0, celebrate_1.errors)());
  app.get('/status', function (req, res) {
    res.status(200).end();
  });
  app.use(config_1.default.api.prefix, (0, api_1.default)());
  /// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  /// error handlers
  app.use(function (err, req, res, next) {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
