/*
  Warnings:

  - The values [DISCOVERER,DINERS_CLUB_CLUB] on the enum `CardBrand` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardBrand_new" AS ENUM ('VISA', 'MASTERCARD', 'AMERICAN_EXPRESS', 'DISCOVER', 'DINERS_CLUB', 'JCB');
ALTER TABLE "Card" ALTER COLUMN "cardBrand" TYPE "CardBrand_new" USING ("cardBrand"::text::"CardBrand_new");
ALTER TYPE "CardBrand" RENAME TO "CardBrand_old";
ALTER TYPE "CardBrand_new" RENAME TO "CardBrand";
DROP TYPE "CardBrand_old";
COMMIT;
