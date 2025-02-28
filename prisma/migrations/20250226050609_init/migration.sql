/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "cartId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_cartId_key" ON "Sale"("cartId");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
