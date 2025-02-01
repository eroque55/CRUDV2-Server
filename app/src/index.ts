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

app.use("/cartao", cartaoRoutes);

app.use("/cidade", cidadeRoutes);

app.use("/cliente", clienteRoutes);

app.use("/endereco", enderecoRoutes);

app.use("/estado", estadoRoutes);

app.use("/pais", paisRoutes);

app.use("/telefone", telefoneRoutes);
