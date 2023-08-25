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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// import { usersRepository } from "../repositories/dia_da_semanaRepositories";
const usuariosRepository_1 = require("../repositories/usuariosRepository");
const alunosRepository_1 = require("../repositories/alunosRepository");
const professoresRepositories_1 = require("../repositories/professoresRepositories");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const disciplinasRepositories_1 = require("../repositories/disciplinasRepositories");
class UserController {
    create(request, response) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { name, surname, email, password, role, semester, discipline } = request.body;
            // console.log(name, surname, email, password, role, semester, discipline)
            if (!email || !password) {
                return response
                    .status(400)
                    .json({ error: 'Email or password is missing' });
            }
            try {
                const userExists = yield usuariosRepository_1.usuariosRepository.findOneBy({ email });
                if (userExists) {
                    // console.log('user already exists')
                    return response.status(400).json({ error: 'User already exists' });
                }
                const encriptedPassword = yield bcrypt_1.default.hash(password, 8);
                const newUser = usuariosRepository_1.usuariosRepository.create({
                    email,
                    password: encriptedPassword,
                    role: role
                });
                const savedUser = yield usuariosRepository_1.usuariosRepository.save(newUser); //essa parte me preocupa
                // console.log(savedUser)
                if (role === 'aluno') {
                    // console.log('aluno selected')
                    const newAluno = yield alunosRepository_1.alunosRepository.create({
                        name,
                        surname,
                        email,
                        semestre: semester,
                        user_id: savedUser.id,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                    yield alunosRepository_1.alunosRepository.save(newAluno);
                    // console.log(newAluno)
                    const token = jsonwebtoken_1.default.sign({ id: savedUser.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', {
                        expiresIn: '8h'
                    });
                    return response.status(201).json({
                        message: 'Aluno created',
                        userData: newAluno,
                        token: token
                    });
                }
                else if (role === 'professor') {
                    // console.log('professor selected')
                    const obj = {
                        name,
                        surname,
                        email,
                        semestre: semester,
                        disciplina: discipline,
                        user_id: savedUser.id,
                        created_at: new Date(),
                        updated_at: new Date()
                    };
                    const newProfessor = yield professoresRepositories_1.professoresRepository.create(obj);
                    const savedProfessor = yield professoresRepositories_1.professoresRepository.save(newProfessor);
                    // console.log(savedProfessor)
                    const token = jsonwebtoken_1.default.sign({ id: savedUser.id }, (_b = process.env.JWT_PASS) !== null && _b !== void 0 ? _b : '', {
                        expiresIn: '8h'
                    });
                    return response.status(201).json({
                        message: 'Professor created',
                        userData: savedProfessor,
                        token: token
                    });
                }
                else if (role === 'coordenador') {
                    // console.log('coordenador selected')
                    return response.status(201).json({
                        message: 'Coordenador created',
                        userData: {
                            name,
                            surname,
                            email,
                            password,
                            role,
                            discipline
                        }
                    });
                }
                else {
                    return response.status(400).json({ error: 'Role is missing' });
                }
            }
            catch (error) {
                // console.log(error)
                return response.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    verify(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('verify')
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                return response
                    .status(400)
                    .json({ error: 'Authorization header is missing' });
            }
            const [, token] = authHeader.split(' ');
            if (!token) {
                return response.status(400).json({ error: 'Token is missing' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
                // console.log(decoded.id)
                // uncomment the following lines once you have a working user repository
                const userExists = yield usuariosRepository_1.usuariosRepository.findOneBy({ id: decoded.id });
                if (!userExists) {
                    return response.status(400).json({ error: 'User does not exist' });
                }
                return response.status(200).json({ message: 'User verified' });
            }
            catch (error) {
                // console.log('error' + error)
                if (error == 'TokenExpiredError: jwt expired') {
                    return response.status(400).json({ error: 'Token expired' });
                }
                if (error == 'JsonWebTokenError: invalid signature') {
                    return response.status(400).json({ error: 'Invalid token' });
                }
                return response.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    verifyVoid(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('verifyVOIDED')
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                return response
                    .status(400)
                    .json({ error: 'Authorization header is missing' });
            }
            const [, token] = authHeader.split(' ');
            if (!token) {
                return response.status(400).json({ error: 'Token is missing' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
                // console.log(decoded.id)
                // uncomment the following lines once you have a working user repository
                const userExists = yield usuariosRepository_1.usuariosRepository.findOneBy({ id: decoded.id });
                if (!userExists) {
                    return response.status(400).json({ error: 'User does not exist' });
                }
                else {
                    // console.log('user exists')
                    //go to next function in the route
                    next();
                }
            }
            catch (error) {
                // console.log('error' + error)
                if (error == 'TokenExpiredError: jwt expired') {
                    return response.status(400).json({ error: 'Token expired' });
                }
                if (error == 'JsonWebTokenError: invalid signature') {
                    return response.status(400).json({ error: 'Invalid token' });
                }
                return response.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    login(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            // console.log(email, password)
            // console.log('----------------------------')
            if (!email || !password) {
                return response
                    .status(400)
                    .json({ error: 'email or password is missing' });
            }
            try {
                const userExists = yield usuariosRepository_1.usuariosRepository.findOneBy({ email });
                if (!userExists) {
                    return response.status(400).json({ error: 'E-mail ou senha inválidos' });
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, userExists.password);
                if (!passwordMatch) {
                    return response.status(400).json({ error: 'E-mail ou senha inválidos' });
                }
                const token = jsonwebtoken_1.default.sign({ id: userExists.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', {
                    expiresIn: '8h'
                });
                // console.log(userExists.email)
                // console.log(userExists.role)
                let userData = {};
                if (userExists.role === 'aluno') {
                    const aluno = yield alunosRepository_1.alunosRepository.findOneBy({
                        //caso o usuario seja um aluno, busca o aluno no banco de dados
                        user_id: userExists.id
                    });
                    // console.log('aluno=')
                    // console.log(aluno)
                    userData = aluno;
                }
                else if (userExists.role === 'professor') {
                    const professor = yield professoresRepositories_1.professoresRepository.findOneBy({
                        //caso o usuario seja um professor, busca o professor no banco de dados
                        user_id: userExists.id
                    });
                    // console.log('professor=')
                    // console.log(professor)
                    userData = professor;
                    const { disciplina } = userData, restUserData = __rest(userData, ["disciplina"]);
                    const disciplinaObj = yield disciplinasRepositories_1.disciplinasRepository.findOneBy({
                        id: disciplina
                    });
                    // console.log(disciplinaObj)
                    const returnObj = Object.assign(Object.assign({}, restUserData), { nomeDisciplina: disciplinaObj === null || disciplinaObj === void 0 ? void 0 : disciplinaObj.descricao });
                    return response.status(201).json({
                        userData: returnObj,
                        token: token
                    });
                }
                else {
                    // console.log('role nao encontrado')
                    return response.status(400).json({ error: 'Role nao encontrado' }); //caso o usuario nao seja nem professor nem aluno, retorna erro
                }
                userData.role = userExists.role;
                return response.status(201).json({
                    userData: userData,
                    token: token
                });
            }
            catch (error) {
                // console.log(error)
                return response.status(500).json({ message: 'internal server error' });
            }
        });
    }
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('get usuários')
            try {
                const usuarios = yield usuariosRepository_1.usuariosRepository.find();
                // console.log(JSON.stringify(usuarios, null, 2))
                return response.status(200).json(usuarios);
            }
            catch (error) {
                return response.status(500).json({ message: 'internal server error' });
            }
        });
    }
    getAlunos(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('get Alunos')
            try {
                const usuarios = yield alunosRepository_1.alunosRepository.find();
                // console.log(JSON.stringify(usuarios, null, 2))
                return response.status(200).json(usuarios);
            }
            catch (error) {
                return response.status(500).json({ message: 'internal server error' });
            }
        });
    }
    getProfessores(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('get Professores')
            try {
                const usuarios = yield professoresRepositories_1.professoresRepository.find();
                // console.log(JSON.stringify(usuarios, null, 2))
                return response.status(200).json(usuarios);
            }
            catch (error) {
                return response.status(500).json({ message: 'internal server error' });
            }
        });
    }
}
exports.UserController = UserController;
