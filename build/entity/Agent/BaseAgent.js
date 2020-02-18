"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var dbConfiguration_1 = require("../../util/dbConfiguration");
var Base_1 = require("../Base");
var Base;
if (dbConfiguration_1.isMongo()) {
    Base = Base_1.BaseMongo;
}
else {
    Base = Base_1.BaseSQL;
}
// This reference to 'schemas/agent.json'
// Will use JSON schema to validation
var BaseAgent = /** @class */ (function (_super) {
    __extends(BaseAgent, _super);
    function BaseAgent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({
            default: true
        }),
        __metadata("design:type", Boolean)
    ], BaseAgent.prototype, "private", void 0);
    __decorate([
        typeorm_1.Column({
            default: 'PRIVATE'
        }),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "permission", void 0);
    __decorate([
        typeorm_1.Column({
            default: 1
        }),
        __metadata("design:type", Number)
    ], BaseAgent.prototype, "concurrent", void 0);
    __decorate([
        typeorm_1.Column({
            default: 30
        }),
        __metadata("design:type", Number)
    ], BaseAgent.prototype, "polling_interval", void 0);
    __decorate([
        typeorm_1.Column({
            default: 5
        }),
        __metadata("design:type", Number)
    ], BaseAgent.prototype, "max_waiting_time", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], BaseAgent.prototype, "max_collect", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], BaseAgent.prototype, "idel_time", void 0);
    __decorate([
        typeorm_1.Column({
            default: 90
        }),
        __metadata("design:type", Number)
    ], BaseAgent.prototype, "timeout", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], BaseAgent.prototype, "max_retry", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "base_url", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "health_method", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "health_path", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "system_state", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "system_version", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "system_security_key", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "system_created_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "system_modified_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseAgent.prototype, "system_last_ping", void 0);
    return BaseAgent;
}(Base));
exports.BaseAgent = BaseAgent;
