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
const client_1 = require("@prisma/client");
const ClienteController_1 = __importDefault(require("./controllers/ClienteController"));
const Telefone_1 = __importDefault(require("./models/Telefone"));
const TipoTelefone_1 = __importDefault(require("./enums/TipoTelefone"));
const prisma = new client_1.PrismaClient();
const http = require("node:http");
const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
});
server.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
function executar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const telefone = new Telefone_1.default();
            telefone.Ddd = "11";
            telefone.Numero = "999999999";
            telefone.Tipo = TipoTelefone_1.default.CELULAR;
            telefone.ClienteId = 1;
            const resultado = yield new ClienteController_1.default().salvar(telefone);
            console.log("Salvo com sucesso:", resultado);
        }
        catch (erro) {
            console.log(erro.message);
        }
    });
}
