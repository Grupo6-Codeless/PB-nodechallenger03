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
const PetService_1 = __importDefault(require("../services/PetService"));
const DuplicateKeyError_1 = __importDefault(require("../errors/DuplicateKeyError"));
class PetController {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { petId, tutorId } = req.params;
                const result = yield PetService_1.default.update(petId, tutorId, req.body);
                return res.status(200).json(result);
            }
            catch (error) {
                if (error.name === 'ValidationError') {
                    return res
                        .status(400)
                        .json((0, DuplicateKeyError_1.default)(Object.keys(error.errors)));
                }
                if (error.statusCode !== undefined) {
                    return res.status(error.statusCode).json({
                        message: error.name,
                        details: error.message,
                    });
                }
                return res.status(500).json(error);
            }
        });
    }
}
exports.default = new PetController();
