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
const PetService_mock_1 = __importDefault(require("./PetService.mock"));
const TutorService_mock_1 = __importDefault(require("./TutorService.mock"));
const PetService_1 = __importDefault(require("../../app/services/PetService"));
const PetRepository_1 = __importDefault(require("../../app/repositories/PetRepository"));
const TutorRepository_1 = __importDefault(require("../../app/repositories/TutorRepository"));
const NotFoundError_1 = __importDefault(require("../../app/errors/NotFoundError"));
describe('Unit. Pet Service', () => {
    describe('Pet Service.get', () => {
        test('should return statusCode 404 && NotfoundTutor with request params incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = PetService_1.default.update;
            const body = {
                name: 'Akamaru',
                species: 'dog',
                carry: 'p',
                weight: 10,
                date_of_birth: '1993-12-12 10:10',
            };
            const petId = 'IdNotValid';
            const tutorId = 'IdNotValid';
            try {
                yield sut(petId, tutorId, body);
            }
            catch (error) {
                expect(error).toBeInstanceOf(NotFoundError_1.default);
                expect(error.name).toBe('Not Found Error');
                expect(error.message).toBe('Id not valid');
            }
        }));
        test('should return statusCode 404 && NotfoundTutor or PetNotExistTutor errors with request incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            jest
                .spyOn(PetRepository_1.default, 'update')
                .mockReturnValueOnce(PetService_mock_1.default.PetUpdateRepositoryMockRequestCorrect());
            jest
                .spyOn(TutorRepository_1.default, 'findTutorOfPet')
                .mockReturnValueOnce(Promise.resolve(null));
            const sut = PetService_1.default.update;
            const body = {
                name: 'Akamaru',
                species: 'dog',
                carry: 'p',
                weight: 10,
                date_of_birth: '1993-12-12 10:10',
            };
            const petId = '64a34a8ff0e6d55acba1d5b8';
            const tutorId = '64a32d48df2eaccf95fee709';
            try {
                yield sut(petId, tutorId, body);
            }
            catch (error) {
                expect(error).toBeInstanceOf(NotFoundError_1.default);
                expect(error.name).toBe('Not Found Error');
                expect(error.message).toBe('Not found Tutor or Pet not Exist in Tutor');
            }
        }));
        test('should return statusCode 200 && updated pet response with request correct', () => __awaiter(void 0, void 0, void 0, function* () {
            const PetUpdateRepositoryMock = jest
                .spyOn(PetRepository_1.default, 'update')
                .mockReturnValueOnce(PetService_mock_1.default.PetUpdateRepositoryMockRequestCorrect());
            const TutorFindTutorOfPetRepositoryMock = jest
                .spyOn(TutorRepository_1.default, 'findTutorOfPet')
                .mockReturnValueOnce(TutorService_mock_1.default.TutorFindTutorOfPetRepositoryMockRequestCorrect());
            const sut = PetService_1.default.update;
            const body = {
                name: 'Akamaru',
                species: 'dog',
                carry: 'p',
                weight: 10,
                date_of_birth: '1993-12-12 10:10',
            };
            const petId = '64a34a8ff0e6d55acba1d5b8';
            const tutorId = '64a32d48df2eaccf95fee709';
            const actual = yield sut(petId, tutorId, body);
            expect(actual).toEqual(PetService_mock_1.default.PetUpdateRepositoryMockRequestCorrect());
            expect(PetUpdateRepositoryMock).toHaveBeenCalledWith(petId, body);
            expect(TutorFindTutorOfPetRepositoryMock).toHaveBeenCalledWith({
                _id: tutorId,
                pets: petId,
            });
        }));
    });
});
