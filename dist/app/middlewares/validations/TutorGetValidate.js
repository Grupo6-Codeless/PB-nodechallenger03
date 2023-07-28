"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            page: joi_1.default.number().optional(),
            limit: joi_1.default.number().optional(),
        });
        const { error } = schema.validate(req.query, {
            abortEarly: false,
        });
        if (!(error === undefined))
            throw error;
        next();
    }
    catch (errors) {
        const errorsDetails = [];
        for (const error of errors.details) {
            errorsDetails.push(error.message.replace(/\\/g, '').replace(/"/g, ''));
        }
        res.status(400).json({
            message: errors.name,
            details: errorsDetails,
        });
    }
};
