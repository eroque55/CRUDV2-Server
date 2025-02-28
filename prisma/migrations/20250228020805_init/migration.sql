/*
  Warnings:

  - You are about to drop the column `lastUpdate` on the `Stock` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "lastUpdate",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
