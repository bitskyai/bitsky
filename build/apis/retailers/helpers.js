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
var _a = require("../../util/constants"), CONFIG = _a.CONFIG, DEFAULT_RETAILER = _a.DEFAULT_RETAILER, RETAILER_STATE = _a.RETAILER_STATE;
var HTTPError = require("../../util/error").HTTPError;
var _b = require("../../util/utils"), validateRetailer = _b.validateRetailer, validateRetailerAndUpdateState = _b.validateRetailerAndUpdateState, generateGlobalId = _b.generateGlobalId;
var Retailer_ctrl_1 = require("../../dbController/Retailer.ctrl");
var TaskAndHistory_ctrl_1 = require("../../dbController/TaskAndHistory.ctrl");
var logger = require("../../util/logger");
function checkRetailerExistByGlobalID(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var retailer, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Retailer_ctrl_1.getRetailerByGlobalIdDB(gid, securityKey)];
                case 1:
                    retailer = _a.sent();
                    // retailer doesn't exist
                    if (!retailer) {
                        throw new HTTPError(404, null, { globalId: gid }, "00004040001", gid, securityKey);
                    }
                    return [2 /*return*/, retailer];
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
 * Register a Retailer to DIA.
 * Follow KISS principle, you need to make sure your **globalId** is unique.
 * Currently, **globalId** is only way for **Retailer** Identity.
 * @param {object} retailer - Retailer need to be register
 * @param {string} securityKey - The securityKey that previous service send, used to identify who send this request
 *
 * @returns {object}
 */
