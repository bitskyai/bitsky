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
var _a = require("../../util/constants"), CONFIG = _a.CONFIG, DEFAULT_RETAILER = _a.DEFAULT_RETAILER, TASK_STATE = _a.TASK_STATE, PERMISSIONS = _a.PERMISSIONS, PRODUCER_STATE = _a.PRODUCER_STATE, RETAILER_STATE = _a.RETAILER_STATE, DEFAULT_TASK = _a.DEFAULT_TASK;
var retailersHelpers = require("../retailers/helpers");
var producersHelpers = require("../producers/helpers");
var logger = require("../../util/logger");
var utils = require("../../util/utils");
var getConfig = require("../../config").getConfig;
var TaskAndHistory_ctrl_1 = require("../../dbController/TaskAndHistory.ctrl");
var TasksJobQueue_ctrl_1 = require("../../dbController/TasksJobQueue.ctrl");
// To avoid running check retailer status multiple times
// next check will not be started if previous job doesn't finish
// TODO: when start thinking about load balance, then this data should be in memory cache, not inside service memory
//================================================================
// Following APIs are designed for CRUD tasks for Management UI(Desktop or web app)
function getTasksForManagement(cursor, url, state, limit, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.getTasksOrHistoryForManagementDB(cursor, url, state, limit, securityKey)];
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
function pauseTasksForManagement(url, state, ids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.updateTasksStateForManagementDB(TASK_STATE.paused, url, state, ids, null, securityKey)];
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
function resumeTasksForManagement(url, state, ids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.updateTasksStateForManagementDB(TASK_STATE.configured, url, state, ids, null, securityKey)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_3 = _a.sent();
                    throw err_3;
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
function deleteTasksForManagement(url, state, ids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.deleteTasksOrHistoryForManagementDB(url, state, ids, securityKey)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_4 = _a.sent();
                    throw err_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
//================================================================
// Following APIs are designed for Producer CRUD Tasks
/**
 * Create tasks
 *
 * @param {array} tasks
 * @param {string} securityKey
 */
function addTasks(tasks, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultTask_1, validationError_1, retailerGlobalIds_1, _a, _b, _i, retailerGlobalId, result, err_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    defaultTask_1 = DEFAULT_TASK;
                    validationError_1 = [];
                    retailerGlobalIds_1 = {};
                    tasks = tasks.map(function (task) {
                        // remove data that cannot set by user
                        delete task.dataset;
                        delete task.system;
                        // let err = [];
                        /*
                        if (!task.globalId) {
                          // comment 07/25/2019 - instead of error, generate an globalid
                          // err.push({
                          //   key: "globalId",
                          //   description: "globalId is undefined."
                          // });
                          task.globalId = utils.generateGlobalId("task");
                          // To avoid same task insert multiple time
                          task._id = task.globalId;
                        }
                        */
                        task.globalId = utils.generateGlobalId("task");
                        task = _.merge({}, defaultTask_1, task);
                        // Update system information
                        task.system.created = Date.now();
                        task.system.modified = Date.now();
                        task.system.securityKey = securityKey;
                        task.system.state = PRODUCER_STATE.configured;
                        // Make sure producer type is uppercase
                        task.suitableProducers = task.suitableProducers.map(function (producerType) {
                            return _.toUpper(producerType);
                        });
                        // since just recieve Retailer request, so set the state to **ACTIVE**
                        if (!task.retailer.state) {
                            task.retailer.state = RETAILER_STATE.active;
                        }
                        var validateResult = utils.validateTask(task);
                        // If it isn't valid
                        if (!validateResult.valid) {
                            validationError_1.push({
                                task: task,
                                error: validateResult.errors,
                            });
                        }
                        // remove unchangable field for create
                        delete task.system.producer;
                        delete task.system.startedAt;
                        delete task.system.endedAt;
                        delete task.system.failuresNumber;
                        // Need to update globalId to globalId
                        retailerGlobalIds_1[task.retailer.globalId] = 1;
                        return task;
                    });
                    if (validationError_1.length) {
                        throw new HTTPError(400, validationError_1, validationError_1, "00064000001");
                    }
                    _a = [];
                    for (_b in retailerGlobalIds_1)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    retailerGlobalId = _a[_i];
                    return [4 /*yield*/, retailersHelpers.getRetailer(retailerGlobalId)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    logger.debug("Retailers exist!", { retailerGlobalIds: retailerGlobalIds_1 });
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.addTasksDB(tasks)];
                case 5:
                    result = _c.sent();
                    return [2 /*return*/, result];
                case 6:
                    err_5 = _c.sent();
                    throw err_5;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function waitUntilTopTask(globalId) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            try {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var startTime, taskJobTimeout, waitHandler;
                        var _this = this;
                        return __generator(this, function (_a) {
                            startTime = Date.now();
                            taskJobTimeout = getConfig("TASK_JOB_TIMEOUT");
                            waitHandler = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                                var job;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, TasksJobQueue_ctrl_1.getTopTaskJob()];
                                        case 1:
                                            job = _a.sent();
                                            if (!job || !job.global_id) {
                                                // this means all jobs are timeout, but this producer is still waiting
                                                // normally this happend the intervalAgendas removeTimeoutTaskJob
                                                logger.info("No job in the queue, this happened because intervalAgendas removeTimeoutTaskJob", { function: "waitUntilTopTask" });
                                                clearInterval(waitHandler);
                                                reject(false);
                                                return [2 /*return*/];
                                            }
                                            logger.debug("Top GlobalId in job queue:" + job.global_id + ", globalId: " + globalId, { function: "waitUntilTopTask" });
                                            if (job.global_id == globalId) {
                                                logger.debug(globalId + " is top job now", {
                                                    function: "waitUntilTopTask",
                                                });
                                                clearInterval(waitHandler);
                                                resolve(true);
                                            }
                                            else if (Date.now() - startTime > taskJobTimeout) {
                                                logger.error(globalId + " is timeout", {
                                                    function: "waitUntilTopTask",
                                                });
                                                clearInterval(waitHandler);
                                                reject(false);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 100);
                            return [2 /*return*/];
                        });
                    }); })];
            }
            catch (err) {
                throw err;
            }
            return [2 /*return*/];
        });
    });
}
/**
 * @typedef {Object} TasksAndConfig
 * @property {object} producer - Producer Configuration
 * @property {array} tasks - Tasks Array
 */
