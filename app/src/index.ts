import express from "express";
import cors from "cors";

import * as Routes from "./routes";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(8000, () =>
   console.log("Servidor rodando em: http://localhost:8000")
);

app.use("/cards", Routes.CardRoutes);

app.use("/cities", Routes.CityRoutes);

app.use("/customers", Routes.CustomerRoutes);

app.use("/addresses", Routes.AddressRoutes);

app.use("/states", Routes.StateRoutes);

app.use("/countries", Routes.CountryRoutes);

app.use("/phones", Routes.PhoneRoutes);
