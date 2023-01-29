"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_1 = __importDefault(require("./routes"));
exports.default = (function () {
    var app = (0, express_1.Router)();
    (0, routes_1.default)(app);
    return app;
});
