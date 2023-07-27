"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const app = new app_1.default().init();
describe('Integration. Tutor Routes', () => {
    describe('Tutor GET route', () => {
        test('should return statusCode 400 && ValidateError response with query incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = { page: 'ValidateError', limit: 'ValidateError' };
            const { body, statusCode } = yield (0, supertest_1.default)(app).get('/tutors').query(sut);
            expect(statusCode).toBe(400);
            expect(body).toEqual({
                message: 'ValidationError',
                details: ['page must be a number', 'limit must be a number'],
            });
        }));
        test('should return statusCode 200 && all tutors response with request correct', () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = { page: 2, limit: 10 };
            const { body, statusCode } = yield (0, supertest_1.default)(app).get('/tutors').query(sut);
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('docs');
        }));
    });
});
describe('Tutor DELETE route', () => {
    test('should return statusCode 404 && Tutor not found response with invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 'invalid-id';
        const { body, statusCode } = yield (0, supertest_1.default)(app).delete(`/tutors/${invalidId}`);
        expect(statusCode).toBe(404);
        expect(body).toEqual({ error: 'Tutor not found.' });
    }));
    test('should return statusCode 204 && empty response with valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        // Suponha que você tenha um ID válido existente no banco de dados para um tutor
        const validId = 'valid-id';
        const { body, statusCode } = yield (0, supertest_1.default)(app).delete(`/tutors/${validId}`);
        expect(statusCode).toBe(204);
        expect(body).toEqual({});
    }));
});
