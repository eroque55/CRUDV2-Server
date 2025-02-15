import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";
import Gender from "../enums/Gender";

const customerController = new CustomerController();

export async function getCustomers(req: Request, res: Response) {
   try {
      const customerResponse = await customerController.read(new Customer());

      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer();

      customer.Id = parseInt(req.params.id);

      const customerResponse = await customerController.get(customer);
      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer();

      customer.Name = req.body._name;
      customer.BirthDate = new Date(req.body._birthDate);
      customer.Cpf = req.body._cpf;
      customer.Email = req.body._email;
      customer.Password = req.body._password;
      customer.ConfPassword = req.body._confPassword;
      customer.Gender = Gender[req.body._gender as keyof typeof Gender];

      const customerResponse = await customerController.create(customer);
      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer();

      customer.Id = parseInt(req.params.id);
      customer.Name = req.body._name;
      customer.BirthDate = req.body._birthDate;
      customer.Cpf = req.body._cpf;
      customer.Email = req.body._email;
      customer.Gender = Gender[req.body._gender as keyof typeof Gender];
      customer.Status = req.body._status;
      customer.Ranking = req.body._ranking;

      const customerResponse = await customerController.update(customer);
      res.json(customerResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCustomer(req: Request, res: Response) {
   try {
      const customer = new Customer();

      customer.Id = parseInt(req.params.id);

      const response = await customerController.delete(customer);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
