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
var Intelligence_1 = require("../entity/Intelligence");
var IntelligenceHistory_1 = require("../entity/IntelligenceHistory");
var logger = require("../util/logger");
var HTTPError = require("../util/error").HTTPError;
var utils = require("../util/utils");
var getConfig = require("../config").getConfig;
var soiHelpers = require("../apis/sois/helpers");
var _a = require("../util/constants"), INTELLIGENCE_STATE = _a.INTELLIGENCE_STATE, SOI_STATE = _a.SOI_STATE, PERMISSIONS = _a.PERMISSIONS, DEFAULT_SOI = _a.DEFAULT_SOI;
var dbConfiguration_1 = require("../util/dbConfiguration");
var Agent_ctrl_1 = require("./Agent.ctrl");
function flattenToObject(intelligences) {
    function toObject(intelligence) {
        var obj = {};
        if (_.get(intelligence, "global_id")) {
            obj.globalId = intelligence.global_id;
        }
        if (_.get(intelligence, "type")) {
            obj.type = intelligence.type;
        }
        if (_.get(intelligence, "name")) {
            obj.name = intelligence.name;
        }
        if (_.get(intelligence, "description")) {
            obj.description = intelligence.description;
        }
        if (_.get(intelligence, "soi_global_id")) {
            !obj.soi ? (obj.soi = {}) : "";
            obj.soi.globalId = intelligence.soi_global_id;
        }
        if (_.get(intelligence, "soi_state")) {
            !obj.soi ? (obj.soi = {}) : "";
            obj.soi.state = intelligence.soi_state;
        }
        if (_.get(intelligence, "permission")) {
            obj.permission = intelligence.permission;
        }
        if (_.get(intelligence, "priority")) {
            obj.priority = intelligence.priority;
        }
        if (_.get(intelligence, "permission")) {
            obj.permission = intelligence.permission;
        }
        if (_.get(intelligence, "suitable_agents")) {
            obj.suitableAgents = intelligence.suitable_agents;
        }
        if (_.get(intelligence, "url")) {
            obj.url = intelligence.url;
        }
        if (_.get(intelligence, "metadata")) {
            obj.metadata = intelligence.metadata;
        }
        if (_.get(intelligence, "metadata")) {
            obj.dataset = intelligence.dataset;
        }
        if (_.get(intelligence, "system_state")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.state = intelligence.system_state;
        }
        if (_.get(intelligence, "system_security_key")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.securityKey = intelligence.system_security_key;
        }
        if (_.get(intelligence, "system_created_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.created = intelligence.system_created_at;
        }
        if (_.get(intelligence, "system_modified_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.modified = intelligence.system_modified_at;
        }
        if (_.get(intelligence, "system_started_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.startedAt = intelligence.system_started_at;
        }
        if (_.get(intelligence, "system_ended_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.endedAt = intelligence.system_ended_at;
        }
        if (_.get(intelligence, "system_version")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.version = intelligence.system_version;
        }
        if (_.get(intelligence, "system_failures_number")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.failuresNumber = intelligence.system_failures_number;
        }
        if (_.get(intelligence, "system_failures_reason")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.failuresReason = intelligence.system_failures_reason;
        }
        if (_.get(intelligence, "system_agent_global_id")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.agent ? (obj.system.agent = {}) : "";
            obj.system.agent.globalId = intelligence.system_agent_global_id;
        }
        if (_.get(intelligence, "system_agent_type")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.agent ? (obj.system.agent = {}) : "";
            obj.system.agent.type = intelligence.system_agent_type;
        }
        if (_.get(intelligence, "system_agent_retry_times")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.agent ? (obj.system.agent = {}) : "";
            obj.system.agent.retryTimes = intelligence.system_agent_retry_times;
        }
        if (_.get(intelligence, "system_agent_started_at")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.agent ? (obj.system.agent = {}) : "";
            obj.system.agent.startedAt = intelligence.system_agent_started_at;
        }
        if (_.get(intelligence, "system_agent_ended_at")) {
            !obj.system ? (obj.system = {}) : "";
            !obj.system.agent ? (obj.system.agent = {}) : "";
            obj.system.agent.endedAt = intelligence.system_agent_ended_at;
        }
        return obj;
    }
    if (_.isArray(intelligences)) {
        var arr = [];
        for (var i = 0; i < intelligences.length; i++) {
            arr.push(toObject(intelligences[i]));
        }
        return arr;
    }
    else {
        return toObject(intelligences);
    }
}
exports.flattenToObject = flattenToObject;
function objectsToIntelligences(intelligences, intelligenceInstances) {
    function objectToIntelligences(intelligence, intelligenceInstance) {
        if (!intelligenceInstance) {
            intelligenceInstance = new Intelligence_1.default();
        }
        if (_.get(intelligence, "globalId")) {
            intelligenceInstance.global_id = intelligence.globalId;
        }
        if (_.get(intelligence, "type")) {
            intelligenceInstance.type = intelligence.type;
        }
        if (_.get(intelligence, "name")) {
            intelligenceInstance.name = intelligence.name;
        }
        if (_.get(intelligence, "desciption")) {
            intelligenceInstance.desciption = intelligence.desciption;
        }
        if (_.get(intelligence, "soi.globalId")) {
            intelligenceInstance.soi_global_id = intelligence.soi.globalId;
        }
        if (_.get(intelligence, "soi.state")) {
            intelligenceInstance.soi_state = intelligence.soi.state;
        }
        if (_.get(intelligence, "permission")) {
            intelligenceInstance.permission = intelligence.permission;
        }
        if (_.get(intelligence, "priority")) {
            intelligenceInstance.priority = intelligence.priority;
        }
        if (_.get(intelligence, "suitableAgents")) {
            intelligenceInstance.suitable_agents = intelligence.suitableAgents;
        }
        if (_.get(intelligence, "url")) {
            intelligenceInstance.url = intelligence.url;
        }
        if (_.get(intelligence, "metadata")) {
            intelligenceInstance.metadata = intelligence.metadata;
        }
        if (_.get(intelligence, "dataset")) {
            intelligenceInstance.dataset = intelligence.dataset;
        }
        if (_.get(intelligence, "system.state")) {
            intelligenceInstance.system_state = intelligence.system.state;
        }
        if (_.get(intelligence, "system.securityKey")) {
            intelligenceInstance.system_security_key =
                intelligence.system.securityKey;
        }
        if (_.get(intelligence, "system.created")) {
            intelligenceInstance.system_created_at = intelligence.system.created;
        }
        if (_.get(intelligence, "system.modified")) {
            intelligenceInstance.system_modified_at = intelligence.system.modified;
        }
        if (_.get(intelligence, "system.startedAt")) {
            intelligenceInstance.system_started_at = intelligence.system.startedAt;
        }
        if (_.get(intelligence, "system.endedAt")) {
            intelligenceInstance.system_ended_at = intelligence.system.endedAt;
        }
        if (_.get(intelligence, "system.agent.globalId")) {
            intelligenceInstance.system_agent_global_id =
                intelligence.system.agent.globalId;
        }
        if (_.get(intelligence, "system.agent.type")) {
            intelligenceInstance.system_agent_type = intelligence.system.agent.type;
        }
        if (_.get(intelligence, "system.agent.retryTimes")) {
            intelligenceInstance.system_agent_retry_times =
                intelligence.system.agent.retryTimes;
        }
        if (_.get(intelligence, "system.agent.startedAt")) {
            intelligenceInstance.system_agent_started_at =
                intelligence.system.agent.startedAt;
        }
        if (_.get(intelligence, "system.agent.endedAt")) {
            intelligenceInstance.system_agent_ended_at =
                intelligence.system.agent.endedAt;
        }
        if (_.get(intelligence, "system.version")) {
            intelligenceInstance.system_version = intelligence.system.version;
        }
        if (_.get(intelligence, "system.failuresNumber")) {
            intelligenceInstance.system_failures_number =
                intelligence.system.failuresNumber;
        }
        if (_.get(intelligence, "system.failuresReason")) {
            intelligenceInstance.system_failures_reason =
                intelligence.system.failuresReason;
        }
        return intelligenceInstance;
    }
    if (_.isArray(intelligences)) {
        var arr = [];
        for (var i = 0; i < intelligences.length; i++) {
            arr.push(objectToIntelligences(intelligences[i], intelligenceInstances && intelligenceInstances[i]));
        }
        return arr;
    }
    else {
        return objectToIntelligences(intelligences, intelligenceInstances);
    }
}
exports.objectsToIntelligences = objectsToIntelligences;
function addIntelligencesDB(intelligences) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, intelligenceInstances, generatedMaps, insertData, result, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    repo = typeorm_1.getRepository(Intelligence_1.default);
                    intelligenceInstances = objectsToIntelligences(intelligences, null);
                    generatedMaps = [];
                    _a.label = 1;
                case 1:
                    if (!intelligenceInstances.length) return [3 /*break*/, 3];
                    insertData = intelligenceInstances.splice(0, 5);
                    return [4 /*yield*/, repo.insert(insertData)];
                case 2:
                    result = _a.sent();
                    generatedMaps.push(result.generatedMaps);
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, generatedMaps];
                case 4:
                    err_1 = _a.sent();
                    error = new HTTPError(500, err_1, {}, "00005000001", "IntelligenceAndHistory.ctrl->addIntelligencesDB");
                    logger.error("addIntelligencesDB, error:", error);
                    throw error;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addIntelligencesDB = addIntelligencesDB;
function getIntelligencesOrHistoryForManagementDB(cursor, url, state, limit, securityKey, history) {
    return __awaiter(this, void 0, void 0, function () {
        var modified, id, intelligences, total, repoName, parseCursor, query, repo, nQuery, intelligenceQuery, andWhere, funName, funName, states, funName, parseCursor, funName, lastItem, nextCursor, err_2, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    modified = void 0, id = void 0, intelligences = void 0, total = void 0;
                    if (limit) {
                        limit = limit * 1;
                    }
                    repoName = Intelligence_1.default;
                    if (history) {
                        repoName = IntelligenceHistory_1.default;
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
                            $regex: utils.convertStringToRegExp(url)
                        };
                    }
                    if (state) {
                        query["system_state"] = {
                            $in: state.split(",")
                        };
                    }
                    return [4 /*yield*/, typeorm_1.getMongoRepository(repoName)];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.count(query)];
                case 2:
                    total = _a.sent();
                    nQuery = {
                        where: query
                    };
                    if (modified && id) {
                        nQuery.where.$or = [
                            {
                                system_modified_at: {
                                    $lt: modified * 1
                                }
                            },
                            // If the "sytem.modified" is an exact match, we need a tiebreaker, so we use the _id field from the cursor.
                            {
                                system_modified_at: modified * 1,
                                _id: {
                                    $lt: ObjectId(id)
                                }
                            }
                        ];
                    }
                    nQuery.take = limit || 50;
                    nQuery.order = {
                        system_modified_at: "DESC",
                        _id: "DESC"
                    };
                    return [4 /*yield*/, repo.find(nQuery)];
                case 3:
                    intelligences = _a.sent();
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, typeorm_1.getRepository(repoName).createQueryBuilder("intelligence")];
                case 5:
                    intelligenceQuery = _a.sent();
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
                        intelligenceQuery[funName]("intelligence.system_security_key = :securityKey", { securityKey: securityKey });
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
                        intelligenceQuery[funName]("intelligence.url LIKE :url", {
                            url: "%" + url + "%"
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
                        intelligenceQuery[funName]("intelligence.system_state IN (:...states)", {
                            states: states
                        });
                    }
                    return [4 /*yield*/, intelligenceQuery.getCount()];
                case 6:
                    total = _a.sent();
                    if (cursor) {
                        parseCursor = utils.atob(cursor);
                        parseCursor = /^(.*):_:_:_(.*)$/.exec(parseCursor);
                        modified = parseCursor[1];
                        id = parseCursor[2];
                    }
                    if (limit) {
                        limit = limit * 1;
                        intelligenceQuery.limit(limit);
                    }
                    intelligenceQuery.orderBy({ system_modified_at: "DESC", id: "DESC" });
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
                        intelligenceQuery[funName]("intelligence.system_modified_at < :modified OR (intelligence.system_modified_at = :modified AND intelligence.id < :id)", { modified: modified, id: id });
                    }
                    return [4 /*yield*/, intelligenceQuery.getMany()];
                case 7:
                    intelligences = _a.sent();
                    _a.label = 8;
                case 8:
                    lastItem = intelligences[intelligences.length - 1];
                    nextCursor = null;
                    if (lastItem && intelligences.length >= limit) {
                        nextCursor = utils.btoa(lastItem.system_modified_at + ":_:_:_" + lastItem.id);
                    }
                    if (nextCursor === cursor) {
                        nextCursor = null;
                    }
                    return [2 /*return*/, {
                            previousCursor: cursor,
                            nextCursor: nextCursor,
                            intelligences: flattenToObject(intelligences),
                            total: total
                        }];
                case 9:
                    err_2 = _a.sent();
                    error = new HTTPError(500, err_2, {}, "00005000001", "IntelligenceAndHistory.ctrl->getIntelligencesForManagementDB");
                    logger.error("getIntelligencesForManagementDB, error:", error);
                    throw error;
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.getIntelligencesOrHistoryForManagementDB = getIntelligencesOrHistoryForManagementDB;
// Update all matched intelligences' soi state
function updateIntelligencesSOIStateForManagementDB(soiGID, state) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, updateData, intelligenceQuery, err_3, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    state = _.toUpper(state);
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Intelligence_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {};
                    query.soi_global_id = {
                        $eq: soiGID
                    };
                    return [4 /*yield*/, repo.updateMany(query, {
                            $set: {
                                system_modified_at: Date.now(),
                                soi_state: state
                            }
                        })];
                case 2: 
                // update SOI state and modified_at
                return [2 /*return*/, _a.sent()];
                case 3:
                    updateData = {
                        system_modified_at: Date.now(),
                        soi_state: state
                    };
                    return [4 /*yield*/, typeorm_1.getRepository(Intelligence_1.default)
                            .createQueryBuilder("intelligence")
                            .update(Intelligence_1.default)
                            .set(updateData)
                            .where("intelligence.soi_global_id = :id", {
                            id: soiGID
                        })];
                case 4:
                    intelligenceQuery = _a.sent();
                    return [4 /*yield*/, intelligenceQuery.execute()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_3 = _a.sent();
                    error = new HTTPError(500, err_3, {}, "00005000001", "IntelligenceAndHistory.ctrl->updateIntelligencesSOIStateForManagementDB");
                    logger.error("updateIntelligencesSOIStateForManagementDB, error:", error);
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.updateIntelligencesSOIStateForManagementDB = updateIntelligencesSOIStateForManagementDB;
function updateIntelligencesStateForManagementDB(state, url, ids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var states, repo, query, intelligenceQuery, err_4, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    state = _.toUpper(state);
                    states = [INTELLIGENCE_STATE.draft];
                    if (state === INTELLIGENCE_STATE.configured) {
                        states = [INTELLIGENCE_STATE.running, INTELLIGENCE_STATE.draft];
                    }
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Intelligence_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {};
                    // Don't Running or Draft intelligences
                    query.system_state = {
                        $nin: states
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    if (ids && ids.length) {
                        query.global_id = {
                            $in: ids
                        };
                    }
                    else {
                        if (url) {
                            query.url = {
                                $regex: utils.convertStringToRegExp(url)
                            };
                        }
                    }
                    return [4 /*yield*/, repo.updateMany(query, {
                            $set: {
                                system_modified_at: Date.now(),
                                system_state: state
                            }
                        })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, typeorm_1.getRepository(Intelligence_1.default)
                        .createQueryBuilder("intelligence")
                        .update(Intelligence_1.default)
                        .set({
                        system_modified_at: function () { return Date.now().toString(); },
                        system_state: state
                    })];
                case 4:
                    intelligenceQuery = _a.sent();
                    intelligenceQuery.where("intelligence.system_state NOT IN (:...states)", {
                        states: states
                    });
                    if (securityKey) {
                        intelligenceQuery.andWhere("intelligence.system_security_key = :securityKey", { securityKey: securityKey });
                    }
                    if (ids && ids.length) {
                        intelligenceQuery.where("intelligence.global_id IN (:...ids)", {
                            ids: ids
                        });
                    }
                    else {
                        if (url) {
                            intelligenceQuery.andWhere("intelligence.url LIKE :url", {
                                url: "%" + url + "%"
                            });
                        }
                    }
                    return [4 /*yield*/, intelligenceQuery.execute()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_4 = _a.sent();
                    error = new HTTPError(500, err_4, {}, "00005000001", "IntelligenceAndHistory.ctrl->updateIntelligencesStateForManagementDB");
                    logger.error("updateIntelligencesStateForManagementDB, error:", error);
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.updateIntelligencesStateForManagementDB = updateIntelligencesStateForManagementDB;
function deleteIntelligencesOrHistoryForManagementDB(url, ids, securityKey, history) {
    return __awaiter(this, void 0, void 0, function () {
        var repoName, repo, query, intelligenceQuery, andWhere, funName, funName, funName, err_5, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    repoName = Intelligence_1.default;
                    if (history) {
                        repoName = IntelligenceHistory_1.default;
                    }
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(repoName)];
                case 1:
                    repo = _a.sent();
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    if (ids && ids.length) {
                        query.global_id = {
                            $in: ids
                        };
                    }
                    else {
                        if (url) {
                            query.url = {
                                $regex: utils.convertStringToRegExp(url)
                            };
                        }
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
                    intelligenceQuery = _a.sent();
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
                        intelligenceQuery[funName]("system_security_key = :securityKey", {
                            securityKey: securityKey
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
                        intelligenceQuery[funName]("global_id IN (:...ids)", {
                            ids: ids
                        });
                    }
                    else {
                        if (url) {
                            funName = void 0;
                            if (andWhere) {
                                funName = "andWhere";
                            }
                            else {
                                funName = "where";
                                andWhere = true;
                            }
                            intelligenceQuery[funName]("url LIKE :url", {
                                url: "%" + url + "%"
                            });
                        }
                    }
                    return [4 /*yield*/, intelligenceQuery.execute()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_5 = _a.sent();
                    error = new HTTPError(500, err_5, {}, "00005000001", "IntelligenceAndHistory.ctrl->deleteIntelligencesForManagementDB");
                    logger.error("deleteIntelligencesForManagementDB, error:", error);
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.deleteIntelligencesOrHistoryForManagementDB = deleteIntelligencesOrHistoryForManagementDB;
function deleteIntelligencesBySOIForManagementDB(soiGID, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, intelligenceQuery, err_6, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Intelligence_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    query.soi_global_id = {
                        $in: [soiGID]
                    };
                    return [4 /*yield*/, repo.deleteMany(query)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, typeorm_1.getRepository(Intelligence_1.default)
                        .createQueryBuilder("intelligence")
                        .delete()
                        .from(Intelligence_1.default)
                        .where("intelligence.soi_global_id = :id", {
                        id: soiGID
                    })];
                case 4:
                    intelligenceQuery = _a.sent();
                    if (securityKey) {
                        intelligenceQuery.andWhere("intelligence.system_security_key = :securityKey", { securityKey: securityKey });
                    }
                    return [4 /*yield*/, intelligenceQuery.execute()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_6 = _a.sent();
                    error = new HTTPError(500, err_6, {}, "00005000001", "IntelligenceAndHistory.ctrl->deleteIntelligencesBySOIForManagementDB");
                    logger.error("deleteIntelligencesBySOIForManagementDB, error:", error);
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.deleteIntelligencesBySOIForManagementDB = deleteIntelligencesBySOIForManagementDB;
function getIntelligencesForAgentDB(agentConfig, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var intelligences, concurrent, permission, repo, query, intelligenceQuery, intelligenceQueryNoSecurityKey, gids, sois, i, item, soi, updateData, query, err_7, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 28, , 29]);
                    intelligences = [];
                    concurrent = Number(agentConfig.concurrent);
                    if (isNaN(concurrent)) {
                        // if concurrent isn't a number, then use default value
                        concurrent = getConfig("EACH_TIME_INTELLIGENCES_NUMBER");
                    }
                    permission = PERMISSIONS.private;
                    if (!agentConfig.private) {
                        permission = PERMISSIONS.public;
                    }
                    repo = void 0;
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 8];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Intelligence_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {
                        where: {}
                    };
                    query.where.system_state = {
                        $nin: [
                            INTELLIGENCE_STATE.draft,
                            INTELLIGENCE_STATE.running,
                            INTELLIGENCE_STATE.finished,
                            INTELLIGENCE_STATE.paused
                        ]
                    };
                    query.where.soi_state = {
                        $eq: SOI_STATE.active
                    };
                    query.where.suitable_agents = {
                        $elemMatch: {
                            $eq: _.toUpper(agentConfig.type)
                        }
                    };
                    query.take = concurrent;
                    query.order = {
                        soi_global_id: "DESC",
                        priority: "ASC"
                    };
                    if (!securityKey) return [3 /*break*/, 5];
                    query.where.system_security_key = securityKey;
                    return [4 /*yield*/, repo.find(query)];
                case 2:
                    intelligences = _a.sent();
                    if (!((!permission || _.upperCase(permission) === PERMISSIONS.public) &&
                        (!intelligences || !intelligences.length))) return [3 /*break*/, 4];
                    // if no intelligences for this securityKey and if this agent's permission is public then, get other intelligences that is public
                    delete query.where.system_security_key;
                    query.where.permission = {
                        $nin: [PERMISSIONS.private]
                    };
                    return [4 /*yield*/, repo.find(query)];
                case 3:
                    intelligences = _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, repo.find(query)];
                case 6:
                    // if securityKey is empty, this means it is on-primse mode, if a request was sent by UI Server, it always contains a securityKey, only if this request is directly sent to
                    // DIA-Engine, then it possible don't have securityKey, in this mode, then it should be able to get all permissions intelligences since they are belong to same user
                    intelligences = _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 16];
                case 8: return [4 /*yield*/, typeorm_1.getRepository(Intelligence_1.default).createQueryBuilder("intelligence")];
                case 9:
                    intelligenceQuery = _a.sent();
                    return [4 /*yield*/, typeorm_1.getRepository(Intelligence_1.default).createQueryBuilder("intelligence")];
                case 10:
                    intelligenceQueryNoSecurityKey = _a.sent();
                    intelligenceQuery.where("intelligence.system_state NOT IN (:...states)", {
                        states: [
                            INTELLIGENCE_STATE.draft,
                            INTELLIGENCE_STATE.running,
                            INTELLIGENCE_STATE.finished,
                            INTELLIGENCE_STATE.paused
                        ]
                    });
                    intelligenceQuery.andWhere("intelligence.soi_state = :state", {
                        state: SOI_STATE.active
                    });
                    intelligenceQuery.andWhere("intelligence.suitable_agents LIKE :agentType", { agentType: "%" + _.toUpper(agentConfig.type) + "%" });
                    intelligenceQuery.orderBy({
                        soi_global_id: "DESC",
                        priority: "ASC"
                    });
                    intelligenceQuery.limit(concurrent);
                    intelligenceQueryNoSecurityKey.where("intelligence.system_state NOT IN (:...states)", {
                        states: [
                            INTELLIGENCE_STATE.draft,
                            INTELLIGENCE_STATE.running,
                            INTELLIGENCE_STATE.finished,
                            INTELLIGENCE_STATE.paused
                        ]
                    });
                    intelligenceQueryNoSecurityKey.andWhere("intelligence.soi_state = :state", {
                        state: SOI_STATE.active
                    });
                    intelligenceQueryNoSecurityKey.andWhere("intelligence.suitable_agents LIKE :agentType", { agentType: "%" + _.toUpper(agentConfig.type) + "%" });
                    intelligenceQueryNoSecurityKey.orderBy({
                        soi_global_id: "DESC",
                        priority: "ASC"
                    });
                    intelligenceQueryNoSecurityKey.limit(concurrent);
                    if (!securityKey) return [3 /*break*/, 14];
                    intelligenceQuery.andWhere("intelligence.system_security_key = :securityKey", { securityKey: securityKey });
                    return [4 /*yield*/, intelligenceQuery.getMany()];
                case 11:
                    intelligences = _a.sent();
                    if (!((!permission || _.upperCase(permission) === PERMISSIONS.public) &&
                        (!intelligences || !intelligences.length))) return [3 /*break*/, 13];
                    // if no intelligences for this securityKey and if this agent's permission is public then, get other intelligences that is public
                    intelligenceQueryNoSecurityKey.andWhere("intelligence.permission NOT IN (:...permissions)", {
                        permissions: [PERMISSIONS.private]
                    });
                    return [4 /*yield*/, intelligenceQueryNoSecurityKey.getMany()];
                case 12:
                    intelligences = _a.sent();
                    _a.label = 13;
                case 13: return [3 /*break*/, 16];
                case 14: return [4 /*yield*/, intelligenceQuery.getMany()];
                case 15:
                    // if securityKey is empty, this means it is on-primse mode, if a request was sent by UI Server, it always contains a securityKey, only if this request is directly sent to
                    // DIA-Engine, then it possible don't have securityKey, in this mode, then it should be able to get all permissions intelligences since they are belong to same user
                    intelligences = _a.sent();
                    _a.label = 16;
                case 16:
                    intelligences = flattenToObject(intelligences);
                    gids = [];
                    sois = {};
                    i = 0;
                    _a.label = 17;
                case 17:
                    if (!(i < intelligences.length)) return [3 /*break*/, 22];
                    item = intelligences[i] || {};
                    gids.push(item.globalId);
                    if (!sois[item.soi.globalId]) return [3 /*break*/, 18];
                    item.soi = sois[item.soi.globalId];
                    return [3 /*break*/, 20];
                case 18: return [4 /*yield*/, soiHelpers.getSOI(item.soi.globalId)];
                case 19:
                    soi = _a.sent();
                    soi = _.merge({}, DEFAULT_SOI, soi);
                    // remove unnecessary data
                    soi = utils.omit(soi, ["_id", "securityKey", "created", "modified"], ["system"]);
                    sois[item.soi.globalId] = soi;
                    item.soi = sois[item.soi.globalId];
                    _a.label = 20;
                case 20:
                    // Comment: 07/30/2019
                    // Reason: Since this intelligence is reassigned, so it always need to update agent information
                    // if (!item.agent) {
                    //   item.agent = {
                    //     globalId: agentGid,
                    //     type: _.toUpper(agentConfig.type),
                    //     started_at: Date.now()
                    //   };
                    // }
                    item.system.agent = {
                        globalId: agentConfig.globalId,
                        type: _.toUpper(agentConfig.type)
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
                        system_state: INTELLIGENCE_STATE.running,
                        system_agent_global_id: agentConfig.globalId,
                        system_agent_type: _.toUpper(agentConfig.type)
                    };
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 24];
                    // Update intelligences that return to agent
                    return [4 /*yield*/, repo.updateMany({
                            global_id: {
                                $in: gids
                            }
                        }, {
                            $set: updateData
                        })];
                case 23:
                    // Update intelligences that return to agent
                    _a.sent();
                    return [3 /*break*/, 27];
                case 24: return [4 /*yield*/, typeorm_1.getRepository(Intelligence_1.default)
                        .createQueryBuilder("intelligence")
                        .update(Intelligence_1.default)
                        .set(updateData)];
                case 25:
                    query = _a.sent();
                    query.where("intelligence.global_id IN (:...gids)", {
                        gids: gids
                    });
                    return [4 /*yield*/, query.execute()];
                case 26:
                    _a.sent();
                    _a.label = 27;
                case 27:
                    // Update Agent Last Ping
                    // Don't need to wait agent update finish
                    Agent_ctrl_1.updateAgentDB(agentConfig.globalId, securityKey, {
                        system: {
                            modified: Date.now(),
                            lastPing: Date.now()
                        }
                    });
                    // TODO: 2019/11/10 need to rethink about this logic, since intelligences already send back to agents
                    //        if we check for now, it is meaningless, better way is let agent to tell. For example, if collect
                    //        intelligences fail, then check SOI or direct know soi is inactive
                    // Check SOI status in parallel
                    // // After get intelligences that need to collect, during sametime to check whether this SOI is active.
                    // for (let gid in sois) {
                    //   let soi = sois[gid];
                    //   // if this soi isn't in check status progress, then check it
                    //   if (!__check_sois_status__[gid]) {
                    //     (async () => {
                    //       // change soi status to true to avoid duplicate check in same time
                    //       __check_sois_status__[gid] = true;
                    //       await soisHelpers.updateSOIState(gid, soi);
                    //       // after finish, delete its value in hashmap
                    //       delete __check_sois_status__[gid];
                    //     })();
                    //   }
                    // }
                    return [2 /*return*/, intelligences];
                case 28:
                    err_7 = _a.sent();
                    error = new HTTPError(500, err_7, {}, "00005000001", "IntelligenceAndHistory.ctrl->getIntelligencesForAgentDB");
                    logger.error("getIntelligencesForAgentDB, error:", error);
                    throw error;
                case 29: return [2 /*return*/];
            }
        });
    });
}
exports.getIntelligencesForAgentDB = getIntelligencesForAgentDB;
/**
 * Get intelligences by globalIds
 * @param gids - intelligences globalId
 * @param securityKey - security key
 */
function getIntelligencesDB(gids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, intelligences, intelligenceQuery, intelligences, err_8, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    if (!gids) {
                        return [2 /*return*/, []];
                    }
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    query = {
                        where: {}
                    };
                    if (securityKey) {
                        query.where["system_security_key"] = securityKey;
                    }
                    query.where.global_id = {
                        $in: gids
                    };
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Intelligence_1.default)];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.find(query)];
                case 2:
                    intelligences = _a.sent();
                    intelligences = flattenToObject(intelligences);
                    return [2 /*return*/, intelligences];
                case 3: return [4 /*yield*/, typeorm_1.getRepository(Intelligence_1.default).createQueryBuilder("intelligence")];
                case 4:
                    intelligenceQuery = _a.sent();
                    intelligenceQuery.where("intelligence.global_id IN (:...gids)", { gids: gids });
                    if (securityKey) {
                        intelligenceQuery.andWhere("intelligence.system_security_key = :securityKey", { securityKey: securityKey });
                    }
                    return [4 /*yield*/, intelligenceQuery.getMany()];
                case 5:
                    intelligences = _a.sent();
                    intelligences = flattenToObject(intelligences);
                    return [2 /*return*/, intelligences];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_8 = _a.sent();
                    error = new HTTPError(500, err_8, {}, "00005000001", "IntelligenceAndHistory.ctrl->getIntelligencesDB");
                    logger.error("getIntelligencesDB, error:", error);
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getIntelligencesDB = getIntelligencesDB;
function deleteIntelligencesDB(gids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, err_9, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    query.global_id = {
                        $in: gids
                    };
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Intelligence_1.default)];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.deleteMany(query)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, typeorm_1.getRepository(Intelligence_1.default)
                        .createQueryBuilder("intelligence")
                        .delete()
                        .where("intelligence.global_id IN (:...gids)", { gids: gids })
                        .execute()];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_9 = _a.sent();
                    error = new HTTPError(500, err_9, {}, "00005000001", "IntelligenceAndHistory.ctrl->deleteIntelligencesDB");
                    logger.error("deleteIntelligencesDB, error:", error);
                    throw error;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.deleteIntelligencesDB = deleteIntelligencesDB;
