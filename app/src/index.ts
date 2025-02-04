import express from "express";
import cors from "cors";

import cartaoRoutes from "./routes/Cartao";
import cidadeRoutes from "./routes/Cidade";
import clienteRoutes from "./routes/Cliente";
import enderecoRoutes from "./routes/Endereco";
import estadoRoutes from "./routes/Estado";
import paisRoutes from "./routes/Pais";
import telefoneRoutes from "./routes/Telefone";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(8000, () =>
   console.log("Servidor rodando em: http://localhost:8000")
);

app.use("/cartoes", cartaoRoutes);

app.use("/cidades", cidadeRoutes);

app.use("/clientes", clienteRoutes);

app.use("/enderecos", enderecoRoutes);

app.use("/estados", estadoRoutes);

app.use("/paises", paisRoutes);

app.use("/telefones", telefoneRoutes);
