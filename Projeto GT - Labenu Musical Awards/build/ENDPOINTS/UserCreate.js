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
exports.CreateUser = void 0;
const BaseDataBase_1 = require("../Data/BaseDataBase");
const Authenticator_1 = require("../Services/Authenticator");
const hashManeger_1 = require("../Services/hashManeger");
const idGenerator_1 = require("../Services/idGenerator");
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message = "Success!";
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.statusCode = 406;
            message = '"name", "email" and "password" must be provided';
            throw new Error(message);
        }
        const newId = new idGenerator_1.IdGenerator();
        const id = newId.generateId();
        const hashM = new hashManeger_1.HashManager();
        const cypherPassword = yield hashM.hash(password);
        yield (0, BaseDataBase_1.connection)('labook_users')
            .insert({
            id,
            name,
            email,
            password: cypherPassword
        });
        const ALT_DT = new Authenticator_1.Authenticator();
        const token = ALT_DT.generateToken({ id });
        res.status(201).send({ message, token });
    }
    catch (error) {
        res.statusCode = 400;
        let message = error.sqlMessage || error.message;
        res.send({ message });
    }
});
exports.CreateUser = CreateUser;
//# sourceMappingURL=UserCreate.js.map