/**
 * Update intelligences one by one
 * Used for the updating information for each intelligences is different
 * @param intelligences{object[]}
 */
function updateEachIntelligencesDB(intelligences) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, i, intelligence, err_10, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    repo = void 0;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < intelligences.length)) return [3 /*break*/, 10];
                    intelligence = intelligences[i];
                    intelligence = objectsToIntelligences(intelligence, {});
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 5];
                    if (!!repo) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Intelligence_1.default)];
                case 2:
                    repo = _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, repo.updateOne({
                        global_id: intelligence.global_id
                    }, intelligence)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 5:
                    if (!!repo) return [3 /*break*/, 7];
                    return [4 /*yield*/, typeorm_1.getRepository(Intelligence_1.default)];
                case 6:
                    repo = _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, repo
                        .createQueryBuilder("intelligence")
                        .update(Intelligence_1.default)
                        .set(intelligence)
                        .where("intelligence.global_id = :gloalId", {
                        gloalId: intelligence.global_id
                    })
                        .execute()];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 1];
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_10 = _a.sent();
                    error = new HTTPError(500, err_10, {}, "00005000001", "IntelligenceAndHistory.ctrl->updateIntelligencesDB");
                    logger.error("updateIntelligencesDB, error:", error);
                    throw error;
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.updateEachIntelligencesDB = updateEachIntelligencesDB;
function addIntelligenceHistoryDB(intelligences) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, intelligenceInstances, generatedMaps, insertData, result, err_11, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    repo = typeorm_1.getRepository(IntelligenceHistory_1.default);
                    intelligenceInstances = objectsToIntelligences(intelligences, null);
                    generatedMaps = [];
                    _a.label = 1;
                case 1:
                    if (!intelligenceInstances.length) return [3 /*break*/, 3];
                    insertData = intelligenceInstances.splice(0, 5);
                    return [4 /*yield*/, repo.insert(insertData)];
                case 2:
                    result = _a.sent();
                    generatedMaps.push(result.generatedMaps);
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, generatedMaps];
                case 4:
                    err_11 = _a.sent();
                    error = new HTTPError(500, err_11, {}, "00005000001", "IntelligenceHistory.ctrl->addIntelligenceHistoryDB");
                    logger.error("addIntelligenceHistoryDB, error:", error);
                    throw error;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addIntelligenceHistoryDB = addIntelligenceHistoryDB;
