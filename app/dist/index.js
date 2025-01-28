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
const express_1 = __importDefault(require("express"));
const routesCartao_1 = __importDefault(require("./routes/routesCartao"));
const Cliente_1 = __importDefault(require("./models/Cliente"));
const Genero_1 = __importDefault(require("./enums/Genero"));
const ClienteController_1 = __importDefault(require("./controllers/ClienteController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => console.log("Servidor rodando em: http://localhost:3000"));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/cartao", routesCartao_1.default);
const cliente = new Cliente_1.default();
cliente.Nome = "Fulano";
cliente.DataNascimento = new Date();
cliente.Cpf = "44505306836";
cliente.Email = "dadas@dfsdf";
cliente.Senha = "123456aA@";
cliente.ConfirmacaoSenha = "123456aA@";
cliente.Status = true;
cliente.Genero = Genero_1.default.MASCULINO;
function salvarCliente(cliente) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield new ClienteController_1.default().salvar(cliente);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    });
}
