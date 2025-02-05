import DomainEntity from "./DomainEntity";
import Gender from "../enums/Gender";

export default class Customer extends DomainEntity {
   private _name: string = "";
   private _birthDate: Date = new Date(0);
   private _cpf: string = "";
   private _gender: Gender = Gender.UNDEFINED;
   private _email: string = "";
   private _password: string = "";
   private _confPassword: string = "";
   private _status: boolean = true;
   private _ranking: number = 0;

   get Name(): string {
      return this._name;
   }

   set Name(name: string) {
      this._name = name;
   }

   get BirthDate(): Date {
      return this._birthDate;
   }

   set BirthDate(birthDate: Date) {
      this._birthDate = birthDate;
   }

   get Cpf(): string {
      return this._cpf;
   }

   set Cpf(cpf: string) {
      this._cpf = cpf;
   }

   get Email(): string {
      return this._email;
   }

   set Email(email: string) {
      this._email = email;
   }

   get Password(): string {
      return this._password;
   }

   set Password(password: string) {
      this._password = password;
   }

   get ConfPassword(): string {
      return this._confPassword;
   }

   set ConfPassword(confPassword: string) {
      this._confPassword = confPassword;
   }

   get Status(): boolean {
      return this._status;
   }

   set Status(status: boolean) {
      this._status = status;
   }

   get Gender(): Gender {
      return this._gender;
   }

   set Gender(gender: Gender) {
      this._gender = gender;
   }

   get Ranking(): number {
      return this._ranking;
   }

   set Ranking(ranking: number) {
      this._ranking = ranking;
   }
}
