"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../models/Cliente"));
const Telefone_1 = __importDefault(require("../models/Telefone"));
const Endereco_1 = __importDefault(require("../models/Endereco"));
const Cartao_1 = __importDefault(require("../models/Cartao"));
const CartaoDAO_1 = __importDefault(require("../daos/CartaoDAO"));
const ClienteDAO_1 = __importDefault(require("../daos/ClienteDAO"));
const EnderecoDAO_1 = __importDefault(require("../daos/EnderecoDAO"));
const TelefoneDAO_1 = __importDefault(require("../daos/TelefoneDAO"));
const LogDAO_1 = __importDefault(require("../daos/LogDAO"));
const ValidaCartao_1 = __importDefault(require("../strategies/ValidaCartao"));
const ValidaCliente_1 = __importDefault(require("../strategies/ValidaCliente"));
const ValidaCPF_1 = __importDefault(require("../strategies/ValidaCPF"));
const ValidaEndereco_1 = __importDefault(require("../strategies/ValidaEndereco"));
const ValidaTelefone_1 = __importDefault(require("../strategies/ValidaTelefone"));
class Fachada {
    constructor() {
        this.strategies = new Map();
        this.daos = new Map();
        this.definirStrategies();
        this.definirDAOs();
    }
    salvar(entidade) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = this.obterDAO(entidade);
            const msg = this.executar(entidade);
            if (msg) {
                throw new Error(msg);
            }
            const logDAO = new LogDAO_1.default();
            logDAO.salvar(`${entidade.constructor.name}.salvar`, "admin", new Date());
            return yield dao.salvar(entidade);
        });
    }
    alterar(entidade) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = this.obterDAO(entidade);
            const retorno = yield dao.alterar(entidade);
            if (retorno) {
                const logDAO = new LogDAO_1.default();
                logDAO.salvar(`${entidade.constructor.name}.alterar`, "admin", new Date());
            }
            return retorno;
        });
    }
    excluir(entidade) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = this.obterDAO(entidade);
            const retorno = yield dao.excluir(entidade);
            if (retorno) {
                const logDAO = new LogDAO_1.default();
                logDAO.salvar(`${entidade.constructor.name}.excluir`, "admin", new Date());
            }
            return retorno;
        });
    }
    consultar(entidade) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = this.obterDAO(entidade);
            return yield dao.consultar(entidade);
        });
    }
    selecionar(entidade) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = this.obterDAO(entidade);
            return yield dao.selecionar(entidade);
        });
    }
    definirStrategies() {
        this.strategies.set(Cartao_1.default.name, [new ValidaCartao_1.default()]);
        this.strategies.set(Cliente_1.default.name, [new ValidaCliente_1.default(), new ValidaCPF_1.default()]);
        this.strategies.set(Endereco_1.default.name, [new ValidaEndereco_1.default()]);
        this.strategies.set(Telefone_1.default.name, [new ValidaTelefone_1.default()]);
    }
    definirDAOs() {
        this.daos.set(Cartao_1.default.name, new CartaoDAO_1.default());
        this.daos.set(Cliente_1.default.name, new ClienteDAO_1.default());
        this.daos.set(Telefone_1.default.name, new TelefoneDAO_1.default());
        this.daos.set(Endereco_1.default.name, new EnderecoDAO_1.default());
    }
    executar(entidade) {
        const classe = entidade.constructor.name;
        const strategyEntidade = this.strategies.get(classe) || [];
        let msg = "";
        strategyEntidade.forEach((strategy) => (msg += strategy.processar(entidade)));
        return msg;
    }
    obterDAO(entidade) {
        const classe = entidade.constructor.name;
        const dao = this.daos.get(classe);
        if (!dao) {
            throw new Error(`DAO não encontrada para a classe: ${classe}`);
        }
        return dao;
    }
}
exports.default = Fachada;