function registerRetailer(retailer, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var validateResult, insertOneWriteOpResultObject, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Set default value
                    retailer = _.merge({}, DEFAULT_RETAILER, retailer);
                    // Update system information
                    retailer.system.created = Date.now();
                    retailer.system.modified = Date.now();
                    // if securityKey exist, then add securityKey to retailer
                    if (securityKey) {
                        retailer.system[CONFIG.SECURITY_KEY_IN_DB] = securityKey;
                    }
                    if (!retailer.globalId) {
                        retailer.globalId = generateGlobalId("retailer");
                    }
                    validateResult = validateRetailer(retailer);
                    if (!validateResult.valid) {
                        // Don't allow user to Create/Update an invalid Retailer, this will reduce the complex of maintain tasks
                        throw new HTTPError(422, validateResult.errors, { retailer: retailer }, "00014000002");
                    }
                    return [4 /*yield*/, Retailer_ctrl_1.addRetailerDB(retailer)];
                case 1:
                    insertOneWriteOpResultObject = _a.sent();
                    // After update Retailer, need to update Retailer state
                    return [4 /*yield*/, updateRetailerState(retailer.globalId, retailer)];
                case 2:
                    // After update Retailer, need to update Retailer state
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
 * Get a Retailer by globalId
 * @param {string} gid - globalId
 *
 * @returns {object}
 */
function getRetailer(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var retailer, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!gid) {
                        throw new HTTPError(400, null, {
                            globalId: gid
                        }, "00024000001");
                    }
                    return [4 /*yield*/, Retailer_ctrl_1.getRetailerByGlobalIdDB(gid, securityKey)];
                case 1:
                    retailer = _a.sent();
                    if (!retailer) {
                        throw new HTTPError(404, null, {
                            globalId: gid
                        }, "00024040001", gid);
                    }
                    return [2 /*return*/, retailer];
                case 2:
                    err_3 = _a.sent();
                    throw err_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getRetailer = getRetailer;
/**
 * OperationIndex: 0010
 * Get a Retailers
 * @param {string} securityKey - globalId
 *
 * @returns {object}
 */
function getRetailers(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var retailers, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Retailer_ctrl_1.getRetailersDB(securityKey)];
                case 1:
                    retailers = _a.sent();
                    return [2 /*return*/, retailers];
                case 2:
                    err_4 = _a.sent();
                    throw err_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateRetailer(gid, retailer, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var originalRetailer, obj, result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, checkRetailerExistByGlobalID(gid, securityKey)];
                case 1:
                    originalRetailer = _a.sent();
                    // Remove cannot update fields
                    delete retailer._id;
                    delete retailer.id;
                    delete retailer.globalId;
                    if (retailer.system) {
                        delete retailer.system;
                    }
                    obj = _.merge({}, originalRetailer, retailer);
                    obj.system.modified = Date.now();
                    obj = validateRetailerAndUpdateState(obj);
                    return [4 /*yield*/, Retailer_ctrl_1.updateRetailerDB(gid, securityKey, obj)];
                case 2:
                    result = _a.sent();
                    // After update Retailer, need to update Retailer state
                    return [4 /*yield*/, updateRetailerState(gid, originalRetailer)];
                case 3:
                    // After update Retailer, need to update Retailer state
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
 * Check Retailer Health
 * @param {string} baseURL - Base URL of Retailer server
 * @param {string} method - HTTP method
 * @param {string} url - health path
 *
 * @returns {object} - {status: true/false, reason: err}
 */
function checkRetailerHealth(baseURL, method, url) {
    return __awaiter(this, void 0, void 0, function () {
        var err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // Ping Retailer server
                    return [4 /*yield*/, http({
                            baseURL: baseURL,
                            method: method,
                            url: url
                        })];
                case 1:
                    // Ping Retailer server
                    _a.sent();
                    return [2 /*return*/, {
                            status: true
                        }];
                case 2:
                    err_6 = _a.sent();
                    logger.warn("[checkRetailerHealth] Ping Retailer fail", { err: err_6 });
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
 * Update Retailer state
 * @param {string} gid - Retailer globalId
 * @param {object} originalRetailer - Original Retailer Data
 */
function updateRetailerState(gid, originalRetailer, dontUpdateModified) {
    return __awaiter(this, void 0, void 0, function () {
        var validateResult, state, pingFailReason, retailerHealth, retailerSystemInfo, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!!originalRetailer) return [3 /*break*/, 2];
                    return [4 /*yield*/, getRetailer(gid, null)];
                case 1:
                    originalRetailer = _a.sent();
                    _a.label = 2;
                case 2:
                    validateResult = validateRetailer(originalRetailer);
                    if (!validateResult.valid) {
                        // Don't allow user to Create/Update an invalid Retailer, this will reduce the complex of maintain tasks
                        throw new HTTPError(422, validateResult.errors, { originalRetailer: originalRetailer }, "00014000002");
                    }
                    state = _.toUpper(RETAILER_STATE.failed);
                    pingFailReason = undefined;
                    return [4 /*yield*/, checkRetailerHealth(originalRetailer.baseURL, originalRetailer.health.method, originalRetailer.health.path)];
                case 3:
                    retailerHealth = _a.sent();
                    if (retailerHealth.status) {
                        // Retailer is health
                        state = _.toUpper(RETAILER_STATE.active);
                    }
                    else {
                        state = _.toUpper(RETAILER_STATE.failed);
                        if (typeof retailerHealth.reason === "object") {
                            pingFailReason = JSON.stringify(retailerHealth.reason);
                        }
                        else {
                            pingFailReason = retailerHealth.reason;
                        }
                    }
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.updateTasksRetailerStateForManagementDB(gid, state, dontUpdateModified)];
                case 4:
                    _a.sent();
                    retailerSystemInfo = {
                        system: {
                            state: state,
                            lastPing: Date.now(),
                            pingFailReason: pingFailReason
                        }
                    };
                    if (!dontUpdateModified) {
                        retailerSystemInfo.system.modified = Date.now();
                    }
                    return [4 /*yield*/, Retailer_ctrl_1.updateRetailerDB(gid, null, retailerSystemInfo)];
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
function unregisterRetailer(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    // Make sure can find Retailer, if cannot, the it will throw 404 error
                    return [4 /*yield*/, checkRetailerExistByGlobalID(gid, securityKey)];
                case 1:
                    // Make sure can find Retailer, if cannot, the it will throw 404 error
                    _a.sent();
                    return [4 /*yield*/, TaskAndHistory_ctrl_1.deleteTasksByRetailerForManagementDB(gid, securityKey)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Retailer_ctrl_1.deleteRetailerDB(gid, securityKey)];
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
    registerRetailer: registerRetailer,
    getRetailer: getRetailer,
    updateRetailer: updateRetailer,
    unregisterRetailer: unregisterRetailer,
    updateRetailerState: updateRetailerState,
    getRetailers: getRetailers
};
