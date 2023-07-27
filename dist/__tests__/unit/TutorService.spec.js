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
const TutorService_mock_1 = __importDefault(require("./TutorService.mock"));
const TutorService_1 = __importDefault(require("../../app/services/TutorService"));
const TutorRepository_1 = __importDefault(require("../../app/repositories/TutorRepository"));
describe('Unit. Tutor Service', () => {
    describe('Tutor Service.get', () => {
        test('should return statusCode 200 && all tutors response with request correct', () => __awaiter(void 0, void 0, void 0, function* () {
            const TutorGetRepositoryMock = jest
                .spyOn(TutorRepository_1.default, 'get')
                .mockReturnValueOnce(TutorService_mock_1.default.TutorGetRepositoryMock());
            const sut = TutorService_1.default.get;
            const query = { page: 1, limit: 10 };
            const actual = yield sut(query);
            expect(actual).toEqual(TutorService_mock_1.default.TutorGetRepositoryMock());
            expect(TutorGetRepositoryMock).toHaveBeenCalledWith(query.page, query.limit);
        }));
    });
});
