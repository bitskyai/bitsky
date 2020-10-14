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
var _a = require("../../util/constants"), CONFIG = _a.CONFIG, PRODUCER_STATE = _a.PRODUCER_STATE, DEFAULT_PRODUCER = _a.DEFAULT_PRODUCER;
var HTTPError = require("../../util/error").HTTPError;
var Producer_ctrl_1 = require("../../dbController/Producer.ctrl");
var _b = require("../../util/utils"), validateProducerAndUpdateState = _b.validateProducerAndUpdateState, generateGlobalId = _b.generateGlobalId;
// const logger = require("../../util/logger");
/**
 * Check an producer exist or not, if exist return this producer
 * @param {string} gid - Producer global ID
 * @param {string} securityKey - request security key if passed
 * @returns {Object} - producer
 */
function checkProducerExistByGlobalID(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var producer, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Producer_ctrl_1.getProducerByGlobalIdDB(gid, securityKey)];
                case 1:
                    producer = _a.sent();
                    // producer doesn't exist
                    if (!producer) {
                        throw new HTTPError(404, null, { globalId: gid }, "00004040002", gid, securityKey);
                    }
                    return [2 /*return*/, producer];
                case 2:
                    err_1 = _a.sent();
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Register an Producer to BitSky.
 * Follow KISS principle, you need to make sure your **globalId** is unique.
 * Currently, **globalId** is only way for **Producer** Identity.
 * @param {object} Producer - Producer need to be register
 * @param {string} securityKey - The securityKey that previous service send, used to identify who send this request
 *
 * @returns {object}
 */
