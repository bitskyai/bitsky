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
var http = require("../../util/http").http;
var _a = require("../../util/constants"), CONFIG = _a.CONFIG, DEFAULT_SOI = _a.DEFAULT_SOI, SOI_STATE = _a.SOI_STATE;
var HTTPError = require("../../util/error").HTTPError;
var _b = require("../../util/utils"), validateSOI = _b.validateSOI, validateSOIAndUpdateState = _b.validateSOIAndUpdateState, generateGlobalId = _b.generateGlobalId;
var SOI_ctrl_1 = require("../../dbController/SOI.ctrl");
var IntelligenceAndHistory_ctrl_1 = require("../../dbController/IntelligenceAndHistory.ctrl");
var logger = require("../../util/logger");
function checkSOIExistByGlobalID(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var soi, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, SOI_ctrl_1.getSOIByGlobalIdDB(gid, securityKey)];
                case 1:
                    soi = _a.sent();
                    // soi doesn't exist
                    if (!soi) {
                        throw new HTTPError(404, null, { globalId: gid }, "00004040001", gid, securityKey);
                    }
                    return [2 /*return*/, soi];
                case 2:
                    err_1 = _a.sent();
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * OperationIndex: 0001
 * Register a SOI to DIA.
 * Follow KISS principle, you need to make sure your **globalId** is unique.
 * Currently, **globalId** is only way for **SOI** Identity.
 * @param {object} soi - SOI need to be register
 * @param {string} securityKey - The securityKey that previous service send, used to identify who send this request
 *
 * @returns {object}
 */
