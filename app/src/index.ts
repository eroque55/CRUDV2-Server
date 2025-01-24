import { IncomingMessage, ServerResponse } from "http";

import { PrismaClient } from "@prisma/client";

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
