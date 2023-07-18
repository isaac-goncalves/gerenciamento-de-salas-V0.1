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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorsController = void 0;
const professoresRepositories_1 = require("../repositories/professoresRepositories");
class ProfessorsController {
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('get professores');
            //grab token
            const token = request.headers.authorization;
            //verify token
            if (!token)
                return response.status(401).json({ message: 'missing token' });
            const [, tokenValue] = token.split(' ');
            try {
                const professores = yield professoresRepositories_1.professoresRepository.find();
                // console.log(JSON.stringify(professores, null, 2));
                const newProfessores = yield professores.map((professor) => {
                    const id = professor.id;
                    const name = professor.name;
                    // console.log(id, name);
                    const obj = {
                        id: id,
                        name: name
                    };
                    return obj;
                });
                // console.log(newProfessores);
                return response.status(200).json(newProfessores);
            }
            catch (error) {
                return response.status(500).json({ message: 'internal server error' });
            }
        });
    }
}
exports.ProfessorsController = ProfessorsController;
