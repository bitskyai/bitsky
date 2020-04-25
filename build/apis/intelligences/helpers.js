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
var _a = require("../../util/constants"), CONFIG = _a.CONFIG, DEFAULT_SOI = _a.DEFAULT_SOI, INTELLIGENCE_STATE = _a.INTELLIGENCE_STATE, PERMISSIONS = _a.PERMISSIONS, AGENT_STATE = _a.AGENT_STATE, SOI_STATE = _a.SOI_STATE, DEFAULT_INTELLIGENCE = _a.DEFAULT_INTELLIGENCE;
var soisHelpers = require("../sois/helpers");
var agentsHelpers = require("../agents/helpers");
var logger = require("../../util/logger");
var utils = require("../../util/utils");
var IntelligenceAndHistory_ctrl_1 = require("../../dbController/IntelligenceAndHistory.ctrl");
// To avoid running check soi status multiple times
// next check will not be started if previous job doesn't finish
// TODO: when start thinking about load balance, then this data should be in memory cache, not inside service memory
//================================================================
// Following APIs are designed for CRUD intelligences for Management UI(Desktop or web app)
function getIntelligencesForManagement(cursor, url, state, limit, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.getIntelligencesOrHistoryForManagementDB(cursor, url, state, limit, securityKey)];
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
 * @param {array} ids - Intelligences Global Id
 * @param {string} securityKey - security key string
 */
function pauseIntelligencesForManagement(url, ids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.updateIntelligencesStateForManagementDB(INTELLIGENCE_STATE.paused, url, ids, securityKey)];
                case 1:
                    result = _a.sent();
                    console.log(result);
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
 * @param {array} ids - Intelligences Global Id
 * @param {string} securityKey - security key string
 */
function resumeIntelligencesForManagement(url, ids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.updateIntelligencesStateForManagementDB(INTELLIGENCE_STATE.configured, url, ids, securityKey)];
                case 1:
                    result = _a.sent();
                    console.log(result);
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
 * @param {array} ids - Intelligences Global Id
 * @param {string} securityKey - security key string
 */
function deleteIntelligencesForManagement(url, ids, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.deleteIntelligencesOrHistoryForManagementDB(url, ids, securityKey)];
                case 1:
                    result = _a.sent();
                    console.log(result);
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
// Following APIs are designed for Agent CRUD Intelligences
/**
 * Create intelligences
 *
 * @param {array} intelligences
 * @param {string} securityKey
 */
