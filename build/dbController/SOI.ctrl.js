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
var SOI_1 = require("../entity/SOI");
var logger = require("../util/logger");
var HTTPError = require("../util/error").HTTPError;
function flattenToObject(sois) {
    function toObject(soi) {
        var obj = {};
        obj.globalId = soi.global_id;
        obj.name = soi.name;
        // obj.description = soi.description;
        obj.baseURL = soi.base_url;
        if (_.get(soi, "callback_method")) {
            !obj.callback ? (obj.callback = {}) : "";
            obj.callback.method = soi.callback_method;
        }
        if (_.get(soi, "callback_path")) {
            !obj.callback ? (obj.callback = {}) : "";
            obj.callback.path = soi.callback_path;
        }
        if (_.get(soi, "health_method")) {
            !obj.health ? (obj.health = {}) : "";
            obj.health.method = soi.health_method;
        }
        if (_.get(soi, "health_path")) {
            !obj.health ? (obj.health = {}) : "";
            obj.health.path = soi.health_path;
        }
        if (_.get(soi, "system_state")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.state = soi.system_state;
        }
        if (_.get(soi, "system_version")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.version = soi.system_version;
        }
        if (_.get(soi, "system_security_key")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.securityKey = soi.system_security_key;
        }
        if (_.get(soi, "system_created_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.created = soi.system_created_at;
        }
        if (_.get(soi, "system_modified_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.modified = soi.system_modified_at;
        }
        if (_.get(soi, "system_last_ping")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.lastPing = soi.system_last_ping;
        }
        if (_.get(soi, "system_ping_fail_reason")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.pingFailReason = soi.system_ping_fail_reason;
        }
        return obj;
    }
    if (_.isArray(sois)) {
        var arr = [];
        for (var i = 0; i < sois.length; i++) {
            arr.push(toObject(sois[i]));
        }
        return arr;
    }
    else {
        return toObject(sois);
    }
}
function objectToSOI(soi, soiInstance) {
    if (!soiInstance) {
        soiInstance = new SOI_1.default();
    }
    if (_.get(soi, "globalId")) {
        soiInstance.global_id = soi.globalId;
    }
    if (_.get(soi, "name")) {
        soiInstance.name = soi.name;
    }
    // if (_.get(soi, "description")) {
    //   soiInstance.description = soi.description;
    // }
    if (_.get(soi, "baseURL")) {
        soiInstance.base_url = soi.baseURL;
    }
    if (_.get(soi, "callback.method")) {
        soiInstance.callback_method = soi.callback.method;
    }
    if (_.get(soi, "callback.path")) {
        soiInstance.callback_path = soi.callback.path;
    }
    if (_.get(soi, "health.method")) {
        soiInstance.health_method = soi.health.method;
    }
    if (_.get(soi, "health.path")) {
        soiInstance.health_path = soi.health.path;
    }
    if (_.get(soi, "system.state")) {
        soiInstance.system_state = soi.system.state;
    }
    if (_.get(soi, "system.version")) {
        soiInstance.system_version = soi.system.version;
    }
    if (_.get(soi, "system.securityKey")) {
        soiInstance.system_security_key = soi.system.securityKey;
    }
    if (_.get(soi, "system.created")) {
        soiInstance.system_created_at = soi.system.created;
    }
    if (_.get(soi, "system.modified")) {
        soiInstance.system_modified_at = soi.system.modified;
    }
    if (_.get(soi, "system.lastPing")) {
        soiInstance.system_last_ping = soi.system.lastPing;
    }
    if (_.get(soi, "system.pingFailReason")) {
        soiInstance.system_ping_fail_reason = soi.system.pingFailReason;
    }
    return soiInstance;
}
function addSOIDB(soi) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, soiInstance, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(SOI_1.default);
                    soiInstance = objectToSOI(soi, null);
                    return [4 /*yield*/, repo.save(soiInstance)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, {
                            _id: soiInstance.id,
                            globalId: soiInstance.global_id
                        }];
                case 2:
                    err_1 = _a.sent();
                    error = new HTTPError(500, err_1, {}, "00005000001", "SOI.ctrl->addSOIDB");
                    logger.error("addSOIDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addSOIDB = addSOIDB;
function getSOIsDB(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, sois, err_2, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(SOI_1.default);
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    return [4 /*yield*/, repo.find(query)];
                case 1:
                    sois = _a.sent();
                    sois = flattenToObject(sois);
                    return [2 /*return*/, sois];
                case 2:
                    err_2 = _a.sent();
                    error = new HTTPError(500, err_2, {}, "00005000001", "SOI.ctrl->getSOIsDB");
                    logger.error("getSOIsDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSOIsDB = getSOIsDB;
function getSOIByGlobalIdDB(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, soi, err_3, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(SOI_1.default);
                    query = {
                        global_id: gid
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    return [4 /*yield*/, repo.findOne(query)];
                case 1:
                    soi = _a.sent();
                    soi = flattenToObject(soi);
                    return [2 /*return*/, soi];
                case 2:
                    err_3 = _a.sent();
                    error = new HTTPError(500, err_3, {}, "00005000001", "SOI.ctrl->getSOIByGlobalIdDB");
                    logger.error("getSOIByGlobalIdDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSOIByGlobalIdDB = getSOIByGlobalIdDB;
function updateSOIDB(gid, securityKey, soi) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, result, err_4, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = {
                        global_id: gid
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    repo = typeorm_1.getRepository(SOI_1.default);
                    soi = objectToSOI(soi, {});
                    return [4 /*yield*/, repo.update(query, soi)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_4 = _a.sent();
                    error = new HTTPError(500, err_4, {}, "00005000001", "SOI.ctrl->updateSOIDB");
                    logger.error("updateSOIDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateSOIDB = updateSOIDB;
function deleteSOIDB(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, result, err_5, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = {
                        global_id: gid
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    repo = typeorm_1.getRepository(SOI_1.default);
                    return [4 /*yield*/, repo.delete(query)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_5 = _a.sent();
                    error = new HTTPError(500, err_5, {}, "00005000001", "SOI.ctrl->deleteSOIDB");
                    logger.error("deleteSOIDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteSOIDB = deleteSOIDB;
