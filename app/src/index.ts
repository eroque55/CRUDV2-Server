import express from "express";
import cors from "cors";

import cardRoutes from "./routes/Card";
import cityRoutes from "./routes/City";
import customerRoutes from "./routes/Customer";
import addressRoutes from "./routes/Address";
import stateRoutes from "./routes/State";
import countryRoutes from "./routes/Country";
import phoneRoutes from "./routes/Phone";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(8000, () =>
   console.log("Servidor rodando em: http://localhost:8000")
);

app.use("/cards", cardRoutes);

app.use("/cities", cityRoutes);

app.use("/customers", customerRoutes);

app.use("/addresses", addressRoutes);

app.use("/states", stateRoutes);

app.use("/contries", countryRoutes);

app.use("/phones", phoneRoutes);
