"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
require("./PetSchema");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    date_of_birth: { type: String, required: true },
    zip_code: { type: Number, required: true },
    pets: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Pets',
        },
    ],
}, { versionKey: false });
schema.plugin(mongoose_paginate_v2_1.default);
schema.plugin(mongoose_unique_validator_1.default);
const Tutor = (0, mongoose_1.model)('Tutor', schema, 'Tutors');
exports.default = Tutor;
