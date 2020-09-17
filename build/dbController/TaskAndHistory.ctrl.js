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
var typeorm_1 = require("typeorm");
var ObjectId = require("mongodb").ObjectID;
var Task_1 = require("../entity/Task");
var TaskHistory_1 = require("../entity/TaskHistory");
var logger = require("../util/logger");
var HTTPError = require("../util/error").HTTPError;
var utils = require("../util/utils");
var getConfig = require("../config").getConfig;
var retailerHelpers = require("../apis/retailers/helpers");
var _a = require("../util/constants"), TASK_STATE = _a.TASK_STATE, RETAILER_STATE = _a.RETAILER_STATE, PERMISSIONS = _a.PERMISSIONS, DEFAULT_RETAILER = _a.DEFAULT_RETAILER;
var dbConfiguration_1 = require("../util/dbConfiguration");
var Producer_ctrl_1 = require("./Producer.ctrl");
function flattenToObject(tasks) {
    function toObject(task) {
        var obj = {};
        if (_.get(task, "global_id")) {
            obj.globalId = task.global_id;
        }
        if (_.get(task, "type")) {
            obj.type = task.type;
        }
        if (_.get(task, "name")) {
            obj.name = task.name;
        }
        if (_.get(task, "description")) {
            obj.description = task.description;
        }
        if (_.get(task, "retailer_global_id")) {
            !obj.retailer ? (obj.retailer = {}) : "";
            obj.retailer.globalId = task.retailer_global_id;
        }
        if (_.get(task, "retailer_state")) {
            !obj.retailer ? (obj.retailer = {}) : "";
            obj.retailer.state = task.retailer_state;
        }
        if (_.get(task, "permission")) {
            obj.permission = task.permission;
        }
        if (_.get(task, "priority")) {
            obj.priority = task.priority;
        }
        if (_.get(task, "permission")) {
            obj.permission = task.permission;
        }
        if (_.get(task, "suitable_producers")) {
            obj.suitableProducers = task.suitable_producers;
        }
        if (_.get(task, "url")) {
            obj.url = task.url;
        }
        if (_.get(task, "metadata")) {
            obj.metadata = task.metadata;
        }
        if (_.get(task, "metadata")) {
            obj.dataset = task.dataset;
        }
        if (_.get(task, "system_state")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.state = task.system_state;
        }
        if (_.get(task, "system_security_key")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.securityKey = task.system_security_key;
        }
        if (_.get(task, "system_created_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.created = task.system_created_at;
        }
        if (_.get(task, "system_modified_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.modified = task.system_modified_at;
        }
        if (_.get(task, "system_started_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.startedAt = task.system_started_at;
        }
        if (_.get(task, "system_ended_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.endedAt = task.system_ended_at;
        }
        if (_.get(task, "system_version")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.version = task.system_version;
        }
        if (_.get(task, "system_failures_number")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.failuresNumber = task.system_failures_number;
        }
        if (_.get(task, "system_failures_reason")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.failuresReason = task.system_failures_reason;
        }
        if (_.get(task, "system_producer_global_id")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.producer ? (obj.system.producer = {}) : "";
            obj.system.producer.globalId = task.system_producer_global_id;
        }
        if (_.get(task, "system_producer_type")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.producer ? (obj.system.producer = {}) : "";
            obj.system.producer.type = task.system_producer_type;
        }
        if (_.get(task, "system_producer_retry_times")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.producer ? (obj.system.producer = {}) : "";
            obj.system.producer.retryTimes = task.system_producer_retry_times;
        }
        if (_.get(task, "system_producer_started_at")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.producer ? (obj.system.producer = {}) : "";
            obj.system.producer.startedAt = task.system_producer_started_at;
        }
        if (_.get(task, "system_producer_ended_at")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.producer ? (obj.system.producer = {}) : "";
            obj.system.producer.endedAt = task.system_producer_ended_at;
        }
        return obj;
    }
    if (_.isArray(tasks)) {
        var arr = [];
        for (var i = 0; i < tasks.length; i++) {
            arr.push(toObject(tasks[i]));
        }
        return arr;
    }
    else {
        return toObject(tasks);
    }
}
exports.flattenToObject = flattenToObject;
function objectsToTasks(tasks, taskInstances) {
    function objectToTasks(task, taskInstance) {
        if (!taskInstance) {
            taskInstance = new Task_1.default();
        }
        if (_.get(task, "globalId")) {
            taskInstance.global_id = task.globalId;
        }
        if (_.get(task, "type")) {
            taskInstance.type = task.type;
        }
        if (_.get(task, "name")) {
            taskInstance.name = task.name;
        }
        if (_.get(task, "desciption")) {
            taskInstance.desciption = task.desciption;
        }
        if (_.get(task, "retailer.globalId")) {
            taskInstance.retailer_global_id = task.retailer.globalId;
        }
        if (_.get(task, "retailer.state")) {
            taskInstance.retailer_state = task.retailer.state;
        }
        if (_.get(task, "permission")) {
            taskInstance.permission = task.permission;
        }
        if (_.get(task, "priority")) {
            taskInstance.priority = task.priority;
        }
        if (_.get(task, "suitableProducers")) {
            taskInstance.suitable_producers = task.suitableProducers;
        }
        if (_.get(task, "url")) {
            taskInstance.url = task.url;
        }
        if (_.get(task, "metadata")) {
            taskInstance.metadata = task.metadata;
        }
        if (_.get(task, "dataset")) {
            taskInstance.dataset = task.dataset;
        }
        if (_.get(task, "system.state")) {
            taskInstance.system_state = task.system.state;
        }
        if (_.get(task, "system.securityKey")) {
            taskInstance.system_security_key =
                task.system.securityKey;
        }
        if (_.get(task, "system.created")) {
            taskInstance.system_created_at = task.system.created;
        }
        if (_.get(task, "system.modified")) {
            taskInstance.system_modified_at = task.system.modified;
        }
        if (_.get(task, "system.startedAt")) {
            taskInstance.system_started_at = task.system.startedAt;
        }
        if (_.get(task, "system.endedAt")) {
            taskInstance.system_ended_at = task.system.endedAt;
        }
        if (_.get(task, "system.producer.globalId")) {
            taskInstance.system_producer_global_id =
                task.system.producer.globalId;
        }
        if (_.get(task, "system.producer.type")) {
            taskInstance.system_producer_type = task.system.producer.type;
        }
        if (_.get(task, "system.producer.retryTimes")) {
            taskInstance.system_producer_retry_times =
                task.system.producer.retryTimes;
        }
        if (_.get(task, "system.producer.startedAt")) {
            taskInstance.system_producer_started_at =
                task.system.producer.startedAt;
        }
        if (_.get(task, "system.producer.endedAt")) {
            taskInstance.system_producer_ended_at =
                task.system.producer.endedAt;
        }
        if (_.get(task, "system.version")) {
            taskInstance.system_version = task.system.version;
        }
        if (_.get(task, "system.failuresNumber")) {
            taskInstance.system_failures_number =
                task.system.failuresNumber;
        }
        if (_.get(task, "system.failuresReason")) {
            taskInstance.system_failures_reason =
                task.system.failuresReason;
        }
        return taskInstance;
    }
    if (_.isArray(tasks)) {
        var arr = [];
        for (var i = 0; i < tasks.length; i++) {
            arr.push(objectToTasks(tasks[i], taskInstances && taskInstances[i]));
        }
        return arr;
    }
    else {
        return objectToTasks(tasks, taskInstances);
    }
}
exports.objectsToTasks = objectsToTasks;
function addTasksDB(tasks) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, taskInstances, generatedMaps, insertData, result, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    repo = typeorm_1.getRepository(Task_1.default);
                    taskInstances = objectsToTasks(tasks, null);
                    generatedMaps = [];
                    _a.label = 1;
                case 1:
                    if (!taskInstances.length) return [3 /*break*/, 3];
                    insertData = taskInstances.splice(0, 5);
                    return [4 /*yield*/, repo.insert(insertData)];
                case 2:
                    result = _a.sent();
                    generatedMaps.push(result.generatedMaps);
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, generatedMaps];
                case 4:
                    err_1 = _a.sent();
                    error = new HTTPError(500, err_1, {}, "00005000001", "TaskAndHistory.ctrl->addTasksDB");
                    logger.error("addTasksDB fail " + error.message, {
                        error: error,
                        parameters: {
                            tasks: tasks,
                        },
                    });
                    throw error;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addTasksDB = addTasksDB;
function getTasksOrHistoryForManagementDB(cursor, url, state, limit, securityKey, history, ids) {
    return __awaiter(this, void 0, void 0, function () {
        var modified, id, tasks, total, repoName, parseCursor, query, repo, nQuery, taskQuery, andWhere, funName, funName, states, funName, parseCursor, funName, lastItem, nextCursor, err_2, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    modified = void 0, id = void 0, tasks = void 0, total = void 0;
                    if (limit) {
                        limit = limit * 1;
                    }
                    repoName = Task_1.default;
                    if (history) {
                        repoName = TaskHistory_1.default;
                    }
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 4];
                    if (cursor) {
                        parseCursor = utils.atob(cursor);
                        parseCursor = /^(.*):_:_:_(.*)$/.exec(parseCursor);
                        modified = parseCursor[1];
                        id = parseCursor[2];
                    }
                    query = {};
                    if (securityKey) {
                        query["system_security_key"] = securityKey;
                    }
                    if (url) {
                        query.url = {
                            $regex: utils.convertStringToRegExp(url),
                        };
                    }
                    if (state) {
                        query["system_state"] = {
                            $in: state.split(","),
                        };
                    }
                    if (ids && ids.length) {
                        query.global_id = {
                            $in: ids,
                        };
                    }
                    return [4 /*yield*/, typeorm_1.getMongoRepository(repoName)];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.count(query)];
                case 2:
                    total = _a.sent();
                    nQuery = {
                        where: query,
                    };
                    if (modified && id) {
                        nQuery.where.$or = [
                            {
                                system_modified_at: {
                                    $lt: modified * 1,
                                },
                            },
                            // If the "sytem.modified" is an exact match, we need a tiebreaker, so we use the _id field from the cursor.
                            {
                                system_modified_at: modified * 1,
                                _id: {
                                    $lt: ObjectId(id),
                                },
                            },
                        ];
                    }
                    if (limit) {
                        nQuery.take = limit;
                    }
                    nQuery.order = {
                        system_modified_at: "DESC",
                        _id: "DESC",
                    };
                    return [4 /*yield*/, repo.find(nQuery)];
                case 3:
                    tasks = _a.sent();
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, typeorm_1.getRepository(repoName).createQueryBuilder("task")];
                case 5:
                    taskQuery = _a.sent();
                    andWhere = false;
                    if (securityKey) {
                        funName = void 0;
                        if (andWhere) {
                            funName = "andWhere";
                        }
                        else {
                            funName = "where";
                            andWhere = true;
                        }
                        taskQuery[funName]("task.system_security_key = :securityKey", { securityKey: securityKey });
                    }
                    if (url) {
                        funName = void 0;
                        if (andWhere) {
                            funName = "andWhere";
                        }
                        else {
                            funName = "where";
                            andWhere = true;
                        }
                        taskQuery[funName]("task.url LIKE :url", {
                            url: "%" + url + "%",
                        });
                    }
                    if (state) {
                        states = state.split(",");
                        funName = void 0;
                        if (andWhere) {
                            funName = "andWhere";
                        }
                        else {
                            funName = "where";
                            andWhere = true;
                        }
                        taskQuery[funName]("task.system_state IN (:...states)", {
                            states: states,
                        });
                    }
                    if (ids && ids.length) {
                        taskQuery.where("task.global_id IN (:...ids)", {
                            ids: ids,
                        });
                    }
                    return [4 /*yield*/, taskQuery.getCount()];
                case 6:
                    total = _a.sent();
                    if (cursor) {
                        parseCursor = utils.atob(cursor);
                        parseCursor = /^(.*):_:_:_(.*)$/.exec(parseCursor);
                        console.log("parseCursor: ", parseCursor);
                        console.log("modified: ", parseCursor[1]);
                        console.log("id: ", parseCursor[2]);
                        modified = parseCursor[1];
                        id = parseCursor[2];
                    }
                    if (limit) {
                        limit = limit * 1;
                        taskQuery.limit(limit);
                    }
                    taskQuery.orderBy({ system_modified_at: "DESC", id: "DESC" });
                    if (modified && id) {
                        modified = modified * 1;
                        funName = void 0;
                        if (andWhere) {
                            funName = "andWhere";
                        }
                        else {
                            funName = "where";
                            andWhere = true;
                        }
                        taskQuery[funName]("task.system_modified_at < :modified OR (task.system_modified_at = :modified AND task.id < :id)", { modified: modified, id: id });
                    }
                    return [4 /*yield*/, taskQuery.getMany()];
                case 7:
                    tasks = _a.sent();
                    _a.label = 8;
                case 8:
                    lastItem = tasks[tasks.length - 1];
                    nextCursor = null;
                    if (lastItem && tasks.length >= limit) {
                        nextCursor = utils.btoa(lastItem.system_modified_at + ":_:_:_" + lastItem.id);
                    }
                    if (nextCursor === cursor) {
                        nextCursor = null;
                    }
                    return [2 /*return*/, {
                            previousCursor: cursor,
                            nextCursor: nextCursor,
                            tasks: flattenToObject(tasks),
                            total: total,
                        }];
                case 9:
                    err_2 = _a.sent();
                    error = new HTTPError(500, err_2, {}, "00005000001", "TaskAndHistory.ctrl->getTasksForManagementDB");
                    logger.error("getTasksForManagementDB fail " + error.message, {
                        error: error,
                        parameters: {
                            cursor: cursor,
                            url: url,
                            state: state,
                            limit: limit,
                            securityKey: securityKey,
                            history: history,
                            ids: ids,
                        },
                    });
                    throw error;
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.getTasksOrHistoryForManagementDB = getTasksOrHistoryForManagementDB;
// Update all matched tasks' retailer state
function updateTasksRetailerStateForManagementDB(retailerGID, state, dontUpdateModified) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, retailerState, updateData, taskQuery, err_3, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    state = _.toUpper(state);
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Task_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {};
                    query.retailer_global_id = {
                        $eq: retailerGID,
                    };
                    retailerState = {
                        $set: {
                            retailer_state: state,
                        },
                    };
                    if (!dontUpdateModified) {
                        retailerState.$set.system_modified_at = Date.now();
                    }
                    return [4 /*yield*/, repo.updateMany(query, retailerState)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    updateData = {
                        retailer_state: state,
                    };
                    if (!dontUpdateModified) {
                        updateData.system_modified_at = Date.now();
                    }
                    return [4 /*yield*/, typeorm_1.getRepository(Task_1.default)
                            .createQueryBuilder("task")
                            .update(Task_1.default)
                            .set(updateData)
                            .where("task.retailer_global_id = :id", {
                            id: retailerGID,
                        })];
                case 4:
                    taskQuery = _a.sent();
                    return [4 /*yield*/, taskQuery.execute()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_3 = _a.sent();
                    error = new HTTPError(500, err_3, {}, "00005000001", "TaskAndHistory.ctrl->updateTasksRetailerStateForManagementDB");
                    logger.error("updateTasksRetailerStateForManagementDB, error:" + error.message, { error: error });
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.updateTasksRetailerStateForManagementDB = updateTasksRetailerStateForManagementDB;
function updateTasksStateForManagementDB(state, url, selectedState, ids, timeoutStartedAt, securityKey, dontUpdateModified) {
    return __awaiter(this, void 0, void 0, function () {
        var states, repo, query, mongoDBUdpateData, taskQuery, sqlUpdateData, err_4, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    state = _.toUpper(state);
                    states = [TASK_STATE.draft, state];
                    if (state === TASK_STATE.configured ||
                        state === TASK_STATE.paused) {
                        states.push(TASK_STATE.running);
                    }
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Task_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {};
                    mongoDBUdpateData = {
                        $set: {
                            system_state: state,
                        },
                    };
                    if (!dontUpdateModified) {
                        // if `dontUpdateModified` is true, then don't udpate modified, otherwise, update modified
                        // The reason of `dontUpdateModified` is when interval check task status or retailer services status, if update `system_modified_at` will cause pagination doesn't work
                        mongoDBUdpateData.$set.system_modified_at = Date.now();
                    }
                    query.system_state = {
                        $nin: states,
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    if (ids && ids.length) {
                        query.global_id = {
                            $in: ids,
                        };
                    }
                    if (selectedState) {
                        query["system_state"] = {
                            $in: selectedState.split(","),
                        };
                    }
                    if (url) {
                        query.url = {
                            $regex: utils.convertStringToRegExp(url),
                        };
                    }
                    // any value less than `startedAt`, it will set to timeout, whatever what state you pass
                    if (timeoutStartedAt) {
                        // Only timeout currently is in  `RUNNING` state, other state don't need timeout
                        query.system_state.$in = [TASK_STATE.running];
                        query.system_started_at = {
                            $lt: timeoutStartedAt,
                        };
                        mongoDBUdpateData.$set.system_producer_ended_at = Date.now();
                        mongoDBUdpateData.$set.system_ended_at = Date.now();
                        mongoDBUdpateData.$set.system_state = TASK_STATE.timeout;
                        mongoDBUdpateData.$set.system_failures_reason =
                            "Producer collect task timeout. Supplier automatically set to TIMEOUT status";
                        // Since this is set by system, so don't auto increase fail number
                        // Actually, it isn't easy to auto increase `system_failures_number` ^_^
                    }
                    return [4 /*yield*/, repo.updateMany(query, mongoDBUdpateData)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    taskQuery = typeorm_1.getRepository(Task_1.default)
                        .createQueryBuilder("task")
                        .update(Task_1.default);
                    sqlUpdateData = {
                        system_state: state,
                    };
                    if (!dontUpdateModified) {
                        // if `dontUpdateModified` is true, then don't udpate modified, otherwise, update modified
                        // The reason of `dontUpdateModified` is when interval check task status or retailer services status, if update `system_modified_at` will cause pagination doesn't work
                        sqlUpdateData.system_modified_at = function () { return Date.now().toString(); };
                    }
                    taskQuery.where("task.system_state NOT IN (:...states)", {
                        states: states,
                    });
                    if (securityKey) {
                        taskQuery.andWhere("task.system_security_key = :securityKey", { securityKey: securityKey });
                    }
                    if (ids && ids.length) {
                        taskQuery.andWhere("task.global_id IN (:...ids)", {
                            ids: ids,
                        });
                    }
                    if (url) {
                        taskQuery.andWhere("task.url LIKE :url", {
                            url: "%" + url + "%",
                        });
                    }
                    if (selectedState) {
                        taskQuery.andWhere("task.system_state IN (:...selectedState)", {
                            selectedState: selectedState.split(","),
                        });
                    }
                    if (timeoutStartedAt) {
                        taskQuery.andWhere("task.system_started_at < :timeoutStartedAt", { timeoutStartedAt: timeoutStartedAt });
                        taskQuery.andWhere("task.system_state IN (:...requiredStates)", {
                            requiredStates: [TASK_STATE.running],
                        });
                        sqlUpdateData.system_producer_ended_at = Date.now();
                        sqlUpdateData.system_ended_at = Date.now();
                        sqlUpdateData.system_state = TASK_STATE.timeout;
                        sqlUpdateData.system_failures_reason =
                            "Producer collect task timeout. Supplier automatically set to TIMEOUT status";
                    }
                    taskQuery.set(sqlUpdateData);
                    return [4 /*yield*/, taskQuery.execute()];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_4 = _a.sent();
                    error = new HTTPError(500, err_4, {}, "00005000001", "TaskAndHistory.ctrl->updateTasksStateForManagementDB");
                    logger.error("updateTasksStateForManagementDB, error: " + error.message, { error: error });
                    throw error;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.updateTasksStateForManagementDB = updateTasksStateForManagementDB;
function deleteTasksOrHistoryForManagementDB(url, selectedState, ids, securityKey, history) {
    return __awaiter(this, void 0, void 0, function () {
        var repoName, repo, query, taskQuery, andWhere, funName, funName, funName, funName, err_5, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    repoName = Task_1.default;
                    if (history) {
                        repoName = TaskHistory_1.default;
                    }
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(repoName)];
                case 1:
                    repo = _a.sent();
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    if (selectedState) {
                        query["system_state"] = {
                            $in: selectedState.split(","),
                        };
                    }
                    if (ids && ids.length) {
                        query.global_id = {
                            $in: ids,
                        };
                    }
                    if (url) {
                        query.url = {
                            $regex: utils.convertStringToRegExp(url),
                        };
                    }
                    return [4 /*yield*/, repo.deleteMany(query)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    // SQL
                    console.log("repoName: ", repoName);
                    return [4 /*yield*/, typeorm_1.getRepository(repoName)
                            .createQueryBuilder()
                            .delete()
                            .from(repoName)];
                case 4:
                    taskQuery = _a.sent();
                    andWhere = false;
                    if (securityKey) {
                        funName = void 0;
                        if (andWhere) {
                            funName = "andWhere";
                        }
                        else {
                            funName = "where";
                            andWhere = true;
                        }
                        taskQuery[funName]("system_security_key = :securityKey", {
                            securityKey: securityKey,
                        });
                    }
                    if (ids && ids.length) {
                        funName = void 0;
                        if (andWhere) {
                            funName = "andWhere";
                        }
                        else {
                            funName = "where";
                            andWhere = true;
                        }
                        taskQuery[funName]("global_id IN (:...ids)", {
                            ids: ids,
                        });
                    }
                    if (url) {
                        funName = void 0;
                        if (andWhere) {
                            funName = "andWhere";
                        }
                        else {
                            funName = "where";
                            andWhere = true;
                        }
                        taskQuery[funName]("url LIKE :url", {
                            url: "%" + url + "%",
                        });
                    }
                    if (selectedState) {
                        funName = void 0;
                        if (andWhere) {
                            funName = "andWhere";
                        }
                        else {
                            funName = "where";
                            andWhere = true;
                        }
                        taskQuery[funName]("task.system_state IN (:...states)", {
                            states: selectedState.split(","),
                        });
                    }
                    return [4 /*yield*/, taskQuery.execute()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_5 = _a.sent();
                    error = new HTTPError(500, err_5, {}, "00005000001", "TaskAndHistory.ctrl->deleteTasksForManagementDB");
                    logger.error("deleteTasksForManagementDB, error:" + error.message, {
                        error: error,
                    });
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.deleteTasksOrHistoryForManagementDB = deleteTasksOrHistoryForManagementDB;
function deleteTasksByRetailerForManagementDB(retailerGID, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, taskQuery, err_6, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Task_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    query.retailer_global_id = {
                        $in: [retailerGID],
                    };
                    return [4 /*yield*/, repo.deleteMany(query)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, typeorm_1.getRepository(Task_1.default)
                        .createQueryBuilder("task")
                        .delete()
                        .from(Task_1.default)
                        .where("task.retailer_global_id = :id", {
                        id: retailerGID,
                    })];
                case 4:
                    taskQuery = _a.sent();
                    if (securityKey) {
                        taskQuery.andWhere("task.system_security_key = :securityKey", { securityKey: securityKey });
                    }
                    return [4 /*yield*/, taskQuery.execute()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_6 = _a.sent();
                    error = new HTTPError(500, err_6, {}, "00005000001", "TaskAndHistory.ctrl->deleteTasksByRetailerForManagementDB");
                    logger.error("deleteTasksByRetailerForManagementDB, error:" + error.message, { error: error });
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.deleteTasksByRetailerForManagementDB = deleteTasksByRetailerForManagementDB;
function getTasksForProducerDB(producerConfig, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, concurrent, permission, repo, query, taskQuery, taskQueryNoSecurityKey, gids, retailers, i, item, retailer, updateData, query, err_7, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 28, , 29]);
                    tasks = [];
                    concurrent = Number(producerConfig.concurrent);
                    if (isNaN(concurrent)) {
                        // if concurrent isn't a number, then use default value
                        concurrent = getConfig("EACH_TIME_TASKS_NUMBER");
                    }
                    permission = PERMISSIONS.private;
                    if (!producerConfig.private) {
                        permission = PERMISSIONS.public;
                    }
                    repo = void 0;
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 8];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Task_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {
                        where: {},
                    };
                    query.where.system_state = {
                        $nin: [
                            TASK_STATE.draft,
                            TASK_STATE.running,
                            TASK_STATE.finished,
                            TASK_STATE.paused,
                        ],
                    };
                    query.where.retailer_state = {
                        $eq: RETAILER_STATE.active,
                    };
                    query.where.suitable_producers = {
                        $elemMatch: {
                            $eq: _.toUpper(producerConfig.type),
                        },
                    };
                    query.take = concurrent;
                    query.order = {
                        retailer_global_id: "DESC",
                        priority: "ASC",
                    };
                    if (!securityKey) return [3 /*break*/, 5];
                    query.where.system_security_key = securityKey;
                    return [4 /*yield*/, repo.find(query)];
                case 2:
                    tasks = _a.sent();
                    if (!((!permission || _.upperCase(permission) === PERMISSIONS.public) &&
                        (!tasks || !tasks.length))) return [3 /*break*/, 4];
                    // if no tasks for this securityKey and if this producer's permission is public then, get other tasks that is public
                    delete query.where.system_security_key;
                    query.where.permission = {
                        $nin: [PERMISSIONS.private],
                    };
                    return [4 /*yield*/, repo.find(query)];
                case 3:
                    tasks = _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, repo.find(query)];
                case 6:
                    // if securityKey is empty, this means it is on-primse mode, if a request was sent by UI Server, it always contains a securityKey, only if this request is directly sent to
                    // BitSky-Supplier, then it possible don't have securityKey, in this mode, then it should be able to get all permissions tasks since they are belong to same user
                    tasks = _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 16];
                case 8: return [4 /*yield*/, typeorm_1.getRepository(Task_1.default).createQueryBuilder("task")];
                case 9:
                    taskQuery = _a.sent();
                    return [4 /*yield*/, typeorm_1.getRepository(Task_1.default).createQueryBuilder("task")];
                case 10:
                    taskQueryNoSecurityKey = _a.sent();
                    taskQuery.where("task.system_state NOT IN (:...states)", {
                        states: [
                            TASK_STATE.draft,
                            TASK_STATE.running,
                            TASK_STATE.finished,
                            TASK_STATE.paused,
                        ],
                    });
                    taskQuery.andWhere("task.retailer_state = :state", {
                        state: RETAILER_STATE.active,
                    });
                    taskQuery.andWhere("task.suitable_producers LIKE :producerType", { producerType: "%" + _.toUpper(producerConfig.type) + "%" });
                    taskQuery.orderBy({
                        retailer_global_id: "DESC",
                        priority: "ASC",
                    });
                    taskQuery.limit(concurrent);
                    taskQueryNoSecurityKey.where("task.system_state NOT IN (:...states)", {
                        states: [
                            TASK_STATE.draft,
                            TASK_STATE.running,
                            TASK_STATE.finished,
                            TASK_STATE.paused,
                        ],
                    });
                    taskQueryNoSecurityKey.andWhere("task.retailer_state = :state", {
                        state: RETAILER_STATE.active,
                    });
                    taskQueryNoSecurityKey.andWhere("task.suitable_producers LIKE :producerType", { producerType: "%" + _.toUpper(producerConfig.type) + "%" });
                    taskQueryNoSecurityKey.orderBy({
                        retailer_global_id: "DESC",
                        priority: "ASC",
                    });
                    taskQueryNoSecurityKey.limit(concurrent);
                    if (!securityKey) return [3 /*break*/, 14];
                    taskQuery.andWhere("task.system_security_key = :securityKey", { securityKey: securityKey });
                    return [4 /*yield*/, taskQuery.getMany()];
                case 11:
                    tasks = _a.sent();
                    if (!((!permission || _.upperCase(permission) === PERMISSIONS.public) &&
                        (!tasks || !tasks.length))) return [3 /*break*/, 13];
                    // if no tasks for this securityKey and if this producer's permission is public then, get other tasks that is public
                    taskQueryNoSecurityKey.andWhere("task.permission NOT IN (:...permissions)", {
                        permissions: [PERMISSIONS.private],
                    });
                    return [4 /*yield*/, taskQueryNoSecurityKey.getMany()];
                case 12:
                    tasks = _a.sent();
                    _a.label = 13;
                case 13: return [3 /*break*/, 16];
                case 14: return [4 /*yield*/, taskQuery.getMany()];
                case 15:
                    // if securityKey is empty, this means it is on-primse mode, if a request was sent by UI Server, it always contains a securityKey, only if this request is directly sent to
                    // BitSky-Supplier, then it possible don't have securityKey, in this mode, then it should be able to get all permissions tasks since they are belong to same user
                    tasks = _a.sent();
                    _a.label = 16;
                case 16:
                    tasks = flattenToObject(tasks);
                    gids = [];
                    retailers = {};
                    i = 0;
                    _a.label = 17;
                case 17:
                    if (!(i < tasks.length)) return [3 /*break*/, 22];
                    item = tasks[i] || {};
                    gids.push(item.globalId);
                    if (!retailers[item.retailer.globalId]) return [3 /*break*/, 18];
                    item.retailer = retailers[item.retailer.globalId];
                    return [3 /*break*/, 20];
                case 18: return [4 /*yield*/, retailerHelpers.getRetailer(item.retailer.globalId)];
                case 19:
                    retailer = _a.sent();
                    retailer = _.merge({}, DEFAULT_RETAILER, retailer);
                    // remove unnecessary data
                    retailer = utils.omit(retailer, ["_id", "securityKey", "created", "modified"], ["system"]);
                    retailers[item.retailer.globalId] = retailer;
                    item.retailer = retailers[item.retailer.globalId];
                    _a.label = 20;
                case 20:
                    // Comment: 07/30/2019
                    // Reason: Since this task is reassigned, so it always need to update producer information
                    // if (!item.producer) {
                    //   item.producer = {
                    //     globalId: producerGid,
                    //     type: _.toUpper(producerConfig.type),
                    //     started_at: Date.now()
                    //   };
                    // }
                    item.system.producer = {
                        globalId: producerConfig.globalId,
                        type: _.toUpper(producerConfig.type),
                    };
                    _a.label = 21;
                case 21:
                    i++;
                    return [3 /*break*/, 17];
                case 22:
                    updateData = {
                        system_started_at: Date.now(),
                        system_ended_at: Date.now(),
                        system_modified_at: Date.now(),
                        system_state: TASK_STATE.running,
                        system_producer_global_id: producerConfig.globalId,
                        system_producer_type: _.toUpper(producerConfig.type),
                    };
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 24];
                    // Update tasks that return to producer
                    return [4 /*yield*/, repo.updateMany({
                            global_id: {
                                $in: gids,
                            },
                        }, {
                            $set: updateData,
                        })];
                case 23:
                    // Update tasks that return to producer
                    _a.sent();
                    return [3 /*break*/, 27];
                case 24: return [4 /*yield*/, typeorm_1.getRepository(Task_1.default)
                        .createQueryBuilder("task")
                        .update(Task_1.default)
                        .set(updateData)];
                case 25:
                    query = _a.sent();
                    query.where("task.global_id IN (:...gids)", {
                        gids: gids,
                    });
                    return [4 /*yield*/, query.execute()];
                case 26:
                    _a.sent();
                    _a.label = 27;
                case 27:
                    // Update Producer Last Ping
                    // Don't need to wait producer update finish
                    Producer_ctrl_1.updateProducerDB(producerConfig.globalId, securityKey, {
                        system: {
                            modified: Date.now(),
                            lastPing: Date.now(),
                        },
                    });
                    // TODO: 2019/11/10 need to rethink about this logic, since tasks already send back to producers
                    //        if we check for now, it is meaningless, better way is let producer to tell. For example, if collect
                    //        tasks fail, then check Retailer or direct know retailer is inactive
                    // Check Retailer status in parallel
                    // // After get tasks that need to collect, during sametime to check whether this Retailer is active.
                    // for (let gid in retailers) {
                    //   let retailer = retailers[gid];
                    //   // if this retailer isn't in check status progress, then check it
                    //   if (!__check_retailers_status__[gid]) {
                    //     (async () => {
                    //       // change retailer status to true to avoid duplicate check in same time
                    //       __check_retailers_status__[gid] = true;
                    //       await retailersHelpers.updateRetailerState(gid, retailer);
                    //       // after finish, delete its value in hashmap
                    //       delete __check_retailers_status__[gid];
                    //     })();
                    //   }
                    // }
                    return [2 /*return*/, tasks];
                case 28:
                    err_7 = _a.sent();
                    error = new HTTPError(500, err_7, {}, "00005000001", "TaskAndHistory.ctrl->getTasksForProducerDB");
                    logger.error("getTasksForProducerDB, error:" + error.message, {
                        error: error,
                    });
                    throw error;
                case 29: return [2 /*return*/];
            }
        });
    });
}
exports.getTasksForProducerDB = getTasksForProducerDB;
/**
 * Get tasks by globalIds
 * @param gids - tasks globalId
 * @param securityKey - security key
 */
function getTasksDB(gids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, tasks, taskQuery, tasks, err_8, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    if (!gids) {
                        return [2 /*return*/, []];
                    }
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    query = {
                        where: {},
                    };
                    if (securityKey) {
                        query.where["system_security_key"] = securityKey;
                    }
                    query.where.global_id = {
                        $in: gids,
                    };
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Task_1.default)];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.find(query)];
                case 2:
                    tasks = _a.sent();
                    tasks = flattenToObject(tasks);
                    return [2 /*return*/, tasks];
                case 3: return [4 /*yield*/, typeorm_1.getRepository(Task_1.default).createQueryBuilder("task")];
                case 4:
                    taskQuery = _a.sent();
                    taskQuery.where("task.global_id IN (:...gids)", { gids: gids });
                    if (securityKey) {
                        taskQuery.andWhere("task.system_security_key = :securityKey", { securityKey: securityKey });
                    }
                    return [4 /*yield*/, taskQuery.getMany()];
                case 5:
                    tasks = _a.sent();
                    tasks = flattenToObject(tasks);
                    return [2 /*return*/, tasks];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_8 = _a.sent();
                    error = new HTTPError(500, err_8, {}, "00005000001", "TaskAndHistory.ctrl->getTasksDB");
                    logger.error("getTasksDB, error:" + error.message, { error: error });
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getTasksDB = getTasksDB;
function deleteTasksDB(gids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, err_9, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 2];
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    query.global_id = {
                        $in: gids,
                    };
                    repo = typeorm_1.getMongoRepository(Task_1.default);
                    return [4 /*yield*/, repo.deleteMany(query)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, typeorm_1.getRepository(Task_1.default)
                        .createQueryBuilder("task")
                        .delete()
                        .where("task.global_id IN (:...gids)", { gids: gids })
                        .execute()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_9 = _a.sent();
                    error = new HTTPError(500, err_9, {}, "00005000001", "TaskAndHistory.ctrl->deleteTasksDB");
                    logger.error("deleteTasksDB, error:" + error.message, { error: error });
                    throw error;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.deleteTasksDB = deleteTasksDB;
/**
 * Update tasks one by one
 * Used for the updating information for each tasks is different
 * @param tasks{object[]}
 */
function updateEachTasksDB(tasks) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, i, task, err_10, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    repo = void 0;
                    if (dbConfiguration_1.isMongo()) {
                        repo = typeorm_1.getMongoRepository(Task_1.default);
                    }
                    else {
                        repo = typeorm_1.getRepository(Task_1.default);
                    }
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < tasks.length)) return [3 /*break*/, 6];
                    task = tasks[i];
                    task = objectsToTasks(task, {});
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    logger.debug("updateEachTasksDB->isMongo", {
                        i: i,
                        global_id: task.global_id,
                    });
                    return [4 /*yield*/, repo.updateOne({
                            global_id: task.global_id,
                        }, {
                            $set: task,
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    logger.debug("updateEachTasksDB->sqlite", {
                        i: i,
                        global_id: task.global_id,
                    });
                    return [4 /*yield*/, repo
                            .createQueryBuilder("task")
                            .update(Task_1.default)
                            .set(task)
                            .where("task.global_id = :gloalId", {
                            gloalId: task.global_id,
                        })
                            .execute()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_10 = _a.sent();
                    error = new HTTPError(500, err_10, {}, "00005000001", "TaskAndHistory.ctrl->updateEachTasksDB");
                    logger.error("updateEachTasksDB fail " + error.message, {
                        error: error,
                    });
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.updateEachTasksDB = updateEachTasksDB;
function addTaskHistoryDB(tasks) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, taskInstances, generatedMaps, insertData, result, err_11, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    repo = typeorm_1.getRepository(TaskHistory_1.default);
                    taskInstances = objectsToTasks(tasks, null);
                    generatedMaps = [];
                    _a.label = 1;
                case 1:
                    if (!taskInstances.length) return [3 /*break*/, 3];
                    insertData = taskInstances.splice(0, 10);
                    return [4 /*yield*/, repo.insert(insertData)];
                case 2:
                    result = _a.sent();
                    generatedMaps.push(result.generatedMaps);
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, generatedMaps];
                case 4:
                    err_11 = _a.sent();
                    error = new HTTPError(500, err_11, {}, "00005000001", "TaskHistory.ctrl->addTaskHistoryDB");
                    logger.error("addTaskHistoryDB, error:" + error.message, { error: error });
                    throw error;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addTaskHistoryDB = addTaskHistoryDB;
