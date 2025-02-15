import express from "express";
import cors from "cors";

import { Card, City, Customer, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

async function teste(): Promise<Customer[]> {
   return await prisma.customer.findMany({
      include: {
         Address: {
            include: {
               city: {
                  include: {
                     state: {
                        include: {
                           country: true,
                        },
                     },
                  },
               },
            },
         },
         Phone: true,
         Card: true,
      },
   });
}

app.get("/teste1", async (req, res) => {
   res.json(await teste());
});

async function teste2(): Promise<Card[]> {
   return await prisma.card.findMany({
      include: {
         customer: true,
      },
   });
}

app.get("/teste2", async (req, res) => {
   res.json(await teste2());
});
