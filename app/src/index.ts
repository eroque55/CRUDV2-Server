import { IncomingMessage, ServerResponse } from "http";

import { PrismaClient } from "@prisma/client";

import ClienteController from "./controllers/ClienteController";
import Endereco from "./models/Endereco";
import TipoEndereco from "./enums/TipoEndereco";
import TipoLogradouro from "./enums/TipoLogradouro";
import TipoResidencia from "./enums/TipoResidencia";
import Telefone from "./models/Telefone";
import TipoTelefone from "./enums/TipoTelefone";

const prisma = new PrismaClient();

const http = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(
   (req: IncomingMessage, res: ServerResponse) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello, World!\n");
   }
);

server.listen(port, hostname, () => {
   console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

async function executar() {
   try {
      const telefone = new Telefone();
      telefone.Ddd = "11";
      telefone.Numero = "999999999";
      telefone.Tipo = TipoTelefone.CELULAR;
      telefone.ClienteId = 1;

      const resultado = await new ClienteController().salvar(telefone);
      console.log("Salvo com sucesso:", resultado);
   } catch (erro: any) {
      console.log(erro.message);
   }
}
