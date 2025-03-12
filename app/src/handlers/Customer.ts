import { Request, Response } from "express";
import CustomerController from "../controllers/Controller";

import Customer from "../models/Customer";
import Phone from "../models/Phone";
import Address from "../models/Address";
import { CityModel } from "../models";
import { Gender } from "@prisma/client";

const controller = new CustomerController();

export async function getCustomers(req: Request, res: Response) {
   try {
      const customer = new Customer();

      if (req.query.name) customer.Name = req.query.name as string;
      if (req.query.cpf) customer.Cpf = req.query.cpf as string;
      if (req.query.email) customer.Email = req.query.email as string;
      if (req.query.ranking)
         customer.Ranking = parseInt(req.query.ranking as string);
      if (req.query.status) customer.Status = req.query.status === "true";
      if (req.query.gender) customer.Gender = req.query.gender as Gender;
      if (req.query.birthDate)
         customer.BirthDate = new Date(req.query.birthDate as string);

      const customerResponse = await controller.read(customer);

      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer();

      customer.Id = parseInt(req.params.id);
      if (req.query.email) customer.Email = req.query.email as string;
      if (req.query.password) customer.Password = req.query.password as string;

      const customerResponse = await controller.get(customer);
      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer();
      const phone = new Phone();
      const address1 = new Address();
      const address2 = new Address();

      phone.Ddd = req.body.phones[0].ddd;
      phone.Number = req.body.phones[0].number;
      phone.PhoneType = req.body.phones[0].phoneType;

      address1.Nickname = req.body.addresses[0].nickname;
      address1.Street = req.body.addresses[0].street;
      address1.Number = req.body.addresses[0].number;
      address1.Neighborhood = req.body.addresses[0].neighborhood;
      address1.Cep = req.body.addresses[0].cep;
      address1.Complement = req.body.addresses[0].complement;
      address1.AddressType = req.body.addresses[0].addressType;
      address1.StreetType = req.body.addresses[0].streetType;
      address1.ResidenceType = req.body.addresses[0].residenceType;
      const city1 = new CityModel({ Id: req.body.addresses[0].city.id });
      address1.City = city1;

      address2.Nickname = req.body.addresses[1].nickname;
      address2.Street = req.body.addresses[1].street;
      address2.Number = req.body.addresses[1].number;
      address2.Neighborhood = req.body.addresses[1].neighborhood;
      address2.Cep = req.body.addresses[1].cep;
      address2.Complement = req.body.addresses[1].complement;
      address2.AddressType = req.body.addresses[1].addressType;
      address2.StreetType = req.body.addresses[1].streetType;
      address2.ResidenceType = req.body.addresses[1].residenceType;
      const city2 = new CityModel({ Id: req.body.addresses[1].city.id });
      address2.City = city2;

      customer.Name = req.body.name;
      customer.BirthDate = req.body.birthDate;
      customer.Cpf = req.body.cpf;
      customer.Gender = req.body.gender;
      customer.Email = req.body.email;
      customer.Password = req.body.password;
      customer.ConfPassword = req.body.confPassword;
      customer.Ranking = req.body.ranking;
      customer.Status = true;
      customer.Phone = phone;

      customer.Addresses.push(address1);
      customer.Addresses.push(address2);

      const customerResponse = await controller.create(customer);
      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer({ ...req.body });

      customer.Id = parseInt(req.params.id);

      const customerResponse = await controller.update(customer);
      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer();

      customer.Id = parseInt(req.params.id);

      const response = await controller.delete(customer);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
