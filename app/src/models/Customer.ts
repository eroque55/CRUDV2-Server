import DomainEntity from "./DomainEntity";
import Gender from "../enums/Gender";

export default class Customer extends DomainEntity {
   private name: string = "";
   private birthDate: Date = new Date(0);
   private cpf: string = "";
   private gender: Gender | null = null;
   private email: string = "";
   private password: string = "";
   private confPassword: string = "";
   private status: boolean = true;
   private ranking: number = 0;

   get Name(): string {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get BirthDate(): Date {
      return this.birthDate;
   }

   set BirthDate(birthDate: Date) {
      this.birthDate = birthDate;
   }

   get Cpf(): string {
      return this.cpf;
   }

   set Cpf(cpf: string) {
      this.cpf = cpf;
   }

   get Email(): string {
      return this.email;
   }

   set Email(email: string) {
      this.email = email;
   }

   get Password(): string {
      return this.password;
   }

   set Password(password: string) {
      this.password = password;
   }

   get ConfPassword(): string {
      return this.confPassword;
   }

   set ConfPassword(confPassword: string) {
      this.confPassword = confPassword;
   }

   get Status(): boolean {
      return this.status;
   }

   set Status(status: boolean) {
      this.status = status;
   }

   get Gender(): Gender | null {
      return this.gender;
   }

   set Gender(gender: Gender) {
      this.gender = gender;
   }

   get Ranking(): number {
      return this.ranking;
   }

   set Ranking(ranking: number) {
      this.ranking = ranking;
   }
}
