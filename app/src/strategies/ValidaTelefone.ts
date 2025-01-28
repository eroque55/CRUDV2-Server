import IStrategy from "./IStrategy";
import EntidadeDominio from "../models/EntidadeDominio";

import Telefone from "../models/Telefone";
import TipoTelefone from "../enums/TipoTelefone";

export default class ValidaTelefone implements IStrategy {
   processar(entidadeDominio: EntidadeDominio): string {
      let mensagem = "";

      if (entidadeDominio instanceof Telefone) {
         const telefone = entidadeDominio as Telefone;

         if (telefone.Id === 0) {
            if (telefone.ClienteId === 0) {
               mensagem += "Cliente é obrigatório. ";
            }

            if (!telefone.Ddd) {
               mensagem += "DDD é obrigatório. ";
            }

            if (!telefone.Numero) {
               mensagem += "Número é obrigatório. ";
            } else if (
               telefone.Numero.length < 8 ||
               telefone.Numero.length > 9
            ) {
               mensagem += "Número de telefone inválido. ";
            }

            if (telefone.Tipo === TipoTelefone.NAO_DEFINIDO) {
               mensagem += "Tipo de telefone é obrigatório. ";
            }
         }
      }
      return mensagem;
   }
}
