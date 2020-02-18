"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfiguration_1 = require("../../util/dbConfiguration");
var ServerInformation_mongodb_1 = require("./ServerInformation.mongodb");
var ServerInformation_sql_1 = require("./ServerInformation.sql");
var ServerInformation;
if (dbConfiguration_1.isMongo()) {
    ServerInformation = ServerInformation_mongodb_1.ServerInformation;
}
else {
    ServerInformation = ServerInformation_sql_1.ServerInformation;
}
exports.default = ServerInformation;
