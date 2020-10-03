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
var Retailer_1 = require("../entity/Retailer");
var dbConfiguration_1 = require("../util/dbConfiguration");
var logger = require("../util/logger");
var HTTPError = require("../util/error").HTTPError;
function flattenToObject(retailers) {
    function toObject(retailer) {
        if (!retailer) {
            return retailer;
        }
        var obj = {};
        obj.globalId = _.get(retailer, "global_id");
        obj.name = _.get(retailer, "name");
        // obj.description = retailer.description;
        obj.baseURL = _.get(retailer, "base_url");
        if (_.get(retailer, "callback_method")) {
            !obj.callback ? (obj.callback = {}) : "";
            obj.callback.method = retailer.callback_method;
        }
        if (_.get(retailer, "callback_path")) {
            !obj.callback ? (obj.callback = {}) : "";
            obj.callback.path = retailer.callback_path;
        }
        if (_.get(retailer, "health_method")) {
            !obj.health ? (obj.health = {}) : "";
            obj.health.method = retailer.health_method;
        }
        if (_.get(retailer, "health_path")) {
            !obj.health ? (obj.health = {}) : "";
            obj.health.path = retailer.health_path;
        }
        if (_.get(retailer, "system_state")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.state = retailer.system_state;
        }
        if (_.get(retailer, "system_version")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.version = retailer.system_version;
        }
        if (_.get(retailer, "system_security_key")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.securityKey = retailer.system_security_key;
        }
        if (_.get(retailer, "system_created_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.created = retailer.system_created_at;
        }
        if (_.get(retailer, "system_modified_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.modified = retailer.system_modified_at;
        }
        if (_.get(retailer, "system_last_ping")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.lastPing = retailer.system_last_ping;
        }
        if (_.get(retailer, "system_ping_fail_reason")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.pingFailReason = retailer.system_ping_fail_reason;
        }
        return obj;
    }
    if (_.isArray(retailers)) {
        var arr = [];
        for (var i = 0; i < retailers.length; i++) {
            arr.push(toObject(retailers[i]));
        }
        return arr;
    }
    else {
        return toObject(retailers);
    }
}
function objectToRetailer(retailer, retailerInstance) {
    if (!retailerInstance) {
        retailerInstance = new Retailer_1.default();
    }
    if (_.get(retailer, "globalId")) {
        retailerInstance.global_id = retailer.globalId;
    }
    if (_.get(retailer, "name")) {
        retailerInstance.name = retailer.name;
    }
    // if (_.get(retailer, "description")) {
    //   retailerInstance.description = retailer.description;
    // }
    if (_.get(retailer, "baseURL")) {
        retailerInstance.base_url = retailer.baseURL;
    }
    if (_.get(retailer, "callback.method")) {
        retailerInstance.callback_method = retailer.callback.method;
    }
    if (_.get(retailer, "callback.path")) {
        retailerInstance.callback_path = retailer.callback.path;
    }
    if (_.get(retailer, "health.method")) {
        retailerInstance.health_method = retailer.health.method;
    }
    if (_.get(retailer, "health.path")) {
        retailerInstance.health_path = retailer.health.path;
    }
    if (_.get(retailer, "system.state")) {
        retailerInstance.system_state = retailer.system.state;
    }
    if (_.get(retailer, "system.version")) {
        retailerInstance.system_version = retailer.system.version;
    }
    if (_.get(retailer, "system.securityKey")) {
        retailerInstance.system_security_key = retailer.system.securityKey;
    }
    if (_.get(retailer, "system.created")) {
        retailerInstance.system_created_at = retailer.system.created;
    }
    if (_.get(retailer, "system.modified")) {
        retailerInstance.system_modified_at = retailer.system.modified;
    }
    if (_.get(retailer, "system.lastPing")) {
        retailerInstance.system_last_ping = retailer.system.lastPing;
    }
    if (_.get(retailer, "system.pingFailReason")) {
        retailerInstance.system_ping_fail_reason = retailer.system.pingFailReason;
    }
    else {
        retailerInstance.system_ping_fail_reason = '';
    }
    return retailerInstance;
}
function addRetailerDB(retailer) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, retailerInstance, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(Retailer_1.default);
                    retailerInstance = objectToRetailer(retailer, null);
                    return [4 /*yield*/, repo.save(retailerInstance)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, {
                            _id: retailerInstance.id,
                            globalId: retailerInstance.global_id,
                        }];
                case 2:
                    err_1 = _a.sent();
                    error = new HTTPError(500, err_1, {}, "00005000001", "Retailer.ctrl->addRetailerDB");
                    logger.error("addRetailerDB, error:" + error.message, { error: error });
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addRetailerDB = addRetailerDB;
function getRetailersDB(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, retailers, err_2, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(Retailer_1.default);
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    return [4 /*yield*/, repo.find(query)];
                case 1:
                    retailers = _a.sent();
                    retailers = flattenToObject(retailers);
                    return [2 /*return*/, retailers];
                case 2:
                    err_2 = _a.sent();
                    error = new HTTPError(500, err_2, {}, "00005000001", "Retailer.ctrl->getRetailersDB");
                    logger.error("getRetailersDB, error:" + error.message, { error: error });
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getRetailersDB = getRetailersDB;
function getNeedCheckHealthRetailersDB(lastPing, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var retailers, repo, query, retailersQuery, err_3, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    retailers = [];
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(Retailer_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {
                        system_last_ping: {
                            $lt: lastPing,
                        },
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    return [4 /*yield*/, repo.find(query)];
                case 2:
                    retailers = _a.sent();
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, typeorm_1.getRepository(Retailer_1.default)
                        .createQueryBuilder()
                        .where("system_last_ping < :lastPing", {
                        lastPing: lastPing,
                    })];
                case 4:
                    retailersQuery = _a.sent();
                    if (securityKey) {
                        retailersQuery.andWhere("system_security_key = :securityKey", {
                            securityKey: securityKey,
                        });
                    }
                    return [4 /*yield*/, retailersQuery.getMany()];
                case 5:
                    retailers = _a.sent();
                    _a.label = 6;
                case 6:
                    retailers = flattenToObject(retailers);
                    return [2 /*return*/, retailers];
                case 7:
                    err_3 = _a.sent();
                    error = new HTTPError(500, err_3, {}, "00005000001", "Retailer.ctrl->getNeedCheckHealthRetailersDB");
                    logger.error("getNeedCheckHealthRetailersDB, error:" + error.message, { error: error });
                    throw error;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getNeedCheckHealthRetailersDB = getNeedCheckHealthRetailersDB;
function getRetailerByGlobalIdDB(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, retailer, err_4, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(Retailer_1.default);
                    query = {
                        global_id: gid,
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    return [4 /*yield*/, repo.findOne(query)];
                case 1:
                    retailer = _a.sent();
                    retailer = flattenToObject(retailer);
                    return [2 /*return*/, retailer];
                case 2:
                    err_4 = _a.sent();
                    error = new HTTPError(404, err_4, {
                        globalId: gid
                    }, "00004040001", gid, securityKey);
                    logger.error("getRetailerByGlobalIdDB, error:" + error.message, { error: error });
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getRetailerByGlobalIdDB = getRetailerByGlobalIdDB;
function updateRetailerDB(gid, securityKey, retailer) {
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
                    repo = typeorm_1.getRepository(Retailer_1.default);
                    retailer = objectToRetailer(retailer, {});
                    return [4 /*yield*/, repo.update(query, retailer)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_5 = _a.sent();
                    error = new HTTPError(500, err_5, {}, "00005000001", "Retailer.ctrl->updateRetailerDB");
                    logger.error("updateRetailerDB, error:" + error.message, { error: error });
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateRetailerDB = updateRetailerDB;
function deleteRetailerDB(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, result, err_6, error;
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
                    repo = typeorm_1.getRepository(Retailer_1.default);
                    return [4 /*yield*/, repo.delete(query)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_6 = _a.sent();
                    error = new HTTPError(500, err_6, {}, "00005000001", "Retailer.ctrl->deleteRetailerDB");
                    logger.error("deleteRetailerDB, error:" + error.message, { error: error });
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteRetailerDB = deleteRetailerDB;
