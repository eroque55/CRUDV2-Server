/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Phone_customerId_key" ON "Phone"("customerId");
