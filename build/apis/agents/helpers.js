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
var semver = require("semver");
var _a = require("../../util/constants"), CONFIG = _a.CONFIG, AGENT_STATE = _a.AGENT_STATE, DEFAULT_AGENT = _a.DEFAULT_AGENT;
var HTTPError = require("../../util/error").HTTPError;
var Agent_ctrl_1 = require("../../dbController/Agent.ctrl");
var _b = require("../../util/utils"), validateAgentAndUpdateState = _b.validateAgentAndUpdateState, generateGlobalId = _b.generateGlobalId;
// const logger = require("../../util/logger");
/**
 * Check an agent exist or not, if exist return this agent
 * @param {string} gid - Agent global ID
 * @param {string} securityKey - request security key if passed
 * @returns {Object} - agent
 */
function checkAgentExistByGlobalID(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var agent, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Agent_ctrl_1.getAgentByGlobalIdDB(gid, securityKey)];
                case 1:
                    agent = _a.sent();
                    // agent doesn't exist
                    if (!agent) {
                        throw new HTTPError(404, null, { globalId: gid }, "00004040002", gid, securityKey);
                    }
                    return [2 /*return*/, agent];
                case 2:
                    err_1 = _a.sent();
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Register an Agent to DIA.
 * Follow KISS principle, you need to make sure your **globalId** is unique.
 * Currently, **globalId** is only way for **Agent** Identity.
 * @param {object} Agent - Agent need to be register
 * @param {string} securityKey - The securityKey that previous service send, used to identify who send this request
 *
 * @returns {object}
 */
