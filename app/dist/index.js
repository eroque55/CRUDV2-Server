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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const http = require("node:http");
const hostname = "127.0.0.1";
const port = 3000;
class Pais {
    constructor(nome, id) {
        this.nome = nome;
        if (id)
            this.id = id;
    }
}
class Estado {
    constructor(nome, pais, id) {
        this.nome = nome;
        this.pais = pais;
        if (id)
            this.id = id;
    }
}
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
    const brasil = new Pais("Brasil", 9);
    const saoPaulo = new Estado("São Paulo", brasil);
    criaE(saoPaulo);
});
function cria(pais) {
    return __awaiter(this, void 0, void 0, function* () {
        const createUser = yield prisma.pais.create({
            data: {
                nome: pais.nome,
            },
        });
        console.log(createUser);
    });
}
function criaE(estado) {
    return __awaiter(this, void 0, void 0, function* () {
        const createUser = yield prisma.estado.create({
            data: {
                nome: estado.nome,
                pais: { connect: { id: estado.pais.id } },
            }
        });
        console.log(createUser);
    });
}
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
