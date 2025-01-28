import IStrategy from "./IStrategy";
import EntidadeDominio from "../models/EntidadeDominio";

import Endereco from "../models/Endereco";
import TipoEndereco from "../enums/TipoEndereco";
import TipoLogradouro from "../enums/TipoLogradouro";
import TipoResidencia from "../enums/TipoResidencia";

export default class ValidaTelefone implements IStrategy {
   processar(entidadeDominio: EntidadeDominio): string {
      let mensagem = "";

      if (entidadeDominio instanceof Endereco) {
         const endereco = entidadeDominio as Endereco;

         if (endereco.Id === 0) {
            if (endereco.ClienteId === 0) {
               mensagem += "Cliente é obrigatório. ";
            }

            if (!endereco.Apelido) {
               mensagem += "Apelido é obrigatório. ";
            }

            if (!endereco.Logradouro) {
               mensagem += "Logradouro é obrigatório. ";
            }

            if (!endereco.Bairro) {
               mensagem += "Bairro é obrigatório. ";
            }

            if (!endereco.Cep) {
               mensagem += "CEP é obrigatório. ";
            } else if (endereco.Cep.length !== 8) {
               mensagem += "CEP inválido. ";
            }

            if (endereco.CidadeId === 0) {
               mensagem += "Cidade é obrigatório. ";
            }

            if (endereco.TipoEndereco === TipoEndereco.NAO_DEFINIDO) {
               mensagem += "Tipo de endereço é obrigatório. ";
            }

            if (endereco.TipoLogradouro === TipoLogradouro.NAO_DEFINIDO) {
               mensagem += "Tipo de logradouro é obrigatório. ";
            }

            if (endereco.TipoResidencia === TipoResidencia.NAO_DEFINIDO) {
               mensagem += "Tipo de residência é obrigatória. ";
            }
         }
      }
      return mensagem;
   }
}
