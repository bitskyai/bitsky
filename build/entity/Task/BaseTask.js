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
// This reference to 'schemas/task.json'
// Will use JSON schema to validation
var BaseTask = /** @class */ (function (_super) {
    __extends(BaseTask, _super);
    function BaseTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "desciption", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseTask.prototype, "retailer_global_id", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "retailer_state", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "permission", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], BaseTask.prototype, "priority", void 0);
    __decorate([
        typeorm_1.Column("simple-array"),
        __metadata("design:type", Array)
    ], BaseTask.prototype, "suitable_producers", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BaseTask.prototype, "url", void 0);
    __decorate([
        typeorm_1.Column({
            type: "simple-json",
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "metadata", void 0);
    __decorate([
        typeorm_1.Column({
            type: "simple-json",
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "dataset", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "system_state", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "system_security_key", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], BaseTask.prototype, "system_created_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], BaseTask.prototype, "system_modified_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], BaseTask.prototype, "system_started_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], BaseTask.prototype, "system_ended_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "system_producer_global_id", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "system_producer_type", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], BaseTask.prototype, "system_producer_retry_times", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], BaseTask.prototype, "system_producer_started_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], BaseTask.prototype, "system_producer_ended_at", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "system_version", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], BaseTask.prototype, "system_failures_number", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], BaseTask.prototype, "system_failures_reason", void 0);
    return BaseTask;
}(Base));
exports.BaseTask = BaseTask;
