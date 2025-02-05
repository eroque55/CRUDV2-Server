import DomainEntity from "./DomainEntity";
import PhoneType from "../enums/PhoneType";

export default class Phone extends DomainEntity {
   private _customerId: number = 0;
   private _ddd: string = "";
   private _number: string = "";
   private _phoneType: PhoneType = PhoneType.UNDEFINED;

   get CustomerId(): number {
      return this._customerId;
   }

   set CustomerId(customerId: number) {
      this._customerId = customerId;
   }

   get Ddd(): string {
      return this._ddd;
   }

   set Ddd(ddd: string) {
      this._ddd = ddd;
   }

   get Number(): string {
      return this._number;
   }

   set Number(numero: string) {
      this._number = numero;
   }

   get PhoneType(): PhoneType {
      return this._phoneType;
   }

   set PhoneType(phoneType: PhoneType) {
      this._phoneType = phoneType;
   }
}
