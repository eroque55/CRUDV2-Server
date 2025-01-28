import express from "express";

import routesCartao from "./routes/routesCartao";
import Cliente from "./models/Cliente";
import Genero from "./enums/Genero";
import ClienteController from "./controllers/ClienteController";

const app = express();
app.use(express.json());

app.listen(3000, () =>
   console.log("Servidor rodando em: http://localhost:3000")
);

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.use("/cartao", routesCartao);

const cliente = new Cliente();

cliente.Nome = "Fulano";
cliente.DataNascimento = new Date();
cliente.Cpf = "44505306836";
cliente.Email = "dadas@dfsdf";
cliente.Senha = "123456aA@";
cliente.ConfirmacaoSenha = "123456aA@";
cliente.Status = true;
cliente.Genero = Genero.MASCULINO;

async function salvarCliente(cliente: Cliente) {
   try {
      const response = await new ClienteController().salvar(cliente);
      console.log(response);
   } catch (error) {
      console.error(error);
   }
}
