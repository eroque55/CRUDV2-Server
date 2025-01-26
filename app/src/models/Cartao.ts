import { BandeiraCartao } from "../enums/BandeiraCartao";
import { EntidadeDominio } from "./EntidadeDominio";

export class Cartao extends EntidadeDominio {
   private _clienteId: number = 0;
   private _numero: string = "";
   private _nomeImpresso: string = "";
   private _cvv: string = "";
   private _validade: string = "";
   private _preferencial: boolean = false;
   private _bandeiraCartao: BandeiraCartao = BandeiraCartao.NAO_DEFINIDO;

   get ClienteId(): number {
      return this._clienteId;
   }

   set ClienteId(clienteId: number) {
      this._clienteId = clienteId;
   }

   get Numero(): string {
      return this._numero;
   }

   set Numero(numero: string) {
      this._numero = numero;
   }

   get NomeImpresso(): string {
      return this._nomeImpresso;
   }

   set NomeImpresso(nomeImpresso: string) {
      this._nomeImpresso = nomeImpresso;
   }

   get Cvv(): string {
      return this._cvv;
   }

   set Cvv(cvv: string) {
      this._cvv = cvv;
   }

   get Validade(): string {
      return this._validade;
   }

   set Validade(validade: string) {
      this._validade = validade;
   }

   get Preferencial(): boolean {
      return this._preferencial;
   }

   set Preferencial(preferencial: boolean) {
      this._preferencial = preferencial;
   }

   get BandeiraCartao(): BandeiraCartao {
      return this._bandeiraCartao;
   }

   set BandeiraCartao(bandeiraCartao: BandeiraCartao) {
      this._bandeiraCartao = bandeiraCartao;
   }
}
