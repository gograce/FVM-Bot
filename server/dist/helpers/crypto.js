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
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptConversation = void 0;
var CryptoJS = __importStar(require("crypto-js"));
var openpgp = __importStar(require("openpgp"));
var PushAPI = __importStar(require("@pushprotocol/restapi"));
var aesDecrypt = function (_a) {
    var cipherText = _a.cipherText, secretKey = _a.secretKey;
    var bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
var decryptMessage = function (_a) {
    var encryptedMessage = _a.encryptedMessage, encryptionType = _a.encryptionType, encryptedSecret = _a.encryptedSecret, pgpPrivateKey = _a.pgpPrivateKey, signature = _a.signature, signatureValidationPubliKey = _a.signatureValidationPubliKey;
    return __awaiter(void 0, void 0, void 0, function () {
        var plainText;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    plainText = '';
                    if (!(encryptionType !== 'PlainText' && encryptionType !== null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, decryptAndVerifySignature({
                            cipherText: encryptedMessage,
                            encryptedSecretKey: encryptedSecret,
                            privateKeyArmored: pgpPrivateKey,
                            publicKeyArmored: signatureValidationPubliKey,
                            signatureArmored: signature,
                        })];
                case 1:
                    plainText = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    plainText = encryptedMessage;
                    _b.label = 3;
                case 3: return [2 /*return*/, plainText];
            }
        });
    });
};
var decryptAndVerifySignature = function (_a) {
    var cipherText = _a.cipherText, encryptedSecretKey = _a.encryptedSecretKey, privateKeyArmored = _a.privateKeyArmored;
    return __awaiter(void 0, void 0, void 0, function () {
        var secretKey;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, pgpDecrypt({
                        cipherText: encryptedSecretKey,
                        toPrivateKeyArmored: privateKeyArmored,
                    })];
                case 1:
                    secretKey = _b.sent();
                    // await verifySignature({ messageContent: cipherText, signatureArmored, publicKeyArmored })
                    return [2 /*return*/, aesDecrypt({ cipherText: cipherText, secretKey: secretKey })];
            }
        });
    });
};
var pgpDecrypt = function (_a) {
    var cipherText = _a.cipherText, toPrivateKeyArmored = _a.toPrivateKeyArmored;
    return __awaiter(void 0, void 0, void 0, function () {
        var message, privateKey, decrypted;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, openpgp.readMessage({ armoredMessage: cipherText })];
                case 1:
                    message = _b.sent();
                    return [4 /*yield*/, openpgp.readPrivateKey({
                            armoredKey: toPrivateKeyArmored,
                        })];
                case 2:
                    privateKey = _b.sent();
                    return [4 /*yield*/, openpgp.decrypt({
                            message: message,
                            decryptionKeys: privateKey,
                        })];
                case 3:
                    decrypted = (_b.sent()).data;
                    return [2 /*return*/, decrypted];
            }
        });
    });
};
var decryptConversation = function (_a) {
    var messages = _a.messages, connectedUser = _a.connectedUser, pgpPrivateKey = _a.pgpPrivateKey, env = _a.env;
    return __awaiter(void 0, void 0, void 0, function () {
        var otherPeer, signatureValidationPubliKey, gotOtherPeer, _i, messages_1, message, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    gotOtherPeer = false;
                    _i = 0, messages_1 = messages;
                    _c.label = 1;
                case 1:
                    if (!(_i < messages_1.length)) return [3 /*break*/, 8];
                    message = messages_1[_i];
                    if (!(message.encType !== 'PlainText')) return [3 /*break*/, 7];
                    if (!pgpPrivateKey) {
                        throw Error('Decrypted private key is necessary');
                    }
                    if (!(message.fromCAIP10 !== connectedUser.wallets.split(',')[0])) return [3 /*break*/, 4];
                    if (!!gotOtherPeer) return [3 /*break*/, 3];
                    return [4 /*yield*/, PushAPI.user.get({
                            account: message.fromCAIP10,
                            env: env,
                        })];
                case 2:
                    otherPeer = _c.sent();
                    gotOtherPeer = true;
                    _c.label = 3;
                case 3:
                    signatureValidationPubliKey = otherPeer.publicKey;
                    return [3 /*break*/, 5];
                case 4:
                    signatureValidationPubliKey = connectedUser.publicKey;
                    _c.label = 5;
                case 5:
                    _b = message;
                    return [4 /*yield*/, decryptMessage({
                            encryptedMessage: message.messageContent,
                            encryptedSecret: message.encryptedSecret,
                            encryptionType: message.encType,
                            signature: message.signature,
                            signatureValidationPubliKey: signatureValidationPubliKey,
                            pgpPrivateKey: pgpPrivateKey,
                        })];
                case 6:
                    _b.messageContent = _c.sent();
                    _c.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/, messages];
            }
        });
    });
};
exports.decryptConversation = decryptConversation;
