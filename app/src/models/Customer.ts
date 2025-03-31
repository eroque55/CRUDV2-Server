import DomainEntity from "./DomainEntity";
import { Gender } from "@prisma/client";
import Address from "./Address";
import Card from "./Card";
import Phone from "./Phone";
import Cart from "./Cart";

class Customer extends DomainEntity {
   private name?: string;
   private birthDate?: Date;
   private cpf?: string;
   private gender?: Gender;
   private email?: string;
   private password?: string;
   private confPassword?: string;
   private status?: boolean;
   private ranking?: number;

   private phone?: Phone;
   private cards: Card[] = [];
   private addresses: Address[] = [];
   private carts: Cart[] = [];

   constructor(data?: Partial<Customer>) {
      super();
      Object.assign(this, data);
   }

   get Name(): string | undefined {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get BirthDate(): Date | undefined {
      return this.birthDate;
   }

   set BirthDate(birthDate: Date) {
      this.birthDate = birthDate;
   }

   get Cpf(): string | undefined {
      return this.cpf;
   }

   set Cpf(cpf: string) {
      this.cpf = cpf;
   }

   get Email(): string | undefined {
      return this.email;
   }

   set Email(email: string) {
      this.email = email;
   }

   get Password(): string | undefined {
      return this.password;
   }

   set Password(password: string) {
      this.password = password;
   }

   get ConfPassword(): string | undefined {
      return this.confPassword;
   }

   set ConfPassword(confPassword: string) {
      this.confPassword = confPassword;
   }

   get Status(): boolean | undefined {
      return this.status;
   }

   set Status(status: boolean) {
      this.status = status;
   }

   get Gender(): Gender | undefined {
      return this.gender;
   }

   set Gender(gender: Gender) {
      this.gender = gender;
   }

   get Ranking(): number | undefined {
      return this.ranking;
   }

   set Ranking(ranking: number) {
      this.ranking = ranking;
   }

   get Cards(): Card[] {
      return this.cards;
   }

   set Cards(cards: Card[]) {
      this.cards = cards;
   }

   get Addresses(): Address[] {
      return this.addresses;
   }

   set Addresses(addresses: Address[]) {
      this.addresses = addresses;
   }

   get Phone(): Phone | undefined {
      return this.phone;
   }

   set Phone(phone: Phone) {
      this.phone = phone;
   }

   get Carts(): Cart[] {
      return this.carts;
   }

   set Carts(carts: Cart[]) {
      this.carts = carts;
   }
}

export default Customer;
