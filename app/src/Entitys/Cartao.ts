import { BandeiraCartao } from "./BandeiraCartao";
import { Cliente } from "./Cliente";
import { EntidadeDominio } from "./EntidadeDominio";

export class Cartao extends EntidadeDominio {
  constructor(
    id: number,
    private _cliente: Cliente,
    private _numero: string,
    private _nomeImpresso: string,
    private _cvv: string,
    private _validade: string,
    private _preferencial: boolean,
    private _bandeiraCartao: BandeiraCartao
  ) {super(id);}

    get Cliente(): Cliente {
        return this._cliente;
    }

    set Cliente(cliente: Cliente) {
        this._cliente = cliente;
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