/**
 * Get tasks by Producer Global ID and Security Key
 *
 * Operation Index - 0005
 *
 * @param {string} producerGid - Producer Global ID
 * @param {string} securityKey - Security Key
 *
 * @returns {TasksAndConfig}
 */
function getTasks(producerGid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var taskJobGlobalId, producerConfig, producerSecurityKey, tasks, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskJobGlobalId = utils.generateGlobalId("taskjob");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 9]);
                    // add a task job to the job queue
                    return [4 /*yield*/, TasksJobQueue_ctrl_1.addATaskJob(taskJobGlobalId, producerGid)];
                case 2:
                    // add a task job to the job queue
                    _a.sent();
                    return [4 /*yield*/, waitUntilTopTask(taskJobGlobalId)];
                case 3:
                    _a.sent();
                    // TODO: need to improve tasks schedule
                    // 1. Think about if a lot of tasks, how to schedule them
                    // make them can be more efficient
                    // 2. Think about the case that Retailer is inactive
                    // avoid UI side send undefined or null as string
                    if (securityKey === "undefined" || securityKey === "null") {
                        securityKey = undefined;
                    }
                    logger.debug("getTasks->producerGid: " + producerGid);
                    logger.debug("getTasks->securityKey: " + securityKey);
                    return [4 /*yield*/, producersHelpers.getProducer(producerGid, securityKey)];
                case 4:
                    producerConfig = _a.sent();
                    logger.debug("getTasks->producerConfig.system.securityKey: " + producerConfig.system.securityKey);
                    producerSecurityKey = producerConfig.system.securityKey;
                    // avoid UI side send undefined or null as string
                    if (producerSecurityKey === "undefined" || producerSecurityKey === "null") {
                        producerSecurityKey = undefined;
                    }
                    // If security key doesn't match, then we assume this agnet doesn't belong to this user
                    // For security issue, don't allow user do this
                    if (_.trim(producerSecurityKey) !== _.trim(securityKey)) {
                        logger.info("getTasks, producerConfig.system.securityKey isn' same with securityKey. ", {
                            "producerConfig.system.securityKey": producerSecurityKey,
                            securityKey: securityKey,
                        });
                        throw new HTTPError(400, null, { producerGlobalId: producerGid, securityKey: securityKey }, "00054000001", producerGid, securityKey);
                    }
                    tasks = [];
                    producerConfig = utils.omit(producerConfig, ["_id", "securityKey"], ["system"]);
                    // if producer isn't active, then throw an error
                    if (_.toUpper(producerConfig.system.state) !== _.toUpper(PRODUCER_STATE.active)) {
                        throw new HTTPError(400, null, {
                            producer: producerConfig,
                        }, "00054000002", producerGid);
                    }
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.getTasksForProducerDB(producerConfig, securityKey)];
                case 5:
                    tasks = _a.sent();
                    return [4 /*yield*/, TasksJobQueue_ctrl_1.removeTaskJob(taskJobGlobalId)];
                case 6:
                    _a.sent();
                    return [2 /*return*/, tasks];
                case 7:
                    err_6 = _a.sent();
                    return [4 /*yield*/, TasksJobQueue_ctrl_1.removeTaskJob(taskJobGlobalId)];
                case 8:
                    _a.sent();
                    throw err_6;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function updateTasks(content, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var contentMap_1, gids, tasks, failedTasks, taskHistory, i, item, task, passedProducer, i, result, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    contentMap_1 = {};
                    gids = content.map(function (item) {
                        contentMap_1[item.globalId] = item;
                        return item.globalId;
                    });
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.getTasksDB(gids, securityKey)];
                case 1:
                    tasks = _a.sent();
                    if (!tasks || !tasks.length) {
                        logger.warn("No tasks found.", { tasks: content });
                        return [2 /*return*/, {}];
                    }
                    failedTasks = [];
                    taskHistory = [];
                    gids = [];
                    for (i = 0; i < tasks.length; i++) {
                        item = tasks[i];
                        task = contentMap_1[item.globalId];
                        // If this task was failed, then increase **failuresNumber**
                        // Any state isn't FINISHED, then think it is failed, need to increase failuresNumber
                        // if failuresNumber is <= max fail number, then let Producer try to collect it again
                        if ((item.system.failuresNumber || 0) <
                            CONFIG.MAX_FAIL_NUMBER_FOR_TASK &&
                            _.get(task, "system.state") !== TASK_STATE.finished) {
                            if (!item.system.failuresNumber) {
                                item.system.failuresNumber = 1;
                            }
                            else {
                                item.system.failuresNumber += 1;
                            }
                            // This task need continue to retry
                            failedTasks.push({
                                globalId: item.globalId,
                                system: {
                                    modified: Date.now(),
                                    endedAt: Date.now(),
                                    state: _.get(task, "system.state") || TASK_STATE.failed,
                                    failuresNumber: _.get(item, "system.failuresNumber"),
                                    failuresReason: _.get(task, "system.failuresReason"),
                                    producer: {
                                        globalId: _.get(task, "system.producer.globalId"),
                                        type: _.get(task, "system.producer.type"),
                                        startedAt: _.get(task, "system.producer.startedAt"),
                                        endedAt: _.get(task, "system.producer.endedAt"),
                                    },
                                },
                            });
                        }
                        else {
                            // This tasks need to move to task_history
                            gids.push(item.globalId);
                            delete item.id;
                            delete item._id;
                            // if it isn't successful, then means reach max retry time, to keep why it isn't successful
                            if (_.get(task, "system.state") !== TASK_STATE.finished) {
                                item.system.failuresNumber += 1;
                                item.system.failuresReason = _.get(task, "system.failuresReason");
                            }
                            item.system.modified = Date.now();
                            item.system.endedAt = Date.now();
                            item.system.state = _.get(task, "system.state", TASK_STATE.finished);
                            if (!item.system.producer) {
                                item.system.producer = {};
                            }
                            passedProducer = contentMap_1[item.globalId].system.producer;
                            item.system.producer.globalId = passedProducer.globalId;
                            item.system.producer.type = passedProducer.type;
                            item.system.producer.startedAt = passedProducer.startedAt;
                            item.system.producer.endedAt = passedProducer.endedAt;
                            taskHistory.push(item);
                        }
                    }
                    if (!failedTasks.length) return [3 /*break*/, 3];
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.updateEachTasksDB(failedTasks)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    // add it to tasks_history
                    for (i = 0; i < taskHistory.length; i++) {
                        // remove `failuresReason` if task is successful
                        if (_.get(taskHistory[i], "system.state") ==
                            TASK_STATE.finished) {
                            if (_.get(taskHistory[i], "system.failuresReason")) {
                                _.set(taskHistory[i], "system.failuresReason", "");
                            }
                        }
                    }
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.addTaskHistoryDB(taskHistory)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.deleteTasksDB(gids, securityKey)];
                case 5:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 6:
                    err_7 = _a.sent();
                    throw err_7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    pauseTasksForManagement: pauseTasksForManagement,
    resumeTasksForManagement: resumeTasksForManagement,
    deleteTasksForManagement: deleteTasksForManagement,
    getTasksForManagement: getTasksForManagement,
    addTasks: addTasks,
    getTasks: getTasks,
    updateTasks: updateTasks,
};
