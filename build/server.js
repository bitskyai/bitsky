"use strict";
/**
 * Created by Shaoke Xu on 4/29/18.
 */
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
        while (_) try {
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
require("reflect-metadata");
var typeorm = require("typeorm");
var enableDestroy = require("server-destroy");
var dbConnection = null;
var server = null;
var processExit = false;
function startServer(customConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, getConfig_1, overwriteConfig, logger_1, createApp, getDBConfiguration, dbConfig, app_1, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = require("./config"), getConfig_1 = _a.getConfig, overwriteConfig = _a.overwriteConfig;
                    if (customConfig) {
                        overwriteConfig(customConfig);
                    }
                    logger_1 = require("./util/logger");
                    createApp = require("./app");
                    require("./util/extendNativeJavaScript");
                    getDBConfiguration = require("./util/dbConfiguration").default;
                    logger_1.debug("startServer->config: ", getConfig_1());
                    dbConfig = getDBConfiguration();
                    logger_1.debug("dbConfig: %o ", dbConfig);
                    return [4 /*yield*/, typeorm.createConnection(dbConfig)];
                case 1:
                    dbConnection = _b.sent();
                    logger_1.debug("Create DB connection successfully.");
                    return [4 /*yield*/, createApp()];
                case 2:
                    app_1 = _b.sent();
                    if (server) {
                        server.destroy();
                    }
                    server = app_1.listen(getConfig_1("PORT"), function () {
                        console.log("BitSky server listening on http://localhost:" + getConfig_1("PORT") + "/ in " + app_1.get("env") + " mode");
                        logger_1.info("BitSky server listening on http://localhost:%d/ in %s mode", getConfig_1("PORT"), app_1.get("env"));
                    });
                    enableDestroy(server);
                    // Handle signals gracefully. Heroku will send SIGTERM before idle.
                    process.on("SIGTERM", function () {
                        logger_1.info("SIGTERM received");
                        logger_1.info("Closing http.Server ..");
                        // dbConnection.close();
                        processExit = true;
                        server.destroy();
                    });
                    process.on("SIGINT", function () {
                        logger_1.info("SIGINT(Ctrl-C) received");
                        logger_1.info("Closing http.Server ..");
                        // dbConnection.close();
                        processExit = true;
                        server.destroy();
                    });
                    server.on("close", function () {
                        logger_1.info("Engine Server closed");
                        // process.emit("cleanup");
                        logger_1.info("Giving 100ms time to cleanup..");
                        // Give a small time frame to clean up
                        if (processExit) {
                            setTimeout(process.exit, 100);
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.startServer = startServer;
function stopServer() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // close dabtabase connection
                dbConnection.close();
                // close server
                server.destroy();
            }
            catch (err) {
                throw err;
            }
            return [2 /*return*/];
        });
    });
}
exports.stopServer = stopServer;
function testDBConnection(dbConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    dbConfig.name = "testConnection";
                    return [4 /*yield*/, typeorm.createConnection(dbConfig)];
                case 1:
                    connection = _a.sent();
                    connection.close();
                    return [2 /*return*/, true];
                case 2:
                    err_2 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.testDBConnection = testDBConnection;
