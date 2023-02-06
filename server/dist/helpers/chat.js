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
exports.fetchResAndSend = exports.approveAndSendIntroMsg = exports.sendMsg = exports.getRequestsAddrArray = exports.getPgpKey = void 0;
var mmSDK = __importStar(require("@metamask/eth-sig-util"));
var PushAPI = __importStar(require("@pushprotocol/restapi"));
var config_1 = __importDefault(require("../config"));
var logger_1 = __importDefault(require("../loaders/logger"));
var typedi_1 = require("typedi");
var query_1 = __importDefault(require("../services/query"));
/**
 *
 * @returns bot's pgp private key
 */
var getPgpKey = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, decryptedPvtKey, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, PushAPI.user.get({
                        account: config_1.default.botAddr,
                        env: 'prod',
                    })];
            case 1:
                user = _a.sent();
                decryptedPvtKey = mmSDK.decrypt({
                    encryptedData: JSON.parse(user.encryptedPrivateKey),
                    privateKey: config_1.default.botAccPvtKey,
                });
                return [2 /*return*/, decryptedPvtKey];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPgpKey = getPgpKey;
/**
 *
 * @param requests
 * @returns requests array of raw addresses
 */
var getRequestsAddrArray = function (requests) {
    try {
        var simplifiedReq = requests.map(function (obj) { return obj.fromDID; });
        return simplifiedReq;
    }
    catch (err) {
        logger_1.default.error(err);
    }
};
exports.getRequestsAddrArray = getRequestsAddrArray;
var sendMsg = function (msg, receiver, pvtKey) {
    try {
        PushAPI.chat.send({
            messageContent: msg,
            receiverAddress: receiver,
            account: config_1.default.botAddr,
            pgpPrivateKey: pvtKey,
            apiKey: process.env.PUSH_CHAT_API_KEY,
            env: 'prod',
        });
    }
    catch (err) {
        logger_1.default.error(err);
    }
};
exports.sendMsg = sendMsg;
var approveAndSendIntroMsg = function (chatMsg, pvtKey) { return __awaiter(void 0, void 0, void 0, function () {
    var queryInstance, res, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                queryInstance = typedi_1.Container.get(query_1.default);
                return [4 /*yield*/, queryInstance.solveQuery('/intro')];
            case 1:
                res = _a.sent();
                PushAPI.chat.approve({
                    account: config_1.default.botAddr,
                    senderAddress: chatMsg.fromDID,
                });
                (0, exports.sendMsg)(res.result, chatMsg.fromDID, pvtKey);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                logger_1.default.error(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.approveAndSendIntroMsg = approveAndSendIntroMsg;
var fetchResAndSend = function (chatMsg, msgContent, pvtKey) { return __awaiter(void 0, void 0, void 0, function () {
    var queryInstance, resultFromServer, messageContent, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                queryInstance = typedi_1.Container.get(query_1.default);
                return [4 /*yield*/, queryInstance.solveQuery(msgContent)];
            case 1:
                resultFromServer = _a.sent();
                messageContent = '';
                if (resultFromServer.success) {
                    messageContent = resultFromServer.result;
                }
                else {
                    messageContent = resultFromServer.err;
                }
                (0, exports.sendMsg)(messageContent, chatMsg.fromDID, pvtKey);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                logger_1.default.error(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.fetchResAndSend = fetchResAndSend;
