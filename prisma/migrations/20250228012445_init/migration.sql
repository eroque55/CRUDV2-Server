/*
  Warnings:

  - You are about to drop the column `isInactive` on the `ReasonCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReasonCategory" DROP COLUMN "isInactive",
ADD COLUMN     "isActivation" BOOLEAN NOT NULL DEFAULT false;
