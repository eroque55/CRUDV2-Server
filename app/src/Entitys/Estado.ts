import { Pais } from "@prisma/client";
import { EntidadeDominio } from "./EntidadeDominio";

export class Estado extends EntidadeDominio{
    constructor(id: number, private _nome: string, private _pais: Pais) {
        super(id);
    }
    
    get Nome(): string {
        return this._nome;
    }
    
    set Nome(nome: string) {
        this._nome = nome;
    }
    
    get Pais(): Pais {
        return this._pais;
    }

    set Pais(pais: Pais) {
        this._pais = pais;
    }
}