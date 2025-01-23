import { Estado } from "@prisma/client";
import { EntidadeDominio } from "./EntidadeDominio";

export class Cidade extends EntidadeDominio {
    constructor(id: number, private _nome: string, private _estado: Estado) {
        super(id);
    }
    
    get Nome(): string {
        return this._nome;
    }
    
    set Nome(nome: string) {
        this._nome = nome;
    }

    get Estado(): Estado {
        return this._estado;
    }

    set Estado(estado: Estado) {
        this._estado = estado;
    }
}