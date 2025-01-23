/*
  Warnings:

  - You are about to drop the column `bandeira` on the `Cartao` table. All the data in the column will be lost.
  - Added the required column `bandeiraCartao` to the `Cartao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cartao" DROP COLUMN "bandeira",
ADD COLUMN     "bandeiraCartao" TEXT NOT NULL;
