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
var getConfig = require("../../config").getConfig;
var logger = require("../../util/logger");
var TASK_STATE = require("../../util/constants").TASK_STATE;
var HTTPError = require("../../util/error").HTTPError;
var TaskAndHistory_ctrl_1 = require("../../dbController/TaskAndHistory.ctrl");
var TasksJobQueue_ctrl_1 = require("../../dbController/TasksJobQueue.ctrl");
var Retailer_ctrl_1 = require("../../dbController/Retailer.ctrl");
var updateRetailerState = require("../retailers/helpers").updateRetailerState;
/**
 * Update all
 */
function updateTimeoutTasks(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var taskTimeout, startedAt, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    taskTimeout = getConfig("TIMEOUT_VALUE_FOR_TASK");
                    startedAt = Date.now() - taskTimeout;
                    logger.info("Update tasks if they are timeout", {
                        function: "updateTimeoutTasks",
                        taskTimeout: taskTimeout,
                        startedAt: startedAt,
                        securityKey: securityKey,
                    });
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.updateTasksStateForManagementDB(TASK_STATE.timeout, null, null, null, startedAt, securityKey, true)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    if (!(err_1 instanceof HTTPError)) {
                        // if it isn't HTTPError instance
                        err_1 = new HTTPError(500, err_1);
                    }
                    logger.error("Update tasks if they are timeout fail. Error: " + err_1.message, { error: err_1, function: "updateTimeoutTasks" });
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateTimeoutTasks = updateTimeoutTasks;
function checkRetailerServicesHealth(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var intervalCheckAS, lastPing, retailerServices, i, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    intervalCheckAS = getConfig("RETAILER_STATE_CHECK_TIME");
                    lastPing = Date.now() - intervalCheckAS;
                    return [4 /*yield*/, Retailer_ctrl_1.getNeedCheckHealthRetailersDB(lastPing, securityKey)];
                case 1:
                    retailerServices = _a.sent();
                    logger.info("Check Retailer Service Health", {
                        function: "checkRetailerServicesHealth",
                        intervalCheckAS: intervalCheckAS,
                        lastPing: lastPing,
                        retailerServices: retailerServices.length,
                    });
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < retailerServices.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateRetailerState(retailerServices[i].globalId, retailerServices[i], true)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_2 = _a.sent();
                    if (!(err_2 instanceof HTTPError)) {
                        // if it isn't HTTPError instance
                        err_2 = new HTTPError(500, err_2);
                    }
                    logger.error("Check Retailer Service Health fail. Error: " + err_2.message, {
                        error: err_2,
                        function: "checkRetailerServicesHealth",
                    });
                    throw err_2;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.checkRetailerServicesHealth = checkRetailerServicesHealth;
function removeTimeoutTaskJob() {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, TasksJobQueue_ctrl_1.removeTimeoutJob()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    if (!(err_3 instanceof HTTPError)) {
                        // if it isn't HTTPError instance
                        err_3 = new HTTPError(500, err_3);
                    }
                    logger.error("Remove timeout task fail. Error: " + err_3.message, {
                        error: err_3,
                        function: "removeTimeoutTaskJob",
                    });
                    throw err_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.removeTimeoutTaskJob = removeTimeoutTaskJob;
