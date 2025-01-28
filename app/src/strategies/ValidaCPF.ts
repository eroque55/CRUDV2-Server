import IStrategy from "./IStrategy";
import EntidadeDominio from "../models/EntidadeDominio";

import Cliente from "../models/Cliente";

export default class ValidaCPF implements IStrategy {
   processar(entidade: EntidadeDominio): string {
      let mensagem = "";

      if (entidade instanceof Cliente) {
         const cliente = entidade as Cliente;

         if (cliente.Id === 0) {
            const cpf = cliente.Cpf;

            if (
               !this.verificarComprimento(cpf) ||
               this.verificarDigitosIguais(cpf)
            ) {
               mensagem += "CPF inválido";
            }

            if (!this.validarDigitosVerificadores(cpf)) {
               mensagem += "CPF inválido";
            }
         }
      }

      return mensagem;
   }

   private verificarComprimento(cpf: string): boolean {
      return cpf.length === 11;
   }

   private verificarDigitosIguais(cpf: string): boolean {
      return cpf.split("").every((char) => char === cpf[0]);
   }

   private validarDigitosVerificadores(cpf: string): boolean {
      const calcularDigito = (cpf: string, pesoInicial: number): number => {
         let soma = 0;

         for (let i = 0; i < pesoInicial - 1; i++) {
            soma += parseInt(cpf.charAt(i)) * (pesoInicial - i);
         }

         const resto = soma % 11;
         return resto < 2 ? 0 : 11 - resto;
      };

      const primeiroDigito = calcularDigito(cpf, 10);
      const segundoDigito = calcularDigito(cpf, 11);

      return (
         primeiroDigito === parseInt(cpf.charAt(9)) &&
         segundoDigito === parseInt(cpf.charAt(10))
      );
   }
}
