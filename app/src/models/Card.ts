import CardBrand from "../enums/CardBrand";
import DomainEntity from "./DomainEntity";

export default class Card extends DomainEntity {
   private _customerId: number = 0;
   private _number: string = "";
   private _cardholder: string = "";
   private _cvv: string = "";
   private _expirationDate: string = "";
   private _preferential: boolean = false;
   private _cardBrand: CardBrand = CardBrand.UNDEFINED;

   get CustomerId(): number {
      return this._customerId;
   }

   set CustomerId(customerId: number) {
      this._customerId = customerId;
   }

   get Number(): string {
      return this._number;
   }

   set Number(number: string) {
      this._number = number;
   }

   get CardHolder(): string {
      return this._cardholder;
   }

   set CardHolder(cardHolder: string) {
      this._cardholder = cardHolder;
   }

   get Cvv(): string {
      return this._cvv;
   }

   set Cvv(cvv: string) {
      this._cvv = cvv;
   }

   get ExpirationDate(): string {
      return this._expirationDate;
   }

   set ExpirationDate(expirationDate: string) {
      this._expirationDate = expirationDate;
   }

   get Preferential(): boolean {
      return this._preferential;
   }

   set Preferential(preferential: boolean) {
      this._preferential = preferential;
   }

   get CardBrand(): CardBrand {
      return this._cardBrand;
   }

   set CardBrand(cardBrand: CardBrand) {
      this._cardBrand = cardBrand;
   }
}
