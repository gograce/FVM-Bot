"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var PushAPI = __importStar(require("@pushprotocol/restapi"));
var chat_1 = require("../helpers/chat");
var config_1 = __importDefault(require("../config"));
var crypto_1 = require("../helpers/crypto");
var botAddr = config_1.default.botAddr;
var pvtKey = '', chatUser = {};
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var socket_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(pvtKey === '')) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, chat_1.getPgpKey)()];
            case 1:
                pvtKey = _a.sent();
                return [4 /*yield*/, PushAPI.user.get({
                        account: botAddr,
                        env: 'prod',
                    })];
            case 2:
                chatUser = _a.sent();
                _a.label = 3;
            case 3:
                socket_1 = (0, socket_io_client_1.io)('https://backend.epns.io', {
                    query: {
                        did: "eip155:".concat(botAddr),
                        mode: 'chat',
                    },
                    autoConnect: true,
                    transports: ['websocket', 'polling'],
                    reconnectionAttempts: 5,
                });
                socket_1.on('connect', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log(socket_1.connected); // true
                        return [2 /*return*/];
                    });
                }); });
                socket_1.on('CHATS', function (chat) { return __awaiter(void 0, void 0, void 0, function () {
                    var responseReqs, reqsArray, response, err_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 10, , 11]);
                                console.log(chat);
                                console.log(pvtKey);
                                if (!(pvtKey === '')) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, chat_1.getPgpKey)()];
                            case 1:
                                pvtKey = _a.sent();
                                _a.label = 2;
                            case 2:
                                if (!(Object.keys(chatUser).length == 0)) return [3 /*break*/, 4];
                                return [4 /*yield*/, PushAPI.user.get({
                                        account: botAddr,
                                        env: 'prod',
                                    })];
                            case 3:
                                chatUser = _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, PushAPI.chat.requests({
                                    pgpPrivateKey: pvtKey,
                                    account: botAddr,
                                    env: 'prod',
                                })];
                            case 5:
                                responseReqs = _a.sent();
                                console.log(responseReqs);
                                reqsArray = (0, chat_1.getRequestsAddrArray)(responseReqs);
                                console.log(reqsArray);
                                if (!(reqsArray.length > 0 && reqsArray.includes(chat.fromDID))) return [3 /*break*/, 7];
                                return [4 /*yield*/, (0, chat_1.approveAndSendIntroMsg)(chat, pvtKey)];
                            case 6:
                                _a.sent();
                                return [3 /*break*/, 9];
                            case 7: return [4 /*yield*/, (0, crypto_1.decryptConversation)({
                                    messages: [chat],
                                    connectedUser: chatUser,
                                    pgpPrivateKey: pvtKey,
                                    env: 'prod',
                                })];
                            case 8:
                                response = _a.sent();
                                console.log(response);
                                (0, chat_1.fetchResAndSend)(chat, response[0].messageContent, pvtKey);
                                console.log('sent!!!');
                                _a.label = 9;
                            case 9: return [3 /*break*/, 11];
                            case 10:
                                err_2 = _a.sent();
                                console.log(err_2);
                                return [3 /*break*/, 11];
                            case 11: return [2 /*return*/];
                        }
                    });
                }); });
                socket_1.on('disconnect', function (reason) {
                    console.log(reason);
                    // if (reason === "io server disconnect") {
                    setTimeout(function () {
                        socket_1.connect();
                    }, 1000);
                    // }
                });
                socket_1.on('connect_error', function () {
                    console.log('connect_error');
                    socket_1.io.opts.transports = ['polling', 'websocket'];
                    setTimeout(function () {
                        socket_1.connect();
                    }, 1000);
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
