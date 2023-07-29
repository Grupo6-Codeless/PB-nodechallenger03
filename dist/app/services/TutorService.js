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
const TutorRepository_1 = __importDefault(require("../repositories/TutorRepository"));
class TutorService {
    get(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = payload;
            let validatePage;
            let validateLimit;
            if (typeof page === 'string') {
                validatePage = Number(page);
            }
            else {
                validatePage = 1;
            }
            if (typeof limit === 'string') {
                validateLimit = Number(limit);
            }
            else {
                validateLimit = 10;
            }
            const tutors = yield TutorRepository_1.default.get(validatePage, validateLimit);
            return tutors;
        });
    }
    deleteTutorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTutor = yield TutorRepository_1.default.delete({ id });
                return deletedTutor;
            }
            catch (error) {
                console.error('Error deleting tutor:', error);
                throw new Error('Error deleting tutor.');
            }
        });
    }
}
exports.default = new TutorService();