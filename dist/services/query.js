'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var typedi_1 = require('typedi');
var config_1 = __importDefault(require('../config'));
var ethers_1 = require('ethers');
var QueryService = /** @class */ (function () {
  function QueryService() {
    var _this = this;
    this.solveQuery = function (command) {
      return __awaiter(_this, void 0, void 0, function () {
        var commandArgs;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              commandArgs = command.split('/');
              if (
                !(
                  this.validCommands[commandArgs[1]] &&
                  this.validCommands[commandArgs[1]].usage.split('/').length === commandArgs.length
                )
              )
                return [3 /*break*/, 2];
              return [4 /*yield*/, this.validCommands[commandArgs[1]].func(commandArgs)];
            case 1:
              return [2 /*return*/, _a.sent()];
            case 2:
              return [2 /*return*/, this.crDefault()];
          }
        });
      });
    };
    this.crDefault = function () {
      return { success: false, result: null, err: 'This is not a valid command 😕 !!!' };
    };
    this.crIntro = function () {
      return {
        success: true,
        result: 'Hi There !\n'.concat(
          config_1.default.bot,
          ' is at ur service \uD83E\uDDDE\u200D\u2642\uFE0F\nSend \t/list\tto get a list of all supported commands',
        ),
        err: null,
      };
    };
    this.crList = function (commandArgs) {
      var result = 'List of available commands are\n';
      Object.entries(_this.validCommands).map(function (_a) {
        var key = _a[0],
          value = _a[1];
        result += '\n'.concat(key, '\n\tDesc  :\t').concat(value.desc, '\n\tUsage :\t').concat(value.usage);
      });
      return { success: true, result: result, err: null };
    };
    this.crChainId = function (commandArgs) {
      return {
        success: true,
        result: 'ChainId of '.concat(config_1.default.network, ' Network:\t').concat(config_1.default.chainId),
        err: null,
      };
    };
    this.crLatestBlock = function (commandArgs) {
      return __awaiter(_this, void 0, void 0, function () {
        var provider, latestBlock, err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              provider = new ethers_1.ethers.providers.JsonRpcProvider(config_1.default.provider);
              return [4 /*yield*/, provider.getBlockNumber()];
            case 1:
              latestBlock = _a.sent();
              return [
                2 /*return*/,
                {
                  success: true,
                  result: 'Latest Block of '.concat(config_1.default.network, ' Network:\t').concat(latestBlock),
                  err: null,
                },
              ];
            case 2:
              err_1 = _a.sent();
              console.log(err_1);
              return [2 /*return*/, { success: false, result: null, err: 'Unable to get Latest Block 😖' }];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    };
    this.crBalance = function (commandArgs) {
      return __awaiter(_this, void 0, void 0, function () {
        var provider, balance, err_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              console.log(config_1.default.provider);
              provider = new ethers_1.ethers.providers.JsonRpcProvider(config_1.default.provider);
              return [4 /*yield*/, provider.getBalance(commandArgs[2])];
            case 1:
              balance = _a.sent();
              return [
                2 /*return*/,
                {
                  success: true,
                  result: 'Balance:\t'.concat(balance / 1e18, ' ').concat(config_1.default.unit),
                  err: null,
                },
              ];
            case 2:
              err_2 = _a.sent();
              console.log(err_2);
              return [2 /*return*/, { success: false, result: null, err: 'Unable to get Balance 😖' }];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    };
    this.crTxCount = function (commandArgs) {
      return __awaiter(_this, void 0, void 0, function () {
        var provider, txCount, err_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              provider = new ethers_1.ethers.providers.JsonRpcProvider(config_1.default.provider);
              return [4 /*yield*/, provider.getTransactionCount(commandArgs[2])];
            case 1:
              txCount = _a.sent();
              return [2 /*return*/, { success: true, result: 'Transaction Count:\t'.concat(txCount), err: null }];
            case 2:
              err_3 = _a.sent();
              console.log(err_3);
              return [2 /*return*/, { success: false, result: null, err: 'Unable to get Transaction Count 😖' }];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    };
    this.validCommands = {
      intro: {
        desc: 'Returns an introductory message',
        usage: '/intro',
        func: this.crIntro,
      },
      list: {
        desc: 'List all the available commands',
        usage: '/list',
        func: this.crList,
      },
      chainId: {
        desc: 'List the chainId of the current network',
        usage: '/chainId',
        func: this.crChainId,
      },
      latestBlock: {
        desc: 'List the latest block of current network',
        usage: '/latestBlock',
        func: this.crLatestBlock,
      },
      balance: {
        desc: 'List balance of an Account',
        usage: '/balance/<EVM_COMPATIBLE_ADDRESS>',
        func: this.crBalance,
      },
      txCount: {
        desc: 'List transaction count of an Account',
        usage: '/txCount/<EVM_COMPATIBLE_ADDRESS>',
        func: this.crTxCount,
      },
    };
  }
  QueryService = __decorate([(0, typedi_1.Service)()], QueryService);
  return QueryService;
})();
exports.default = QueryService;
