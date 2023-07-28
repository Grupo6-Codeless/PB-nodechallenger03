"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    species: { type: String, required: true },
    carry: { type: String, required: true },
    weight: { type: Number, required: true },
    date_of_birth: { type: String, required: true },
}, { versionKey: false });
const Pet = (0, mongoose_1.model)('Pet', schema, 'Pets');
exports.default = Pet;
