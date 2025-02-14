/*
  Warnings:

  - Changed the type of `addressType` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `streetType` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `residenceType` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cardBrand` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phoneType` on the `Phone` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('RESIDENCIAL', 'COBRANCA', 'ENTREGA');

-- CreateEnum
CREATE TYPE "CardBrand" AS ENUM ('VISA', 'MASTERCARDCARD', 'AMERICAN_EXPRESS', 'DISCOVERER', 'DINERS_CLUB_CLUB', 'JCB');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMININO', 'MASCULINO', 'OUTRO');

-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('CELULAR', 'RESIDENCIAL', 'COMERCIAL');

-- CreateEnum
CREATE TYPE "ResidenceType" AS ENUM ('CASA', 'APARTAMENTO', 'OUTRO');

-- CreateEnum
CREATE TYPE "StreetType" AS ENUM ('RUA', 'AVENIDA', 'TRAVESSA', 'ALAMEDA', 'ESTRADA', 'OUTRO');

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "complement" DROP DEFAULT,
DROP COLUMN "addressType",
ADD COLUMN     "addressType" "AddressType" NOT NULL,
DROP COLUMN "streetType",
ADD COLUMN     "streetType" "StreetType" NOT NULL,
DROP COLUMN "residenceType",
ADD COLUMN     "residenceType" "ResidenceType" NOT NULL;

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "cardBrand",
ADD COLUMN     "cardBrand" "CardBrand" NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "phoneType",
ADD COLUMN     "phoneType" "PhoneType" NOT NULL;
