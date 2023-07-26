"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const PetController_1 = __importDefault(require("../../app/controllers/PetController"));
const PetPutValidate_1 = __importDefault(require("../../app/middlewares/validations/PetPutValidate"));
const PetPatchValidate_1 = __importDefault(require("../../app/middlewares/validations/PetPatchValidate"));
const router = (0, express_1.Router)();
router.put('/pet/:petId/tutor/:tutorId', PetPutValidate_1.default, PetController_1.default.update);
router.patch('/pet/:petId/tutor/:tutorId', PetPatchValidate_1.default, PetController_1.default.update);
exports.default = router;