function registerSOI(soi, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var validateResult, insertOneWriteOpResultObject, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Set default value
                    soi = _.merge({}, DEFAULT_SOI, soi);
                    // Update system information
                    soi.system.created = Date.now();
                    soi.system.modified = Date.now();
                    // if securityKey exist, then add securityKey to soi
                    if (securityKey) {
                        soi.system[CONFIG.SECURITY_KEY_IN_DB] = securityKey;
                    }
                    if (!soi.globalId) {
                        soi.globalId = generateGlobalId("soi");
                    }
                    validateResult = validateSOI(soi);
                    if (!validateResult.valid) {
                        // Don't allow user to Create/Update an invalid SOI, this will reduce the complex of maintain intelligences
                        throw new HTTPError(422, validateResult.errors, { soi: soi }, "00014000002");
                    }
                    return [4 /*yield*/, SOI_ctrl_1.addSOIDB(soi)];
                case 1:
                    insertOneWriteOpResultObject = _a.sent();
                    // After update SOI, need to update SOI state
                    return [4 /*yield*/, updateSOIState(soi.globalId, soi)];
                case 2:
                    // After update SOI, need to update SOI state
                    _a.sent();
                    return [2 /*return*/, {
                            _id: insertOneWriteOpResultObject._id,
                            globalId: insertOneWriteOpResultObject.globalId
                        }];
                case 3:
                    err_2 = _a.sent();
                    // Already HTTPError, then throw it
                    throw err_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * OperationIndex: 0002
 * Get a SOI by globalId
 * @param {string} gid - globalId
 *
 * @returns {object}
 */
function getSOI(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var soi, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!gid) {
                        throw new HTTPError(400, null, {
                            globalId: gid
                        }, "00024000001");
                    }
                    return [4 /*yield*/, SOI_ctrl_1.getSOIByGlobalIdDB(gid, securityKey)];
                case 1:
                    soi = _a.sent();
                    if (!soi) {
                        throw new HTTPError(404, null, {
                            globalId: gid
                        }, "00024040001", gid);
                    }
                    return [2 /*return*/, soi];
                case 2:
                    err_3 = _a.sent();
                    throw err_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSOI = getSOI;
/**
 * OperationIndex: 0010
 * Get a SOIs
 * @param {string} securityKey - globalId
 *
 * @returns {object}
 */
function getSOIs(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var sois, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, SOI_ctrl_1.getSOIsDB(securityKey)];
                case 1:
                    sois = _a.sent();
                    return [2 /*return*/, sois];
                case 2:
                    err_4 = _a.sent();
                    throw err_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateSOI(gid, soi, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var originalSoi, obj, result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, checkSOIExistByGlobalID(gid, securityKey)];
                case 1:
                    originalSoi = _a.sent();
                    // Remove cannot update fields
                    delete soi._id;
                    delete soi.id;
                    delete soi.globalId;
                    if (soi.system) {
                        delete soi.system;
                    }
                    obj = _.merge({}, originalSoi, soi);
                    obj.system.modified = Date.now();
                    obj = validateSOIAndUpdateState(obj);
                    return [4 /*yield*/, SOI_ctrl_1.updateSOIDB(gid, securityKey, obj)];
                case 2:
                    result = _a.sent();
                    // After update SOI, need to update SOI state
                    return [4 /*yield*/, updateSOIState(gid, originalSoi)];
                case 3:
                    // After update SOI, need to update SOI state
                    _a.sent();
                    return [2 /*return*/, result];
                case 4:
                    err_5 = _a.sent();
                    throw err_5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Check SOI Health
 * @param {string} baseURL - Base URL of SOI server
 * @param {string} method - HTTP method
 * @param {string} url - health path
 *
 * @returns {object} - {status: true/false, reason: err}
 */
function checkSOIHealth(baseURL, method, url) {
    return __awaiter(this, void 0, void 0, function () {
        var err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // Ping SOI server
                    return [4 /*yield*/, http({
                            baseURL: baseURL,
                            method: method,
                            url: url
                        })];
                case 1:
                    // Ping SOI server
                    _a.sent();
                    return [2 /*return*/, {
                            status: true
                        }];
                case 2:
                    err_6 = _a.sent();
                    logger.warn("[checkSOIHealth] Ping SOI fail", { err: err_6 });
                    return [2 /*return*/, {
                            status: false,
                            reason: err_6
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Update SOI state
 * @param {string} gid - SOI globalId
 * @param {object} originalSoi - Original SOI Data
 */
function updateSOIState(gid, originalSoi, dontUpdateModified) {
    return __awaiter(this, void 0, void 0, function () {
        var validateResult, state, pingFailReason, soiHealth, soiSystemInfo, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!!originalSoi) return [3 /*break*/, 2];
                    return [4 /*yield*/, getSOI(gid, null)];
                case 1:
                    originalSoi = _a.sent();
                    _a.label = 2;
                case 2:
                    validateResult = validateSOI(originalSoi);
                    if (!validateResult.valid) {
                        // Don't allow user to Create/Update an invalid SOI, this will reduce the complex of maintain intelligences
                        throw new HTTPError(422, validateResult.errors, { originalSoi: originalSoi }, "00014000002");
                    }
                    state = _.toUpper(SOI_STATE.failed);
                    pingFailReason = undefined;
                    return [4 /*yield*/, checkSOIHealth(originalSoi.baseURL, originalSoi.health.method, originalSoi.health.path)];
                case 3:
                    soiHealth = _a.sent();
                    if (soiHealth.status) {
                        // SOI is health
                        state = _.toUpper(SOI_STATE.active);
                    }
                    else {
                        state = _.toUpper(SOI_STATE.failed);
                        if (typeof soiHealth.reason === "object") {
                            pingFailReason = JSON.stringify(soiHealth.reason);
                        }
                        else {
                            pingFailReason = soiHealth.reason;
                        }
                    }
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.updateIntelligencesSOIStateForManagementDB(gid, state, dontUpdateModified)];
                case 4:
                    _a.sent();
                    soiSystemInfo = {
                        system: {
                            state: state,
                            lastPing: Date.now(),
                            pingFailReason: pingFailReason
                        }
                    };
                    if (!dontUpdateModified) {
                        soiSystemInfo.system.modified = Date.now();
                    }
                    return [4 /*yield*/, SOI_ctrl_1.updateSOIDB(gid, null, soiSystemInfo)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, {
                            state: state,
                            reason: pingFailReason
                        }];
                case 6:
                    err_7 = _a.sent();
                    throw err_7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function unregisterSOI(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    // Make sure can find SOI, if cannot, the it will throw 404 error
                    return [4 /*yield*/, checkSOIExistByGlobalID(gid, securityKey)];
                case 1:
                    // Make sure can find SOI, if cannot, the it will throw 404 error
                    _a.sent();
                    return [4 /*yield*/, IntelligenceAndHistory_ctrl_1.deleteIntelligencesBySOIForManagementDB(gid, securityKey)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, SOI_ctrl_1.deleteSOIDB(gid, securityKey)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 4:
                    err_8 = _a.sent();
                    throw err_8;
                case 5: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    registerSOI: registerSOI,
    getSOI: getSOI,
    updateSOI: updateSOI,
    unregisterSOI: unregisterSOI,
    updateSOIState: updateSOIState,
    getSOIs: getSOIs
};
