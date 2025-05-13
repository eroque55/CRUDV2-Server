import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Customer from "../models/Customer";
import Phone from "../models/Phone";
import Address from "../models/Address";
import { CityModel } from "../models";
import { Gender } from "@prisma/client";

const controller = new Controller();

export async function getCustomers(req: Request, res: Response) {
   try {
      const customer = new Customer();

      if (req.query.name) customer.name = req.query.name as string;
      if (req.query.cpf) customer.cpf = req.query.cpf as string;
      if (req.query.email) customer.email = req.query.email as string;
      if (req.query.ranking)
         customer.ranking = parseInt(req.query.ranking as string);
      if (req.query.status) customer.status = req.query.status === "true";
      if (req.query.gender) customer.gender = req.query.gender as Gender;
      if (req.query.birthDate)
         customer.birthDate = new Date(req.query.birthDate as string);

      const customerResponse = await controller.read(customer);

      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer();

      customer.id = parseInt(req.params.id);
      if (req.query.email) customer.email = req.query.email as string;
      if (req.query.password) customer.password = req.query.password as string;

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

      phone.ddd = req.body.phone.ddd;
      phone.number = req.body.phone.number;
      phone.phoneType = req.body.phone.phoneType;

      address1.nickname = req.body.addresses[0].nickname;
      address1.street = req.body.addresses[0].street;
      address1.number = req.body.addresses[0].number;
      address1.neighborhood = req.body.addresses[0].neighborhood;
      address1.cep = req.body.addresses[0].cep;
      address1.complement = req.body.addresses[0].complement;
      address1.addressType = req.body.addresses[0].addressType;
      address1.streetType = req.body.addresses[0].streetType;
      address1.residenceType = req.body.addresses[0].residenceType;
      const city1 = new CityModel({ id: req.body.addresses[0].city.id });
      address1.city = city1;

      address2.nickname = req.body.addresses[1].nickname;
      address2.street = req.body.addresses[1].street;
      address2.number = req.body.addresses[1].number;
      address2.neighborhood = req.body.addresses[1].neighborhood;
      address2.cep = req.body.addresses[1].cep;
      address2.complement = req.body.addresses[1].complement;
      address2.addressType = req.body.addresses[1].addressType;
      address2.streetType = req.body.addresses[1].streetType;
      address2.residenceType = req.body.addresses[1].residenceType;
      const city2 = new CityModel({ id: req.body.addresses[1].city.id });
      address2.city = city2;

      customer.name = req.body.name;
      customer.birthDate = req.body.birthDate;
      customer.cpf = req.body.cpf;
      customer.gender = req.body.gender;
      customer.email = req.body.email;
      customer.password = req.body.password;
      customer.confPassword = req.body.confPassword;
      customer.ranking = req.body.ranking;
      customer.status = true;
      customer.phone = phone;

      customer.addresses.push(address1);
      customer.addresses.push(address2);

      const customerResponse = await controller.create(customer);
      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer({ ...req.body });

      customer.id = parseInt(req.params.id);

      const customerResponse = await controller.update(customer);
      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer();

      customer.id = parseInt(req.params.id);

      const response = await controller.delete(customer);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
