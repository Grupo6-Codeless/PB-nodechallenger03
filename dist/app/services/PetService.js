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
const PetRepository_1 = __importDefault(require("../repositories/PetRepository"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const mongoose_1 = require("mongoose");
class PetService {
    update(petId, tutorId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, mongoose_1.isValidObjectId)(tutorId) || !(0, mongoose_1.isValidObjectId)(petId))
                throw new NotFoundError_1.default('Id not valid');
            const query = { _id: tutorId, pets: petId };
            const tutor = yield TutorRepository_1.default.findTutorOfPet(query);
            if (tutor === null)
                throw new NotFoundError_1.default('Not found Tutor or Pet not Exist in Tutor');
            const result = yield PetRepository_1.default.update(petId, payload);
            if (result === null)
                throw new NotFoundError_1.default('Not found Pet');
            return result;
        });
    }
}
exports.default = new PetService();
