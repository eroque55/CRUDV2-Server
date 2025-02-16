import express from "express";
import cors from "cors";

// import { CustomerModel, PhoneModel, AddressModel, CardModel } from "./models";
// import CustomerController from "./controllers/Customer";

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

// const address1 = new AddressModel();
// address1.Nickname = "Casa";
// address1.Street = "Rua 1";
// address1.Number = 12;
// address1.Neighborhood = "Centro";
// address1.Cep = "12345678";
// address1.Complement = "Casa";
// address1.City.Id = 5;
// address1.AddressType = "COBRANCA";
// address1.StreetType = "RUA";
// address1.ResidenceType = "CASA";

// const address2 = new AddressModel();
// address2.Nickname = "Trabalho";
// address2.Street = "Rua 2";
// address2.Number = 34;
// address2.Neighborhood = "Centro";
// address2.Cep = "87654321";
// address2.Complement = "Trabalho";
// address2.City.Id = 4;
// address2.AddressType = "ENTREGA";
// address2.StreetType = "AVENIDA";
// address2.ResidenceType = "APARTAMENTO";

// const phone = new PhoneModel();
// phone.Ddd = "11";
// phone.Number = "999999999";
// phone.PhoneType = "CELULAR";

// const customer = new CustomerModel();
// customer.Name = "Fulano";
// customer.BirthDate = new Date("1990-01-01");
// customer.Cpf = "51197866850";
// customer.Gender = "MASCULINO";
// customer.Email = "email@email.com";
// customer.Password = "Aa12345@";
// customer.ConfPassword = "Aa12345@";
// customer.Ranking = 10;
// customer.Phones.push(phone);
// customer.Addresses.push(address1);
// customer.Addresses.push(address2);

// const card = new CardModel();
// card.Customer.Id = 37;
// card.Number = "1234567890123456";
// card.Cardholder = "Fulano";
// card.Cvv = "123";
// card.ExpirationDate = "12/2023";
// card.CardBrand = "VISA";

// const customerController = new CustomerController();

// customerController.create(card);
