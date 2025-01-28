import IStrategy from "./IStrategy";
import EntidadeDominio from "../models/EntidadeDominio";

import Cartao from "../models/Cartao";
import BandeiraCartao from "../enums/BandeiraCartao";

export default class ValidaCartao implements IStrategy {
   processar(entidadeDominio: EntidadeDominio): string {
      let mensagem = "";

      if (entidadeDominio instanceof Cartao) {
         const cartao = entidadeDominio as Cartao;

         if (cartao.Id === 0) {
            if (cartao.ClienteId === 0) {
               mensagem += "Cliente é obrigatório. ";
            }

            if (!cartao.Numero) {
               mensagem += "Número do cartão é obrigatório. ";
            }

            if (!cartao.NomeImpresso) {
               mensagem += "Nome impresso no cartão é obrigatório. ";
            }

            if (!cartao.Cvv) {
               mensagem += "Código de segurança é obrigatório. ";
            } else if (cartao.Cvv.length !== 3) {
               mensagem += "Código de segurança deve ter 3 dígitos. ";
            }

            if (!cartao.Validade) {
               mensagem += "Data de validade é obrigatória. ";
            }

            if (cartao.BandeiraCartao === BandeiraCartao.NAO_DEFINIDO) {
               mensagem += "Bandeira do cartão é obrigatória. ";
            }
         }
      }

      return mensagem;
   }
}