function addIntelligences(intelligences, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultIntelligence_1, validationError_1, soiGlobalIds_1, _a, _b, _i, soiGlobalId, result, err_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    defaultIntelligence_1 = DEFAULT_INTELLIGENCE;
                    validationError_1 = [];
                    soiGlobalIds_1 = {};
                    intelligences = intelligences.map(function (intelligence) {
                        // remove data that cannot set by user
                        // Comment: 07/30/2019
                        // delete intelligence.created_at;
                        // delete intelligence.modified_at;
                        // delete intelligence.last_collected_at;
                        // delete intelligence.started_at;
                        // delete intelligence.ended_at;
                        // delete intelligence.status;
                        var err = [];
                        if (!intelligence.globalId) {
                            // comment 07/25/2019 - instead of error, generate an globalid
                            // err.push({
                            //   key: "globalId",
                            //   description: "globalId is undefined."
                            // });
                            intelligence.globalId = utils.generateGlobalId("intelligence");
                            // To avoid same intelligence insert multiple time
                            intelligence._id = intelligence.globalId;
                        }
                        intelligence = _.merge({}, defaultIntelligence_1, intelligence);
                        // Update system information
                        intelligence.system.created = Date.now();
                        intelligence.system.modified = Date.now();
                        intelligence.system.securityKey = securityKey;
                        // Make sure agent type is uppercase
                        intelligence.suitableAgents = intelligence.suitableAgents.map(function (agentType) {
                            return _.toUpper(agentType);
                        });
                        // since just recieve SOI request, so set the state to **ACTIVE**
                        intelligence.soi.state = SOI_STATE.active;
                        var validateResult = utils.validateIntelligence(intelligence);
                        // If it isn't valid
                        if (!validateResult.valid) {
                            validationError_1.push({
                                intelligence: intelligence,
                                error: validateResult.errors
                            });
                        }
                        // Need to update globalId to globalId
                        soiGlobalIds_1[intelligence.soi.globalId] = 1;
                        return intelligence;
                    });
                    if (validationError_1.length) {
                        throw new HTTPError(400, validationError_1, validationError_1, "00064000001");
                    }
                    _a = [];
                    for (_b in soiGlobalIds_1)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    soiGlobalId = _a[_i];
                    return [4 /*yield*/, soisHelpers.getSOI(soiGlobalId)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    logger.debug("SOIs exist!", { soiGlobalIds: soiGlobalIds_1 });
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.addIntelligencesDB(intelligences)];
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
/**
 * @typedef {Object} IntelligencesAndConfig
 * @property {object} agent - Agent Configuration
 * @property {array} intelligences - Intelligences Array
 */
/**
 * Get intelligences by Agent Global ID and Security Key
 *
 * Operation Index - 0005
 *
 * @param {string} agentGid - Agent Global ID
 * @param {string} securityKey - Security Key
 *
 * @returns {IntelligencesAndConfig}
 */
function getIntelligences(agentGid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var agentConfig, agentSecurityKey, intelligences, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // TODO: need to improve intelligences schedule
                    // 1. Think about if a lot of intelligences, how to schedule them
                    // make them can be more efficient
                    // 2. Think about the case that SOI is inactive
                    // avoid UI side send undefined or null as string
                    if (securityKey === 'undefined' || securityKey === 'null') {
                        securityKey = undefined;
                    }
                    logger.debug('getIntelligences->agentGid: %s', agentGid);
                    logger.debug('getIntelligences->securityKey: %s', securityKey);
                    return [4 /*yield*/, agentsHelpers.getAgent(agentGid)];
                case 1:
                    agentConfig = _a.sent();
                    logger.debug('getIntelligences->agentConfig.system.securityKey: %s', agentConfig.system.securityKey);
                    agentSecurityKey = agentConfig.system.securityKey;
                    // avoid UI side send undefined or null as string
                    if (agentSecurityKey === 'undefined' || agentSecurityKey === 'null') {
                        agentSecurityKey = undefined;
                    }
                    // If security key doesn't match, then we assume this agnet doesn't belong to this user
                    // For security issue, don't allow user do this
                    if (_.trim(agentSecurityKey) !== _.trim(securityKey)) {
                        logger.info('getIntelligences, agentConfig.system.securityKey isn\' same with securityKey. ', { 'agentConfig.system.securityKey': agentSecurityKey, securityKey: securityKey });
                        throw new HTTPError(400, null, { agentGlobalId: agentGid, securityKey: securityKey }, "00054000001", agentGid, securityKey);
                    }
                    intelligences = [];
                    agentConfig = utils.omit(agentConfig, ["_id", "securityKey"], ["system"]);
                    // if agent isn't active, then throw an error
                    if (_.toUpper(agentConfig.system.state) !== _.toUpper(AGENT_STATE.active)) {
                        throw new HTTPError(400, null, {
                            agent: agentConfig
                        }, "00054000002", agentGid);
                    }
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.getIntelligencesForAgentDB(agentConfig, securityKey)];
                case 2:
                    intelligences = _a.sent();
                    return [2 /*return*/, intelligences];
                case 3:
                    err_6 = _a.sent();
                    throw err_6;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateIntelligences(content, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var contentMap_1, gids, intelligences, failedIntelligences, intelligenceHistory, i, item, intelligence, passedAgent, result, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    console.log("updateIntelligences -> content: ", content);
                    contentMap_1 = {};
                    gids = content.map(function (item) {
                        contentMap_1[item.globalId] = item;
                        return item.globalId;
                    });
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.getIntelligencesDB(gids, securityKey)];
                case 1:
                    intelligences = _a.sent();
                    if (!intelligences || !intelligences.length) {
                        logger.warn("No intelligences found.", { intelligences: content });
                        return [2 /*return*/, {}];
                    }
                    failedIntelligences = [];
                    intelligenceHistory = [];
                    gids = [];
                    for (i = 0; i < intelligences.length; i++) {
                        item = intelligences[i];
                        intelligence = contentMap_1[item.globalId];
                        // If this intelligence was failed, then increase **failuresNumber**
                        // Any state isn't FINISHED, then think it is failed, need to increase failuresNumber
                        // if failuresNumber is <= max fail number, then let Agent try to collect it again
                        if ((item.system.failuresNumber || 0) < CONFIG.MAX_FAIL_NUMBER_FOR_INTELLIGENCE && _.get(intelligence, "system.state") !== INTELLIGENCE_STATE.finished) {
                            if (!item.system.failuresNumber) {
                                item.system.failuresNumber = 1;
                            }
                            else {
                                item.system.failuresNumber += 1;
                            }
                            // This intelligence need continue to retry
                            failedIntelligences.push({
                                globalId: item.globalId,
                                system: {
                                    modified: Date.now(),
                                    endedAt: Date.now(),
                                    state: _.get(intelligence, 'system.state') || INTELLIGENCE_STATE.failed,
                                    failuresNumber: _.get(item, "system.failuresNumber"),
                                    failuresReason: _.get(intelligence, 'system.failuresReason'),
                                    agent: {
                                        globalId: _.get(intelligence, 'system.agent.globalId'),
                                        type: _.get(intelligence, 'system.agent.type'),
                                        startedAt: _.get(intelligence, 'system.agent.startedAt'),
                                        endedAt: _.get(intelligence, 'system.agent.endedAt')
                                    }
                                }
                            });
                        }
                        else {
                            // This intelligences need to move to intelligence_history
                            gids.push(item.globalId);
                            delete item.id;
                            delete item._id;
                            // if it's successful, then means reach max retry time, to keep why it isn't successful
                            if (_.get(intelligence, "system.state") !== INTELLIGENCE_STATE.finished) {
                                item.system.failuresNumber += 1;
                                item.system.failuresReason = _.get(intelligence, 'system.failuresReason');
                            }
                            item.system.modified = Date.now();
                            item.system.endedAt = Date.now();
                            item.system.state = _.get(intelligence, "system.state", INTELLIGENCE_STATE.finished);
                            if (!item.system.agent) {
                                item.system.agent = {};
                            }
                            passedAgent = contentMap_1[item.globalId].system.agent;
                            item.system.agent.globalId = passedAgent.globalId;
                            item.system.agent.type = passedAgent.type;
                            item.system.agent.startedAt = passedAgent.startedAt;
                            item.system.agent.endedAt = passedAgent.endedAt;
                            intelligenceHistory.push(item);
                        }
                    }
                    if (!failedIntelligences.length) return [3 /*break*/, 3];
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.updateEachIntelligencesDB(failedIntelligences)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: 
                // add it to intelligences_history
                // await insertMany(COLLECTIONS_NAME.intelligencesHistory, intelligences);
                return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.addIntelligenceHistoryDB(intelligenceHistory)];
                case 4:
                    // add it to intelligences_history
                    // await insertMany(COLLECTIONS_NAME.intelligencesHistory, intelligences);
                    _a.sent();
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.deleteIntelligencesDB(gids, securityKey)];
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
    pauseIntelligencesForManagement: pauseIntelligencesForManagement,
    resumeIntelligencesForManagement: resumeIntelligencesForManagement,
    deleteIntelligencesForManagement: deleteIntelligencesForManagement,
    getIntelligencesForManagement: getIntelligencesForManagement,
    addIntelligences: addIntelligences,
    getIntelligences: getIntelligences,
    updateIntelligences: updateIntelligences
};
