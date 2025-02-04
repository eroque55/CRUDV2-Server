import EntidadeDominio from "./EntidadeDominio";
import Genero from "../enums/Genero";

export default class Cliente extends EntidadeDominio {
   private _nome: string = "";
   private _dataNascimento: Date = new Date(2000);
   private _cpf: string = "";
   private _genero: Genero = Genero.NAO_DEFINIDO;
   private _email: string = "";
   private _senha: string = "";
   private _confirmacaoSenha: string = "";
   private _status: boolean = true;
   private _ranking: number = 0;

   get Nome(): string {
      return this._nome;
   }

   set Nome(nome: string) {
      this._nome = nome;
   }

   get DataNascimento(): Date {
      console.log(this._dataNascimento);
      return this._dataNascimento;
   }

   set DataNascimento(dataNascimento: Date) {
      this._dataNascimento = dataNascimento;
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

   get Senha(): string {
      return this._senha;
   }

   set Senha(senha: string) {
      this._senha = senha;
   }

   get ConfirmacaoSenha(): string {
      return this._confirmacaoSenha;
   }

   set ConfirmacaoSenha(confirmacaoSenha: string) {
      this._confirmacaoSenha = confirmacaoSenha;
   }

   get Status(): boolean {
      return this._status;
   }

   set Status(status: boolean) {
      this._status = status;
   }

   get Genero(): Genero {
      return this._genero;
   }

   set Genero(genero: Genero) {
      this._genero = genero;
   }

   get Ranking(): number {
      return this._ranking;
   }

   set Ranking(ranking: number) {
      this._ranking = ranking;
   }
}
