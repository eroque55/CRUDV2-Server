-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('RESIDENCIAL', 'COBRANCA', 'ENTREGA');

-- CreateEnum
CREATE TYPE "CardBrand" AS ENUM ('VISA', 'MASTERCARD', 'AMERICAN_EXPRESS', 'DISCOVER', 'DINERS_CLUB', 'JCB', 'OUTRA');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMININO', 'MASCULINO', 'OUTRO');

-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('CELULAR', 'RESIDENCIAL', 'COMERCIAL');

-- CreateEnum
CREATE TYPE "ResidenceType" AS ENUM ('CASA', 'APARTAMENTO', 'OUTRO');

-- CreateEnum
CREATE TYPE "StreetType" AS ENUM ('RUA', 'AVENIDA', 'TRAVESSA', 'ALAMEDA', 'ESTRADA', 'OUTRO');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "cardholder" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "preferential" BOOLEAN NOT NULL DEFAULT false,
    "expirationDate" TEXT NOT NULL,
    "cardBrand" "CardBrand" NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confPassword" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "ranking" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complement" TEXT,
    "addressType" "AddressType" NOT NULL,
    "streetType" "StreetType" NOT NULL,
    "residenceType" "ResidenceType" NOT NULL,
    "customerId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "entity" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "ddd" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "phoneType" "PhoneType" NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "numberPages" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "edition" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "thickness" DOUBLE PRECISION NOT NULL,
    "barcode" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "priceGroupId" INTEGER NOT NULL,
    "reasonCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookToCategory" (
    "bookId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "BookToCategory_pkey" PRIMARY KEY ("bookId","categoryId")
);

-- CreateTable
CREATE TABLE "PriceGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tax" INTEGER NOT NULL,

    CONSTRAINT "PriceGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReasonCategory" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "ReasonCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookToCart" (
    "cartId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "BookToCart_pkey" PRIMARY KEY ("cartId","bookId")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardToSale" (
    "cardId" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,

    CONSTRAINT "CardToSale_pkey" PRIMARY KEY ("cardId","saleId")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" TEXT NOT NULL,
    "couponId" INTEGER NOT NULL,
    "freigthId" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Freight" (
    "id" SERIAL NOT NULL,
    "addressId" INTEGER NOT NULL,
    "carrierId" INTEGER NOT NULL,

    CONSTRAINT "Freight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Carrier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cpf_key" ON "Customer"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_number_key" ON "Phone"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_customerId_key" ON "Phone"("customerId");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_priceGroupId_fkey" FOREIGN KEY ("priceGroupId") REFERENCES "PriceGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_reasonCategoryId_fkey" FOREIGN KEY ("reasonCategoryId") REFERENCES "ReasonCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookToCategory" ADD CONSTRAINT "BookToCategory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookToCategory" ADD CONSTRAINT "BookToCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookToCart" ADD CONSTRAINT "BookToCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookToCart" ADD CONSTRAINT "BookToCart_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardToSale" ADD CONSTRAINT "CardToSale_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardToSale" ADD CONSTRAINT "CardToSale_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_freigthId_fkey" FOREIGN KEY ("freigthId") REFERENCES "Freight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freight" ADD CONSTRAINT "Freight_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freight" ADD CONSTRAINT "Freight_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
