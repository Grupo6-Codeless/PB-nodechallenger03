"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tutor_router_1 = __importDefault(require("./tutor.router"));
const pet_router_1 = __importDefault(require("./pet.router"));
exports.default = [tutor_router_1.default, pet_router_1.default];
