// scripts/seedStock.ts
import { PrismaClient, StockMovementType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
   const books = await prisma.book.findMany();

   for (const book of books) {
      const amount = Math.floor(Math.random() * 91) + 10; // entre 10 e 100 unidades
      const cost = parseFloat((Math.random() * 50 + 10).toFixed(2)); // entre 10.00 e 60.00

      // Cria o estoque
      const stock = await prisma.stock.create({
         data: {
            amount,
            bookId: book.id,
         },
      });

      // Cria a movimentação de entrada
      await prisma.stockMovement.create({
         data: {
            movementType: StockMovementType.ENTRADA,
            amount,
            cost,
            supplier: "Fornecedor Exemplo",
            stockId: stock.id,
         },
      });
   }

   console.log("Estoques e movimentações criados com sucesso.");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(() => prisma.$disconnect());
