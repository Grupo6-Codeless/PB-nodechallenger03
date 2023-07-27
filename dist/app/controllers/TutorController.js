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
const TutorService_1 = __importDefault(require("../services/TutorService"));
class TutorController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield TutorService_1.default.get(req.query);
                return res.status(200).json(result);
            }
            catch (error) {
                if (!(error.statusCode === undefined)) {
                    return res.status(error.statusCode).json({
                        message: error.name,
                        details: error.message,
                    });
                }
                return res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedTutor = yield TutorService_1.default.deleteTutorById(id);
                if (deletedTutor) {
                    return res.status(204).json();
                }
                else {
                    return res.status(404).json({ error: 'Tutor não encontrado.' });
                }
            }
            catch (error) {
                console.error('Erro ao deletar o tutor:', error);
                return res.status(500).json({ error: 'Erro ao deletar o tutor.' });
            }
        });
    }
}
exports.default = new TutorController();
