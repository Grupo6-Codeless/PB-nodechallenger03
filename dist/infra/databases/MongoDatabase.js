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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
class Database {
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongoose_1.default.connect((_a = process.env.MONGO_DB_URL) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017');
            }
            catch (error) {
                console.error('Erro ao conectar ao banco de dados:', error);
                throw error;
            }
        });
    }
}
exports.default = new Database().connect();
