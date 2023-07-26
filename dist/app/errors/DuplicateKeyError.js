"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (errors) => {
    errors = errors.map((error) => {
        return `${error} must be unique`;
    });
    return {
        message: 'DuplicateFieldError',
        details: errors,
    };
};
