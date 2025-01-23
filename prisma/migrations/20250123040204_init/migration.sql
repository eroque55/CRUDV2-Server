/*
  Warnings:

  - Added the required column `nomeImpresso` to the `Cartao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cartao" ADD COLUMN     "nomeImpresso" TEXT NOT NULL;
