-- CreateTable
CREATE TABLE "Cartao" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "preferencial" BOOLEAN NOT NULL,
    "bandeira" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Cartao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estadoId" INTEGER NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "ranking" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "apelido" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "tipoEndereco" TEXT NOT NULL,
    "tipoLogradouro" TEXT NOT NULL,
    "tipoResidencia" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "cidadeId" INTEGER NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "entidade" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" SERIAL NOT NULL,
    "ddd" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "tipoTelefone" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cartao" ADD CONSTRAINT "Cartao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estado" ADD CONSTRAINT "Estado_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
