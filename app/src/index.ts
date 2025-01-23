import { IncomingMessage, ServerResponse } from "http";

import { Prisma, PrismaClient } from "@prisma/client";
import { Cartao } from "./Entitys/Cartao";
import { BandeiraCartao } from "./Entitys/BandeiraCartao";
import { CartaoDAO } from "./DAO/CartaoDAO";

const prisma = new PrismaClient();

const http = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;


const cartao = new Cartao(
  5,
  2,
  "123456789",
  "Nome impresso",
  "123",
  "12/2023",
  false,
  BandeiraCartao.DINERS_CLUB
);

teste(cartao);

async function teste(cartao: Cartao) {
  const lista = await new CartaoDAO().selecionar(cartao);
  console.log(lista);
}


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
