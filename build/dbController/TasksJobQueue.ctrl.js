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
var typeorm_1 = require("typeorm");
var TasksJobQueue_1 = require("../entity/TasksJobQueue");
var logger = require("../util/logger");
var getConfig = require("../config").getConfig;
var HTTPError = require("../util/error").HTTPError;
var dbConfiguration_1 = require("../util/dbConfiguration");
function addATaskJob(globalId, agentGlobalId) {
    return __awaiter(this, void 0, void 0, function () {
        var repo, job, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    repo = typeorm_1.getRepository(TasksJobQueue_1.default);
                    return [4 /*yield*/, repo.save({
                            global_id: globalId,
                            agent_global_id: agentGlobalId,
                        })];
                case 1:
                    job = _a.sent();
                    return [2 /*return*/, job];
                case 2:
                    err_1 = _a.sent();
                    error = new HTTPError(500, err_1, {}, "00005000001", "TasksJobQueue.ctrl->addATaskJob");
                    logger.error("addATaskJob, error:" + error.message, { error: error });
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addATaskJob = addATaskJob;
function getTopTaskJob() {
    return __awaiter(this, void 0, void 0, function () {
        var repo, job, query, err_2, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    repo = void 0;
                    job = void 0;
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(TasksJobQueue_1.default)];
                case 1:
                    repo = _a.sent();
                    query = {
                        $query: {},
                        $orderby: { created_at: 1, _id: 1 },
                    };
                    return [4 /*yield*/, repo.findOne(query)];
                case 2:
                    job = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, typeorm_1.getRepository(TasksJobQueue_1.default)
                        .createQueryBuilder()
                        .orderBy({
                        created_at: "ASC",
                        id: "ASC",
                    })
                        .getOne()];
                case 4:
                    job = _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, job];
                case 6:
                    err_2 = _a.sent();
                    error = new HTTPError(500, err_2, {}, "00005000001", "TasksJobQueue.ctrl->getTopTaskJob");
                    logger.error("getTopTaskJob, error:" + error.message, { error: error });
                    throw error;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getTopTaskJob = getTopTaskJob;
function removeTimeoutJob() {
    return __awaiter(this, void 0, void 0, function () {
        var timeoutCreatedAt, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    timeoutCreatedAt = Date.now() - getConfig("TASK_JOB_TIMEOUT") * 1.1;
                    timeoutCreatedAt = new Date(timeoutCreatedAt).toISOString();
                    logger.info("Remove all task jobs created before " + timeoutCreatedAt, {
                        function: "removeTimeoutJob",
                    });
                    if (!dbConfiguration_1.isMongo()) return [3 /*break*/, 2];
                    return [4 /*yield*/, typeorm_1.getMongoRepository(TasksJobQueue_1.default).deleteMany({
                            created_at: {
                                $lt: new Date(timeoutCreatedAt),
                            },
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, typeorm_1.getRepository(TasksJobQueue_1.default)
                        .createQueryBuilder()
                        .delete()
                        .where("created_at < :timeoutCreatedAt", { timeoutCreatedAt: timeoutCreatedAt })
                        .execute()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_3 = _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.removeTimeoutJob = removeTimeoutJob;
function removeTaskJob(globalId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, repo, result, err_4, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = {
                        global_id: globalId,
                    };
                    repo = typeorm_1.getRepository(TasksJobQueue_1.default);
                    return [4 /*yield*/, repo.delete(query)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_4 = _a.sent();
                    error = new HTTPError(500, err_4, {}, "00005000001", "TasksJobQueue.ctrl->removeTaskJob");
                    logger.error("removeTaskJob, error:" + error.message, { error: error });
                    throw error;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.removeTaskJob = removeTaskJob;
