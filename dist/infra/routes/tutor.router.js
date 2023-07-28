"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const TutorController_1 = __importDefault(require("../../app/controllers/TutorController"));
const TutorGetValidate_1 = __importDefault(require("../../app/middlewares/validations/TutorGetValidate"));
const router = (0, express_1.Router)();
router.get('/tutors', TutorGetValidate_1.default, TutorController_1.default.get);
router.delete('/tutor/:id', TutorController_1.default.delete);
exports.default = router;
