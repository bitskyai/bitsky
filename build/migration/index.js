"use strict";
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
var packageJSON = require("../../package.json");
var logger = require("../util/logger");
var migration1 = require("./migration1");
var ServerInformation_ctrl_1 = require("../dbController/ServerInformation.ctrl");
// TODO: Use memory cache, like **memcached**. Cache system info in memory, since currently we only have master node, so it should be ok in memory.
// instance of ServerInformation
var _server_info = undefined;
// whether has a migration job is running, don't duplicate run migration
var _migration_running = false;
/*
    **Migration Design:**
    Only allow migration from one version to next version, don't allow one migration move several versions.
    For example, Server version is 1.1.0, Migration Version is 4, and currently database server version is 0.9.10, Migration Version is 2,
    so it need first migrate to 3, then migrate to 4. Migration Version don't have 1 o 1 relative with Serve Version, not every server update
    need to do data migration
 */
function migration() {
    return __awaiter(this, void 0, void 0, function () {
        var nextMigrationVersion, _a, info, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    if (_migration_running) {
                        logger.info("Already has a migration job running, please waiting previous job finish! if it take too long, then you can try to restart server");
                        return [2 /*return*/];
                    }
                    logger.info("Working on ...");
                    nextMigrationVersion = _server_info.migration_version + 1;
                    _a = nextMigrationVersion;
                    switch (_a) {
                        case 1: return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 5];
                case 1:
                    // a migration job is running
                    _migration_running = true;
                    logger.info("============================================================");
                    logger.info("[[Start migrate to migrationVersion " + nextMigrationVersion);
                    // TODO: add your migrate task
                    return [4 /*yield*/, migration1.migrateTask()];
                case 2:
                    // TODO: add your migrate task
                    _b.sent();
                    logger.info("[[[Start update Server Information");
                    return [4 /*yield*/, ServerInformation_ctrl_1.getServerInfo()];
                case 3:
                    info = _b.sent();
                    info.migration_version = 1;
                    _server_info = info;
                    return [4 /*yield*/, ServerInformation_ctrl_1.updateServerInfo(info.global_id, { migration_version: 1 })];
                case 4:
                    _b.sent();
                    logger.info("End update Server Information]]]");
                    logger.info("End migrate to migrationVersion " + nextMigrationVersion + "]]");
                    logger.info("============================================================");
                    // migration job finished
                    _migration_running = false;
                    return [3 /*break*/, 6];
                case 5: return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _b.sent();
                    throw err_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
// check whether need to do migration
function checkMigration(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    logger.debug("[checkMigration] Starting, _server_info: %o", _server_info);
                    if (!!_server_info) return [3 /*break*/, 4];
                    // Get all server inform
                    // if doesn't exist, then init server information
                    logger.debug('[checkMigration], start getServerInfo');
                    return [4 /*yield*/, ServerInformation_ctrl_1.getServerInfo()];
                case 1:
                    _server_info = _a.sent();
                    logger.debug('[checkMigration] _server_info: %o', _server_info);
                    if (!(!_server_info || !_server_info.global_id)) return [3 /*break*/, 3];
                    logger.debug("[checkMigration] *_server_info* doesn't exist in DB, init a serverInfo and insert to DB.");
                    return [4 /*yield*/, ServerInformation_ctrl_1.addServerInfo(packageJSON.name, packageJSON.description, packageJSON.version, 0)];
                case 2:
                    _server_info = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    logger.debug("[checkMigration] Get *_server_info* from DB.", {
                        serverInfo: _server_info
                    });
                    _a.label = 4;
                case 4:
                    // if migrationVersion in DB is small then running server's migrationVersion
                    // then need to do data migration
                    if (_server_info.migration_version < packageJSON.migrationVersion) {
                        // migration can working in the background
                        migration();
                        // let user know currently server is during maintenance time
                        if (res) {
                            res
                                .status(503)
                                .send("<p>Server is on maintenance. please try it later</p>")
                                .end();
                        }
                        else {
                            logger.info("checkMigration was triggered when server start");
                        }
                    }
                    else {
                        // don't need to do anything, running server is good with database
                        if (next) {
                            next();
                        }
                        else {
                            logger.info("checkMigration was triggered when server start");
                        }
                    }
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _a.sent();
                    if (next) {
                        next(err_2);
                    }
                    else {
                        logger.error("checkMigration was triggered when server start, and has error: ", err_2);
                    }
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
module.exports = checkMigration;
