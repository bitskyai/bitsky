"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
// import config from "./config";
var constants = require("./constants");
var getConfig = require("../config").getConfig;
function getDBConfiguration() {
    var configuration;
    // Default use sqlite
    if (!getConfig('TYPEORM_CONNECTION')) {
        configuration = __assign(__assign({}, constants.DEFAULT_DB_CONFIG), constants.DEFAULT_SQLITE);
        configuration.entities = [
            path.join(__dirname, "../entity/**/*.common.js"),
            path.join(__dirname, "../entity/**/*.sql.js"),
            path.join(__dirname, "../entity/**/*.sqlite.js")
        ];
    }
    else {
        // This is a common configuration
        configuration = {
            type: getConfig('TYPEORM_CONNECTION'),
            synchronize: true
        };
        var dbType = "sql";
        configuration = __assign(__assign({}, constants.DEFAULT_DB_CONFIG), configuration);
        if (configuration.type == constants.DEFAULT_SQLITE.type) {
            configuration.database = getConfig('TYPEORM_DATABASE');
            configuration.entities = [
                path.join(__dirname, "../entity/**/*.common.js"),
                path.join(__dirname, "../entity/**/*.sql.js"),
                path.join(__dirname, "../entity/**/*.sqlite.js")
            ];
        }
        else if (configuration.type == constants.DEFAULT_MONGODB.type) {
            dbType = "nosql";
            // https://typeorm.io/#/connection-options/mongodb-connection-options
            // configuration.url = getConfig('TYPEORM_URL');
            // Following set will overwrite parameters set from URL
            if (getConfig('TYPEORM_URL')) {
                configuration.url = getConfig('TYPEORM_URL');
            }
            if (getConfig('TYPEORM_HOST')) {
                configuration.host = getConfig('TYPEORM_HOST');
            }
            if (getConfig('TYPEORM_PORT')) {
                configuration.port = getConfig('TYPEORM_PORT');
            }
            if (getConfig('TYPEORM_DATABASE')) {
                configuration.database = getConfig('TYPEORM_DATABASE');
            }
            if (getConfig('TYPEORM_USERNAME')) {
                configuration.username = getConfig('TYPEORM_USERNAME');
            }
            if (getConfig('TYPEORM_PASSWORD')) {
                configuration.password = getConfig('TYPEORM_PASSWORD');
            }
            configuration.useNewUrlParser = true;
            configuration.useUnifiedTopology = true;
            configuration.entities = [
                path.join(__dirname, "../entity/**/*.common.js"),
                path.join(__dirname, "../entity/**/*." + dbType + ".js"),
                path.join(__dirname, "../entity/**/*." + configuration.type + ".js")
            ];
        }
    }
    return configuration;
}
exports.default = getDBConfiguration;
function getDBType() {
    return getConfig('TYPEORM_CONNECTION') || constants.DEFAULT_SQLITE.type;
}
exports.getDBType = getDBType;
function isMongo() {
    if (getDBType() === constants.DEFAULT_MONGODB.type) {
        return true;
    }
    return false;
}
exports.isMongo = isMongo;
function isSQLite() {
    if (getDBType() === constants.DEFAULT_SQLITE.type) {
        return true;
    }
    return false;
}
exports.isSQLite = isSQLite;
