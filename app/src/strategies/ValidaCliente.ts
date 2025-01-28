import IStrategy from "./IStrategy";
import EntidadeDominio from "../models/EntidadeDominio";

import Cliente from "../models/Cliente";

export default class ValidaCliente implements IStrategy {
   processar(entidadeDominio: EntidadeDominio): string {
      let mensagem = "";

      if (entidadeDominio instanceof Cliente) {
         const cliente = entidadeDominio as Cliente;

         if (cliente.Id === 0) {
            if (!cliente.Nome) {
               mensagem += "Nome é obrigatório. ";
            }

            if (!cliente.Cpf) {
               mensagem += "CPF é obrigatório. ";
            }

            if (!cliente.Email) {
               mensagem += "E-mail é obrigatório. ";
            } else if (!cliente.Email.includes("@")) {
               mensagem += "E-mail inválido. ";
            }

            if (!cliente.Senha) {
               mensagem += "Senha é obrigatória. ";
            } else {
               if (cliente.Senha.length < 8) {
                  mensagem += "Senha deve ter no mínimo 8 caracteres. ";
               }
               if (!/[a-z]/.test(cliente.Senha)) {
                  mensagem += "Senha deve ter no mínimo 1 letra minúscula. ";
               }
               if (!/[A-Z]/.test(cliente.Senha)) {
                  mensagem += "Senha deve ter no mínimo 1 letra maiúscula. ";
               }
               if (!/[!@#$%^&*(),.?":{}|<>]/.test(cliente.Senha)) {
                  mensagem += "Senha deve ter no mínimo 1 caractere especial. ";
               }
            }

            if (!cliente.ConfirmacaoSenha) {
               mensagem += "Confirmação de senha é obrigatória. ";
            } else if (cliente.Senha !== cliente.ConfirmacaoSenha) {
               mensagem += "Senhas não conferem. ";
            }
         }
      }
      return mensagem;
   }
}