function registerAgent(agent, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // validate agent
                    // TODO: change to validate based on schema
                    if (!_.get(agent, "name")) {
                        throw new HTTPError(400, null, {}, "00134000001");
                    }
                    // TODO: Think about whether we need to support Dynamic Generate **globalId**.
                    // Comment 07/12/2019: after several time thinking, I think we should automatically generate **globalId**, so I comment this code.
                    // Use globalId to find Agent.
                    // let agentInDB = await findOneByGlobalId(
                    //   COLLECTIONS_NAME.agents,
                    //   agent.globalId,
                    //   {
                    //     projection: {
                    //       globalId: 1
                    //     }
                    //   }
                    // );
                    // // globalId must be unique
                    // if (agentInDB) {
                    //   // globalId already exist
                    //   throw new HTTPError(
                    //     400,
                    //     null,
                    //     {
                    //       globalId: agent.globalId
                    //     },
                    //     "00134000001",
                    //     agent.globalId
                    //   );
                    // }
                    // Delete globalId and _id, both of them should be generated by server side, don't allow user pass
                    delete agent.globalId;
                    delete agent._id;
                    agent.globalId = generateGlobalId("agent");
                    agent.type = _.toUpper(agent.type);
                    // Before validate, default set agent state to DRAFT
                    // agent.state = AGENT_STATE.draft;
                    // when create an agent, default version is 1.0.0, the reason of 1.0.0 is because currently Agent Schema version is 1.0.0, make sure the main version is same with schema
                    // agent.version = '1.0.0';
                    agent = _.merge({}, DEFAULT_AGENT, agent);
                    // if securityKey exist, then add securityKey to agent
                    if (securityKey) {
                        agent.system[CONFIG.SECURITY_KEY_IN_DB] = securityKey;
                    }
                    agent.system.created = Date.now();
                    agent.system.modified = Date.now();
                    agent.system.lastPing = null;
                    // Validate agent, based on validate result to update agent state, don't allow user to direct change agent state
                    agent = validateAgentAndUpdateState(agent);
                    return [4 /*yield*/, Agent_ctrl_1.addAgentDB(agent)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_2 = _a.sent();
                    // Already HTTPError, then throw it
                    throw err_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * OperationIndex: 0002
 * Get a Agent by globalId
 * @param {string} gid - globalId
 *
 * @returns {object}
 */
function getAgent(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var agent, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!gid) {
                        throw new HTTPError(400, null, {
                            globalId: gid
                        }, "00024000001");
                    }
                    return [4 /*yield*/, Agent_ctrl_1.getAgentByGlobalIdDB(gid, securityKey)];
                case 1:
                    agent = _a.sent();
                    if (!agent) {
                        throw new HTTPError(404, null, {
                            globalId: gid
                        }, "00024040001", gid);
                    }
                    return [2 /*return*/, agent];
                case 2:
                    err_3 = _a.sent();
                    throw err_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * OperationIndex: 0010
 * Get a Agents
 * @param {string} securityKey - current user's security key
 *
 * @returns {object}
 */
function getAgents(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var agents, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Agent_ctrl_1.getAgentsDB(securityKey)];
                case 1:
                    agents = _a.sent();
                    return [2 /*return*/, agents];
                case 2:
                    err_4 = _a.sent();
                    throw err_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateAgent(gid, agent, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var originalAgent, obj, agentState, result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, checkAgentExistByGlobalID(gid, securityKey)];
                case 1:
                    originalAgent = _a.sent();
                    // Remove cannot update fields
                    delete agent._id;
                    delete agent.id;
                    delete agent.globalId;
                    if (agent.system) {
                        delete agent.system.created;
                    }
                    obj = _.merge({}, originalAgent, agent);
                    obj.system.modified = Date.now();
                    agentState = obj.system.state;
                    // Validate agent, based on validate result to update agent state, don't allow user to direct change agent state
                    obj = validateAgentAndUpdateState(obj);
                    // if agent state is **active** or **deleted**, then return error
                    if (_.toUpper(obj.system.state) === _.toUpper(AGENT_STATE.active) ||
                        _.toUpper(obj.system.state) === _.toUpper(AGENT_STATE.deleted)) {
                        throw new HTTPError(400, null, { globalId: obj.globalId, state: obj.system.state, name: obj.name }, "00015400001", obj.system.state, obj.globalId);
                    }
                    // if state change, then we need to update minor version, otherwise only need to update patch version
                    if (agentState !== obj.system.state) {
                        // this means state change, then need to update minor
                        obj.system.version = semver.inc(obj.system.version || "1.0.0", "minor");
                    }
                    else {
                        obj.system.version = semver.inc(obj.system.version || "1.0.0", "patch");
                    }
                    return [4 /*yield*/, Agent_ctrl_1.updateAgentDB(gid, securityKey, obj)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_5 = _a.sent();
                    throw err_5;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Activate an agent
 * 0017
 * @param {string} gid - agent globalId
 * @param {string} securityKey - current user's security key
 */
function activateAgent(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var originalAgent, result, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, checkAgentExistByGlobalID(gid, securityKey)];
                case 1:
                    originalAgent = _a.sent();
                    originalAgent = validateAgentAndUpdateState(originalAgent);
                    // if it is draft state then throw an error
                    if (originalAgent.system.state === AGENT_STATE.draft) {
                        throw new HTTPError(400, null, { globalId: gid }, "0017400001");
                    }
                    else if (originalAgent.system.state === AGENT_STATE.deleted) {
                        // **delete** then tell user cannot find, since we didn't show deleted agent in user's agent list
                        throw new HTTPError(404, null, { globalId: gid }, "00004040001", gid, securityKey);
                    }
                    else if (originalAgent.system.state === AGENT_STATE.active) {
                        // If an agent's state is active, don't need to update it again
                        return [2 /*return*/, {
                                state: originalAgent.system.state
                            }];
                    }
                    // change state to **active**
                    originalAgent.system.state = _.toUpper(AGENT_STATE.active);
                    originalAgent.system.version = semver.inc(originalAgent.system.version || "1.0.0", "minor");
                    return [4 /*yield*/, Agent_ctrl_1.updateAgentDB(gid, securityKey, originalAgent)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, {
                            state: originalAgent.system.state
                        }];
                case 3:
                    err_6 = _a.sent();
                    throw err_6;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Deactivate an agent
 * @param {string} gid
 * @param {string} securityKey
 */
function deactivateAgent(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var originalAgent, result, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, checkAgentExistByGlobalID(gid, securityKey)];
                case 1:
                    originalAgent = _a.sent();
                    // originalAgent = validateAgentAndUpdateState(originalAgent);
                    // if it is draft state then throw an error
                    if (originalAgent.system.state === AGENT_STATE.draft) {
                        throw new HTTPError(400, null, { globalId: gid }, "0018400001");
                    }
                    else if (originalAgent.system.state === AGENT_STATE.deleted) {
                        // **delete** then tell user cannot find, since we didn't show deleted agent in user's agent list
                        throw new HTTPError(404, null, { globalId: gid }, "00004040001", gid, securityKey);
                    }
                    else if (originalAgent.system.state != AGENT_STATE.active) {
                        // If an agent's state isn't active, don't need to update it again
                        return [2 /*return*/, {
                                state: originalAgent.system.state
                            }];
                    }
                    // change state to **configured**
                    originalAgent.system.state = _.toUpper(AGENT_STATE.configured);
                    originalAgent.system.version = semver.inc(originalAgent.system.version || "1.0.0", "minor");
                    return [4 /*yield*/, Agent_ctrl_1.updateAgentDB(gid, securityKey, originalAgent)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, {
                            state: originalAgent.system.state
                        }];
                case 3:
                    err_7 = _a.sent();
                    throw err_7;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function unregisterAgent(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log('gid: ', gid, ' securityKey: ', securityKey);
                    // Make sure can find Agent, if cannot, the it will throw 404 error
                    return [4 /*yield*/, checkAgentExistByGlobalID(gid, securityKey)];
                case 1:
                    // Make sure can find Agent, if cannot, the it will throw 404 error
                    _a.sent();
                    return [4 /*yield*/, Agent_ctrl_1.deleteAgentDB(gid, securityKey)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_8 = _a.sent();
                    throw err_8;
                case 4: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    registerAgent: registerAgent,
    getAgent: getAgent,
    updateAgent: updateAgent,
    unregisterAgent: unregisterAgent,
    activateAgent: activateAgent,
    deactivateAgent: deactivateAgent,
    getAgents: getAgents
};
