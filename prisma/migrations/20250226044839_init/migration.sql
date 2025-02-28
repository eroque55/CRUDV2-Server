/*
  Warnings:

  - You are about to alter the column `nickname` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `street` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `neighborhood` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `cep` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.
  - You are about to alter the column `complement` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `height` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `thickness` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Book` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - The `status` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `synopsis` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `author` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `publisher` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `isbn` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - You are about to alter the column `barcode` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - You are about to alter the column `number` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(16)`.
  - You are about to alter the column `cardholder` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `cvv` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3)`.
  - You are about to alter the column `expirationDate` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.
  - You are about to alter the column `name` on the `Carrier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `status` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `City` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `Country` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `confPassword` on the `Customer` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `cpf` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.
  - You are about to alter the column `email` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `password` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `ranking` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,2)`.
  - You are about to alter the column `entity` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `user` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `ddd` on the `Phone` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.
  - You are about to alter the column `number` on the `Phone` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.
  - You are about to alter the column `name` on the `PriceGroup` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `type` on the `ReasonCategory` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `ReasonCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `freigthId` on the `Sale` table. All the data in the column will be lost.
  - You are about to alter the column `paymentMethod` on the `Sale` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `State` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[barcode]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[saleId]` on the table `Freight` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `BookToCart` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `cost` on the `Carrier` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `deliveryTime` to the `Freight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleId` to the `Freight` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `totalValue` on the `Sale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Sale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('EM_PROCESSAMENTO', 'APROVADA', 'TRANSPORTE_INICIADO', 'REPROVADA', 'ENTREGUE', 'TROCA_SOLICITADA');

-- CreateEnum
CREATE TYPE "ExchangeStatus" AS ENUM ('EM_ANALISE', 'APROVADA', 'REPROVADA', 'EM_TRANSPORTE', 'TROCADO');

-- CreateEnum
CREATE TYPE "StockMovementType" AS ENUM ('ENTRADA', 'SAIDA', 'REENTRADA');

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_couponId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_freigthId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "nickname" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "street" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "neighborhood" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "cep" SET DATA TYPE VARCHAR(8),
ALTER COLUMN "complement" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "height",
DROP COLUMN "price",
DROP COLUMN "stock",
DROP COLUMN "thickness",
DROP COLUMN "weight",
DROP COLUMN "width",
ADD COLUMN     "inativationReason" VARCHAR(100),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "synopsis" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "author" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "publisher" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "edition" DROP NOT NULL,
ALTER COLUMN "isbn" SET DATA TYPE VARCHAR(13),
ALTER COLUMN "barcode" SET DATA TYPE VARCHAR(13);

-- AlterTable
ALTER TABLE "BookToCart" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "number" SET DATA TYPE VARCHAR(16),
ALTER COLUMN "cardholder" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "cvv" SET DATA TYPE VARCHAR(3),
ALTER COLUMN "expirationDate" SET DATA TYPE VARCHAR(5);

-- AlterTable
ALTER TABLE "Carrier" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
DROP COLUMN "cost",
ADD COLUMN     "cost" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "status",
DROP COLUMN "updateAt",
DROP COLUMN "value";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Coupon" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "confPassword",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(11),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "status" SET DEFAULT true,
ALTER COLUMN "ranking" SET DEFAULT 0,
ALTER COLUMN "ranking" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "Freight" ADD COLUMN     "deliveryTime" INTEGER NOT NULL,
ADD COLUMN     "saleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Log" ALTER COLUMN "entity" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "user" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Phone" ALTER COLUMN "ddd" SET DATA TYPE VARCHAR(2),
ALTER COLUMN "number" SET DATA TYPE VARCHAR(9);

-- AlterTable
ALTER TABLE "PriceGroup" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "ReasonCategory" DROP COLUMN "type",
ADD COLUMN     "isInactive" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "freigthId",
DROP COLUMN "totalValue",
ADD COLUMN     "totalValue" MONEY NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "SaleStatus" NOT NULL,
ALTER COLUMN "paymentMethod" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "couponId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "State" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "Exchange" (
    "id" SERIAL NOT NULL,
    "status" "ExchangeStatus" NOT NULL,
    "saleId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookDimension" (
    "id" SERIAL NOT NULL,
    "height" DECIMAL(5,2) NOT NULL,
    "width" DECIMAL(5,2) NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "thickness" DECIMAL(5,2) NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "BookDimension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockMovement" (
    "id" SERIAL NOT NULL,
    "movementType" "StockMovementType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "cost" MONEY NOT NULL,
    "supplier" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stockId" INTEGER NOT NULL,

    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookDimension_bookId_key" ON "BookDimension"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_bookId_key" ON "Stock"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Book_barcode_key" ON "Book"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "Freight_saleId_key" ON "Freight"("saleId");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freight" ADD CONSTRAINT "Freight_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookDimension" ADD CONSTRAINT "BookDimension_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
