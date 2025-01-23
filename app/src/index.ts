import { IncomingMessage, ServerResponse } from "http";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const http = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

class Pais {
  id?: number;
  nome: string;
  constructor(nome: string, id?: number) {
    this.nome = nome;
    if (id) this.id = id;
  }
}

class Estado {
  id?: number;
  nome: string;
  pais: Pais;
  constructor(nome: string, pais: Pais, id?: number) {
    this.nome = nome;
    this.pais = pais;
    if (id) this.id = id;
  }
}

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
    const brasil = new Pais("Brasil", 9);
    const saoPaulo = new Estado("São Paulo", brasil);
    criaE(saoPaulo);
  }
);

async function cria(pais: Pais) {
  const createUser = await prisma.pais.create({
    data: {
      nome: pais.nome,
    },
  });
  console.log(createUser);
}

async function criaE(estado: Estado) {
  const createUser = await prisma.estado.create({
    data: {
      nome: estado.nome,
      pais: { connect: { id: estado.pais.id } },
    }
  });
  console.log(createUser);
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