function registerProducer(producer, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // validate producer
                    // TODO: change to validate based on schema
                    if (!_.get(producer, "name")) {
                        throw new HTTPError(400, null, {}, "00134000001");
                    }
                    // TODO: Think about whether we need to support Dynamic Generate **globalId**.
                    // Comment 07/12/2019: after several time thinking, I think we should automatically generate **globalId**, so I comment this code.
                    // Use globalId to find Producer.
                    // let producerInDB = await findOneByGlobalId(
                    //   COLLECTIONS_NAME.producers,
                    //   producer.globalId,
                    //   {
                    //     projection: {
                    //       globalId: 1
                    //     }
                    //   }
                    // );
                    // // globalId must be unique
                    // if (producerInDB) {
                    //   // globalId already exist
                    //   throw new HTTPError(
                    //     400,
                    //     null,
                    //     {
                    //       globalId: producer.globalId
                    //     },
                    //     "00134000001",
                    //     producer.globalId
                    //   );
                    // }
                    // Delete globalId and _id, both of them should be generated by server side, don't allow user pass
                    delete producer.globalId;
                    delete producer._id;
                    producer.globalId = generateGlobalId("producer");
                    producer.type = _.toUpper(producer.type);
                    // Before validate, default set producer state to DRAFT
                    // producer.state = PRODUCER_STATE.draft;
                    // when create an producer, default version is 1.0.0, the reason of 1.0.0 is because currently Producer Schema version is 1.0.0, make sure the main version is same with schema
                    // producer.version = '1.0.0';
                    producer = _.merge({}, DEFAULT_PRODUCER, producer);
                    // if securityKey exist, then add securityKey to producer
                    if (securityKey) {
                        producer.system[CONFIG.SECURITY_KEY_IN_DB] = securityKey;
                    }
                    producer.system.created = Date.now();
                    producer.system.modified = Date.now();
                    producer.system.lastPing = null;
                    // Validate producer, based on validate result to update producer state, don't allow user to direct change producer state
                    producer = validateProducerAndUpdateState(producer);
                    return [4 /*yield*/, Producer_ctrl_1.addProducerDB(producer)];
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
 * Get a Producer by globalId
 * @param {string} gid - globalId
 *
 * @returns {object}
 */
function getProducer(gid, securityKey, serialId, jobId, requestedWith, type) {
    return __awaiter(this, void 0, void 0, function () {
        var producer, updateProducer_1, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!gid) {
                        throw new HTTPError(400, null, {
                            globalId: gid,
                        }, "00144000001");
                    }
                    return [4 /*yield*/, Producer_ctrl_1.getProducerByGlobalIdDB(gid, securityKey)];
                case 1:
                    producer = _a.sent();
                    if (!producer) {
                        throw new HTTPError(404, null, {
                            globalId: gid,
                        }, "00144040001", gid);
                    }
                    if (type && (_.toUpper(producer.type) !== _.toUpper(type))) {
                        // if pass type, then need to make sure producer type is same with target producer type
                        throw new HTTPError(400, null, {
                            globalId: gid,
                        }, "00144000004", gid, type, producer.type);
                    }
                    // console.log(
                    //   `getProducer, gid: ${gid}, serialId: ${serialId}, jobId: ${jobId}`
                    // );
                    // If pass `serialId` and `serialId` isn't same with `producer.system.serialId`
                    if (producer.system &&
                        producer.system.serialId &&
                        serialId &&
                        producer.system.serialId != serialId) {
                        // This producer was connected
                        throw new HTTPError(403, null, {
                            globalId: gid,
                        }, "00144030001", gid);
                    }
                    updateProducer_1 = {
                        system: {},
                    };
                    if (requestedWith !== CONFIG.REQUESTED_WITH_SUPPLIER_UI) {
                        // if it isn't called by supplier-ui then update last ping, otherwise don't need
                        updateProducer_1.system.lastPing = Date.now();
                    }
                    if (type && serialId && !producer.system.serialId) {
                        // need to update producer serialId, so this means producer was connected, before disconnect, don't allow connect
                        // first producer connect to this
                        // only user pass `type` and `serialId` then update serialId
                        updateProducer_1.system.serialId = serialId;
                    }
                    return [4 /*yield*/, Producer_ctrl_1.updateProducerDB(gid, securityKey, updateProducer_1)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, producer];
                case 3:
                    err_3 = _a.sent();
                    throw err_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * OperationIndex: 0010
 * Get a Producers
 * @param {string} securityKey - current user's security key
 *
 * @returns {object}
 */
function getProducers(securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var producers, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Producer_ctrl_1.getProducersDB(securityKey)];
                case 1:
                    producers = _a.sent();
                    return [2 /*return*/, producers];
                case 2:
                    err_4 = _a.sent();
                    throw err_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateProducer(gid, producer, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var originalProducer, obj, producerState, result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, checkProducerExistByGlobalID(gid, securityKey)];
                case 1:
                    originalProducer = _a.sent();
                    // Remove cannot update fields
                    delete producer._id;
                    delete producer.id;
                    delete producer.globalId;
                    if (producer.system) {
                        delete producer.system.created;
                    }
                    obj = _.merge({}, originalProducer, producer);
                    obj.system.modified = Date.now();
                    producerState = obj.system.state;
                    // Validate producer, based on validate result to update producer state, don't allow user to direct change producer state
                    obj = validateProducerAndUpdateState(obj);
                    // if producer state is **active** or **deleted**, then return error
                    if (_.toUpper(obj.system.state) === _.toUpper(PRODUCER_STATE.active) ||
                        _.toUpper(obj.system.state) === _.toUpper(PRODUCER_STATE.deleted)) {
                        throw new HTTPError(400, null, { globalId: obj.globalId, state: obj.system.state, name: obj.name }, "00015400001", obj.system.state, obj.globalId);
                    }
                    // if state change, then we need to update minor version, otherwise only need to update patch version
                    if (producerState !== obj.system.state) {
                        // this means state change, then need to update minor
                        obj.system.version = semver.inc(obj.system.version || "1.0.0", "minor");
                    }
                    else {
                        obj.system.version = semver.inc(obj.system.version || "1.0.0", "patch");
                    }
                    return [4 /*yield*/, Producer_ctrl_1.updateProducerDB(gid, securityKey, obj)];
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
 * Disconnect an producer
 * 0017
 * @param {string} gid - producer globalId
 * @param {string} securityKey - current user's security key
 */
function disconnectProducer(gid, securityKey, jobId) {
    return __awaiter(this, void 0, void 0, function () {
        var originalProducer, version, updateProducer_2, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, checkProducerExistByGlobalID(gid, securityKey)];
                case 1:
                    originalProducer = _a.sent();
                    version = semver.inc(originalProducer.system.version || "1.0.0", "major");
                    updateProducer_2 = {
                        globalId: generateGlobalId("producer"),
                        system: {
                            serialId: "",
                            version: version,
                            lastPing: 0,
                        },
                    };
                    return [4 /*yield*/, Producer_ctrl_1.updateProducerDB(gid, securityKey, updateProducer_2)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, {
                            globalId: updateProducer_2.globalId,
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
 * Activate an producer
 * 0017
 * @param {string} gid - producer globalId
 * @param {string} securityKey - current user's security key
 */
function activateProducer(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var originalProducer, result, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, checkProducerExistByGlobalID(gid, securityKey)];
                case 1:
                    originalProducer = _a.sent();
                    originalProducer = validateProducerAndUpdateState(originalProducer);
                    // if it is draft state then throw an error
                    if (originalProducer.system.state === PRODUCER_STATE.draft) {
                        throw new HTTPError(400, null, { globalId: gid }, "0017400001");
                    }
                    else if (originalProducer.system.state === PRODUCER_STATE.deleted) {
                        // **delete** then tell user cannot find, since we didn't show deleted producer in user's producer list
                        throw new HTTPError(404, null, { globalId: gid }, "00004040001", gid, securityKey);
                    }
                    else if (originalProducer.system.state === PRODUCER_STATE.active) {
                        // If an producer's state is active, don't need to update it again
                        return [2 /*return*/, {
                                state: originalProducer.system.state,
                            }];
                    }
                    // change state to **active**
                    originalProducer.system.state = _.toUpper(PRODUCER_STATE.active);
                    originalProducer.system.version = semver.inc(originalProducer.system.version || "1.0.0", "minor");
                    return [4 /*yield*/, Producer_ctrl_1.updateProducerDB(gid, securityKey, originalProducer)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, {
                            state: originalProducer.system.state,
                        }];
                case 3:
                    err_7 = _a.sent();
                    throw err_7;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Deactivate an producer
 * @param {string} gid
 * @param {string} securityKey
 */
function deactivateProducer(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var originalProducer, result, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, checkProducerExistByGlobalID(gid, securityKey)];
                case 1:
                    originalProducer = _a.sent();
                    // originalProducer = validateProducerAndUpdateState(originalProducer);
                    // if it is draft state then throw an error
                    if (originalProducer.system.state === PRODUCER_STATE.draft) {
                        throw new HTTPError(400, null, { globalId: gid }, "0018400001");
                    }
                    else if (originalProducer.system.state === PRODUCER_STATE.deleted) {
                        // **delete** then tell user cannot find, since we didn't show deleted producer in user's producer list
                        throw new HTTPError(404, null, { globalId: gid }, "00004040001", gid, securityKey);
                    }
                    else if (originalProducer.system.state != PRODUCER_STATE.active) {
                        // If an producer's state isn't active, don't need to update it again
                        return [2 /*return*/, {
                                state: originalProducer.system.state,
                            }];
                    }
                    // change state to **configured**
                    originalProducer.system.state = _.toUpper(PRODUCER_STATE.configured);
                    originalProducer.system.version = semver.inc(originalProducer.system.version || "1.0.0", "minor");
                    return [4 /*yield*/, Producer_ctrl_1.updateProducerDB(gid, securityKey, originalProducer)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, {
                            state: originalProducer.system.state,
                        }];
                case 3:
                    err_8 = _a.sent();
                    throw err_8;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function unregisterProducer(gid, securityKey) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("gid: ", gid, " securityKey: ", securityKey);
                    // Make sure can find Producer, if cannot, the it will throw 404 error
                    return [4 /*yield*/, checkProducerExistByGlobalID(gid, securityKey)];
                case 1:
                    // Make sure can find Producer, if cannot, the it will throw 404 error
                    _a.sent();
                    return [4 /*yield*/, Producer_ctrl_1.deleteProducerDB(gid, securityKey)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_9 = _a.sent();
                    throw err_9;
                case 4: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    registerProducer: registerProducer,
    getProducer: getProducer,
    updateProducer: updateProducer,
    unregisterProducer: unregisterProducer,
    activateProducer: activateProducer,
    deactivateProducer: deactivateProducer,
    disconnectProducer: disconnectProducer,
    getProducers: getProducers,
};
