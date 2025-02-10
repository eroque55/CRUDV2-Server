-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_customerId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "complement" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "preferential" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
