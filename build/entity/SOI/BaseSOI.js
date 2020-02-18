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
// This reference to 'schemas/soi.json'
// Will use JSON schema to validation
var BaseSOI = /** @class */ (function (_super) {
    __extends(BaseSOI, _super);
    function BaseSOI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "base_url", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "callback_method", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "callback_path", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "health_method", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "health_path", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "system_state", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "system_version", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "system_security_key", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "system_created_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "system_modified_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "system_last_ping", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseSOI.prototype, "system_ping_fail_reason", void 0);
    return BaseSOI;
}(Base));
exports.BaseSOI = BaseSOI;
