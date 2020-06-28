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
var Agent_1 = require("../entity/Agent");
var logger = require("../util/logger");
var HTTPError = require("../util/error").HTTPError;
function flattenToObject(agents) {
    function toObject(agent) {
        var obj = {};
        obj.globalId = agent.global_id;
        obj.type = agent.type;
        obj.name = agent.name;
        obj.description = agent.description;
        obj.private = agent.private;
        obj.permission = agent.permission;
        obj.concurrent = agent.concurrent;
        obj.pollingInterval = agent.polling_interval;
        obj.maxWaitingTime = agent.max_waiting_time;
        obj.maxCollect = agent.max_collect;
        obj.idelTime = agent.idel_time;
        obj.timeout = agent.timeout;
        obj.maxRetry = agent.max_retry;
        obj.baseURL = agent.base_url;
        if (_.get(agent, "health_method")) {
            !obj.health ? (obj.health = {}) : "";
            obj.health.method = agent.health_method;
        }
        if (_.get(agent, "health_path")) {
            !obj.health ? (obj.health = {}) : "";
            obj.health.path = agent.health_path;
        }
        if (_.get(agent, "system_state")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.state = agent.system_state;
        }
        if (_.get(agent, "system_version")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.version = agent.system_version;
        }
        if (_.get(agent, "system_security_key")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.securityKey = agent.system_security_key;
        }
        if (_.get(agent, "system_created_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.created = agent.system_created_at;
        }
        if (_.get(agent, "system_modified_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.modified = agent.system_modified_at;
        }
        if (_.get(agent, "system_last_ping")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.lastPing = agent.system_last_ping;
        }
        if (_.get(agent, "system_serial_id")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.serialId = agent.system_serial_id;
        }
        return obj;
    }
    if (_.isArray(agents)) {
        var arr = [];
        for (var i = 0; i < agents.length; i++) {
            arr.push(toObject(agents[i]));
        }
        return arr;
    }
    else {
        return toObject(agents);
    }
}
/**
 *
 * @param agent{object} - the agent object
 */
function objectToAgent(agent, agentInstance) {
    if (!agentInstance) {
        agentInstance = new Agent_1.default();
    }
    if (_.get(agent, "globalId")) {
        agentInstance.global_id = agent.globalId;
    }
    if (_.get(agent, "type")) {
        agentInstance.type = agent.type;
    }
    if (_.get(agent, "name")) {
        agentInstance.name = agent.name;
    }
    if (_.get(agent, "description")) {
        agentInstance.description = agent.description;
    }
    if (_.get(agent, "private")) {
        agentInstance.private = agent.private;
    }
    if (_.get(agent, "permission")) {
        agentInstance.permission = agent.permission;
    }
    if (_.get(agent, "concurrent")) {
        agentInstance.concurrent = agent.concurrent;
    }
    if (_.get(agent, "pollingInterval")) {
        agentInstance.polling_interval = agent.pollingInterval;
    }
    if (_.get(agent, "maxWaitingTime")) {
        agentInstance.max_waiting_time = agent.maxWaitingTime;
    }
    if (_.get(agent, "maxCollect")) {
        agentInstance.max_collect = agent.maxCollect;
    }
    if (_.get(agent, "idelTime")) {
        agentInstance.idel_time = agent.idelTime;
    }
    if (_.get(agent, "timeout")) {
        agentInstance.timeout = agent.timeout;
    }
    if (_.get(agent, "maxRetry")) {
        agentInstance.max_retry = agent.maxRetry;
    }
    if (_.get(agent, "baseURL")) {
        agentInstance.base_url = agent.baseURL;
    }
    if (_.get(agent, "health.method")) {
        agentInstance.health_method = agent.health.method;
    }
    if (_.get(agent, "health.path")) {
        agentInstance.health_path = agent.health.path;
    }
    if (_.get(agent, "system.state")) {
        agentInstance.system_state = agent.system.state;
    }
    if (_.get(agent, "system.version")) {
        agentInstance.system_version = agent.system.version;
    }
    if (_.get(agent, "system.securityKey")) {
        agentInstance.system_security_key = agent.system.securityKey;
    }
    else {
        if (_.get(agent, "system.securityKey") !== undefined) {
            agentInstance.system_security_key = null;
        }
    }
    if (_.get(agent, "system.created")) {
        agentInstance.system_created_at = agent.system.created;
    }
    else {
        if (_.get(agent, "system.created") !== undefined) {
            agentInstance.system_created_at = null;
        }
    }
    if (_.get(agent, "system.modified")) {
        agentInstance.system_modified_at = agent.system.modified;
    }
    else {
        if (_.get(agent, "system.modified") !== undefined) {
            agentInstance.system_modified_at = null;
        }
    }
    if (_.get(agent, "system.lastPing")) {
        agentInstance.system_last_ping = agent.system.lastPing;
    }
    else {
        if (_.get(agent, "system.lastPing") !== undefined) {
            agentInstance.system_last_ping = null;
        }
    }
    if (_.get(agent, "system.serialId")) {
        agentInstance.system_serial_id = agent.system.serialId;
    }
    else {
        if (_.get(agent, "system.serialId") !== undefined) {
            agentInstance.system_serial_id = null;
        }
    }
    return agentInstance;
}
function addAgentDB(agent) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, agentInstance, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(Agent_1.default);
                    agentInstance = objectToAgent(agent, null);
                    console.log("agentInstance: ", agentInstance);
                    return [4 /*yield*/, repo.save(agentInstance)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, {
                            _id: agentInstance.id,
                            globalId: agentInstance.global_id,
                        }];
                case 2:
                    err_1 = _a.sent();
                    error = new HTTPError(500, err_1, {}, "00005000001", "Agent.ctrl->addAgentDB");
                    logger.error("addAgentDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addAgentDB = addAgentDB;
function getAgentsDB(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, agents, err_2, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(Agent_1.default);
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    return [4 /*yield*/, repo.find(query)];
                case 1:
                    agents = _a.sent();
                    agents = flattenToObject(agents);
                    return [2 /*return*/, agents];
                case 2:
                    err_2 = _a.sent();
                    error = new HTTPError(500, err_2, {}, "00005000001", "Agent.ctrl->getAgentsDB");
                    logger.error("getAgentsDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAgentsDB = getAgentsDB;
function getAgentByGlobalIdDB(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, agent, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(Agent_1.default);
                    query = {
                        global_id: gid,
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    return [4 /*yield*/, repo.findOne(query)];
                case 1:
                    agent = _a.sent();
                    if (!agent) {
                        throw new HTTPError(404, null, { globalId: gid });
                    }
                    agent = flattenToObject(agent);
                    return [2 /*return*/, agent];
                case 2:
                    err_3 = _a.sent();
                    if (!(err_3 instanceof HTTPError)) {
                        err_3 = new HTTPError(500, err_3, {}, "00005000001", "Agent.ctrl->getAgentByGlobalIdDB");
                    }
                    // if(err.statusCode === 404){
                    //   logger.info(`getAgentByGlobalIdDB, cannot find agent by globalId - ${gid}`);
                    // }else{
                    //   logger.error(`getAgentByGlobalIdDB, error: ${err.message}`, {error: err});
                    // }
                    throw err_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAgentByGlobalIdDB = getAgentByGlobalIdDB;
function updateAgentDB(gid, securityKey, agent) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, result, err_4, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!agent || !gid) {
                        // if agent doesn't exist or gid doesn't exist, don't need to update
                        return [2 /*return*/, {
                                gid: gid
                            }];
                    }
                    query = {
                        global_id: gid,
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    repo = typeorm_1.getRepository(Agent_1.default);
                    if (!agent.system) {
                        agent.system = {};
                    }
                    // update last modified
                    agent.system.modified = Date.now();
                    agent = objectToAgent(agent, {});
                    return [4 /*yield*/, repo.update(query, agent)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_4 = _a.sent();
                    error = new HTTPError(500, err_4, {}, "00005000001", "Agent.ctrl->updateAgentDB");
                    logger.error("updateAgentDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateAgentDB = updateAgentDB;
function deleteAgentDB(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, result, err_5, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = {
                        global_id: gid,
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    repo = typeorm_1.getRepository(Agent_1.default);
                    return [4 /*yield*/, repo.delete(query)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_5 = _a.sent();
                    error = new HTTPError(500, err_5, {}, "00005000001", "Agent.ctrl->deleteAgentDB");
                    logger.error("deleteAgentDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteAgentDB = deleteAgentDB;
