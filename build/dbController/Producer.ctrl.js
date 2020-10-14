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
var Producer_1 = require("../entity/Producer");
var logger = require("../util/logger");
var HTTPError = require("../util/error").HTTPError;
function flattenToObject(producers) {
    function toObject(producer) {
        var obj = {};
        obj.globalId = producer.global_id;
        obj.type = producer.type;
        obj.name = producer.name;
        obj.description = producer.description;
        obj.private = producer.private;
        obj.permission = producer.permission;
        obj.concurrent = producer.concurrent;
        obj.pollingInterval = producer.polling_interval;
        obj.maxWaitingTime = producer.max_waiting_time;
        obj.maxCollect = producer.max_collect;
        obj.idelTime = producer.idel_time;
        obj.timeout = producer.timeout;
        obj.maxRetry = producer.max_retry;
        obj.baseURL = producer.base_url;
        if (_.get(producer, "health_method")) {
            !obj.health ? (obj.health = {}) : "";
            obj.health.method = producer.health_method;
        }
        if (_.get(producer, "health_path")) {
            !obj.health ? (obj.health = {}) : "";
            obj.health.path = producer.health_path;
        }
        if (_.get(producer, "system_state")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.state = producer.system_state;
        }
        if (_.get(producer, "system_version")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.version = producer.system_version;
        }
        if (_.get(producer, "system_security_key")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.securityKey = producer.system_security_key;
        }
        if (_.get(producer, "system_created_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.created = producer.system_created_at;
        }
        if (_.get(producer, "system_modified_at")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.modified = producer.system_modified_at;
        }
        if (_.get(producer, "system_last_ping")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.lastPing = producer.system_last_ping;
        }
        if (_.get(producer, "system_serial_id")) {
            !obj.system ? (obj.system = {}) : "";
            obj.system.serialId = producer.system_serial_id;
        }
        return obj;
    }
    if (_.isArray(producers)) {
        var arr = [];
        for (var i = 0; i < producers.length; i++) {
            arr.push(toObject(producers[i]));
        }
        return arr;
    }
    else {
        return toObject(producers);
    }
}
/**
 *
 * @param producer{object} - the producer object
 */
function objectToProducer(producer, producerInstance) {
    if (!producerInstance) {
        producerInstance = new Producer_1.default();
    }
    if (_.get(producer, "globalId")) {
        producerInstance.global_id = producer.globalId;
    }
    if (_.get(producer, "type")) {
        producerInstance.type = producer.type;
    }
    if (_.get(producer, "name")) {
        producerInstance.name = producer.name;
    }
    if (_.get(producer, "description")) {
        producerInstance.description = producer.description;
    }
    if (_.get(producer, "private")) {
        producerInstance.private = producer.private;
    }
    if (_.get(producer, "permission")) {
        producerInstance.permission = producer.permission;
    }
    if (_.get(producer, "concurrent")) {
        producerInstance.concurrent = producer.concurrent;
    }
    if (_.get(producer, "pollingInterval")) {
        producerInstance.polling_interval = producer.pollingInterval;
    }
    if (_.get(producer, "maxWaitingTime")) {
        producerInstance.max_waiting_time = producer.maxWaitingTime;
    }
    if (_.get(producer, "maxCollect")) {
        producerInstance.max_collect = producer.maxCollect;
    }
    if (_.get(producer, "idelTime")) {
        producerInstance.idel_time = producer.idelTime;
    }
    if (_.get(producer, "timeout")) {
        producerInstance.timeout = producer.timeout;
    }
    if (_.get(producer, "maxRetry")) {
        producerInstance.max_retry = producer.maxRetry;
    }
    if (_.get(producer, "baseURL")) {
        producerInstance.base_url = producer.baseURL;
    }
    if (_.get(producer, "health.method")) {
        producerInstance.health_method = producer.health.method;
    }
    if (_.get(producer, "health.path")) {
        producerInstance.health_path = producer.health.path;
    }
    if (_.get(producer, "system.state")) {
        producerInstance.system_state = producer.system.state;
    }
    if (_.get(producer, "system.version")) {
        producerInstance.system_version = producer.system.version;
    }
    if (_.get(producer, "system.securityKey")) {
        producerInstance.system_security_key = producer.system.securityKey;
    }
    else {
        if (_.get(producer, "system.securityKey") !== undefined) {
            producerInstance.system_security_key = null;
        }
    }
    if (_.get(producer, "system.created")) {
        producerInstance.system_created_at = producer.system.created;
    }
    else {
        if (_.get(producer, "system.created") !== undefined) {
            producerInstance.system_created_at = null;
        }
    }
    if (_.get(producer, "system.modified")) {
        producerInstance.system_modified_at = producer.system.modified;
    }
    else {
        if (_.get(producer, "system.modified") !== undefined) {
            producerInstance.system_modified_at = null;
        }
    }
    if (_.get(producer, "system.lastPing")) {
        producerInstance.system_last_ping = producer.system.lastPing;
    }
    else {
        if (_.get(producer, "system.lastPing") !== undefined) {
            producerInstance.system_last_ping = null;
        }
    }
    if (_.get(producer, "system.serialId")) {
        producerInstance.system_serial_id = producer.system.serialId;
    }
    else {
        if (_.get(producer, "system.serialId") !== undefined) {
            producerInstance.system_serial_id = null;
        }
    }
    return producerInstance;
}
function addProducerDB(producer) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, producerInstance, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(Producer_1.default);
                    producerInstance = objectToProducer(producer, null);
                    console.log("producerInstance: ", producerInstance);
                    return [4 /*yield*/, repo.save(producerInstance)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, {
                            _id: producerInstance.id,
                            globalId: producerInstance.global_id,
                        }];
                case 2:
                    err_1 = _a.sent();
                    error = new HTTPError(500, err_1, {}, "00005000001", "Producer.ctrl->addProducerDB");
                    logger.error("addProducerDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addProducerDB = addProducerDB;
function getProducersDB(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, producers, err_2, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(Producer_1.default);
                    query = {};
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    return [4 /*yield*/, repo.find(query)];
                case 1:
                    producers = _a.sent();
                    producers = flattenToObject(producers);
                    return [2 /*return*/, producers];
                case 2:
                    err_2 = _a.sent();
                    error = new HTTPError(500, err_2, {}, "00005000001", "Producer.ctrl->getProducersDB");
                    logger.error("getProducersDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProducersDB = getProducersDB;
function getProducerByGlobalIdDB(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, query, producer, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(Producer_1.default);
                    query = {
                        global_id: gid,
                    };
                    if (securityKey) {
                        query.system_security_key = securityKey;
                    }
                    return [4 /*yield*/, repo.findOne(query)];
                case 1:
                    producer = _a.sent();
                    if (!producer) {
                        throw new HTTPError(404, null, { globalId: gid });
                    }
                    producer = flattenToObject(producer);
                    return [2 /*return*/, producer];
                case 2:
                    err_3 = _a.sent();
                    if (!(err_3 instanceof HTTPError)) {
                        err_3 = new HTTPError(500, err_3, {}, "00005000001", "Producer.ctrl->getProducerByGlobalIdDB");
                    }
                    // if(err.statusCode === 404){
                    //   logger.info(`getProducerByGlobalIdDB, cannot find producer by globalId - ${gid}`);
                    // }else{
                    //   logger.error(`getProducerByGlobalIdDB, error: ${err.message}`, {error: err});
                    // }
                    throw err_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProducerByGlobalIdDB = getProducerByGlobalIdDB;
function updateProducerDB(gid, securityKey, producer) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, result, err_4, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!producer || !gid) {
                        // if producer doesn't exist or gid doesn't exist, don't need to update
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
                    repo = typeorm_1.getRepository(Producer_1.default);
                    if (!producer.system) {
                        producer.system = {};
                    }
                    // update last modified
                    producer.system.modified = Date.now();
                    producer = objectToProducer(producer, {});
                    return [4 /*yield*/, repo.update(query, producer)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_4 = _a.sent();
                    error = new HTTPError(500, err_4, {}, "00005000001", "Producer.ctrl->updateProducerDB");
                    logger.error("updateProducerDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateProducerDB = updateProducerDB;
function deleteProducerDB(gid, securityKey) {
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
                    repo = typeorm_1.getRepository(Producer_1.default);
                    return [4 /*yield*/, repo.delete(query)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_5 = _a.sent();
                    error = new HTTPError(500, err_5, {}, "00005000001", "Producer.ctrl->deleteProducerDB");
                    logger.error("deleteProducerDB, error:", error);
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteProducerDB = deleteProducerDB;
