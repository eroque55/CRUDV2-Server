/*
  Warnings:

  - Added the required column `validade` to the `Cartao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cartao" ADD COLUMN     "validade" TEXT NOT NULL;
