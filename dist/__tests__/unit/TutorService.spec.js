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
describe('Tutor Service.deleteTutorById', () => {
    test('should return statusCode 204 && empty response with valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock do método delete do repositório para retornar dados simulados
        const TutorDeleteRepositoryMock = jest
            .spyOn(TutorRepository_1.default, 'delete')
            .mockReturnValueOnce(TutorService_mock_1.default.TutorDeleteRepositoryMock());
        const sut = TutorService_1.default.deleteTutorById;
        const validId = 'valid-id';
        const actual = yield sut(validId);
        // Verifica se o resultado retornado é igual ao mock do repositório
        expect(actual).toEqual(TutorService_mock_1.default.TutorDeleteRepositoryMock());
        // Verifica se o método do repositório foi chamado corretamente com o ID válido
        expect(TutorDeleteRepositoryMock).toHaveBeenCalledWith(validId);
    }));
    test('should return statusCode 404 && Tutor not found response with invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock do método delete do repositório para retornar null, indicando que o tutor não foi encontrado
        const TutorDeleteRepositoryMock = jest
            .spyOn(TutorRepository_1.default, 'delete')
            .mockResolvedValueOnce(null);
        const sut = TutorService_1.default.deleteTutorById;
        const invalidId = 'invalid-id';
        const actual = yield sut(invalidId);
        // Verifica se o resultado retornado é null, indicando que o tutor não foi encontrado
        expect(actual).toBeNull();
        // Verifica se o método do repositório foi chamado corretamente com o ID inválido
        expect(TutorDeleteRepositoryMock).toHaveBeenCalledWith(invalidId);
    }));
});
