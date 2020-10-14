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
var _ = require("lodash");
var HTTPError = require("../../util/error").HTTPError;
var logger = require("../../util/logger");
var TaskAndHistory_ctrl_1 = require("../../dbController/TaskAndHistory.ctrl");
var addTasks = require("../tasks/helpers").addTasks;
var helpers_1 = require("../retailers/helpers");
//================================================================
// Following APIs are designed for CRUD tasks
function getTasksHistoryForManagement(cursor, url, state, limit, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.getTasksOrHistoryForManagementDB(cursor, url, state, limit, securityKey, true)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * ids priority high then url, if you pass both then only ids will be executed
 * @param {string} url - url for filter
 * @param {array} ids - Tasks Global Id
 * @param {string} securityKey - security key string
 */
function deleteTasksHistoryForManagement(url, state, ids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.deleteTasksOrHistoryForManagementDB(url, state, ids, securityKey, true)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_2 = _a.sent();
                    throw err_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * ids priority high then url, if you pass both then only ids will be executed
 * @param {string} url - url for filter
 * @param {array} ids - Tasks Global Id
 * @param {string} securityKey - security key string
 */
function rerunTasksForManagement(url, state, ids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, retailersState, tasks, i, retailerId, retailer, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    logger.info("url: " + url + ", state: " + state + ", ids: " + ids, {
                        function: "rerunTasksForManagement",
                    });
                    console.log("url: " + url + ", state: " + state + ", ids: " + ids);
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.getTasksOrHistoryForManagementDB(null, url, state, 1000000, securityKey, true, ids)];
                case 1:
                    result = _a.sent();
                    logger.debug("Total Tasks: " + result.total, {
                        function: "rerunTasksForManagement",
                    });
                    retailersState = {};
                    tasks = result.tasks;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < tasks.length)) return [3 /*break*/, 6];
                    retailerId = tasks[i].retailer.globalId;
                    if (!!retailersState[retailerId]) return [3 /*break*/, 4];
                    return [4 /*yield*/, helpers_1.getRetailer(retailerId, securityKey)];
                case 3:
                    retailer = _a.sent();
                    retailersState[retailerId] = retailer.system.state;
                    _a.label = 4;
                case 4:
                    tasks[i].retailer.state = retailersState[retailerId];
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6: return [4 /*yield*/, addTasks(tasks, securityKey)];
                case 7:
                    _a.sent();
                    return [2 /*return*/, {
                            total: result.total,
                        }];
                case 8:
                    err_3 = _a.sent();
                    throw err_3;
                case 9: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    deleteTasksHistoryForManagement: deleteTasksHistoryForManagement,
    getTasksHistoryForManagement: getTasksHistoryForManagement,
    rerunTasksForManagement: rerunTasksForManagement,
};
