// scripts/seedBookDimensions.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
   const books = await prisma.book.findMany();

   for (const book of books) {
      // Gera dimensões aleatórias e razoáveis
      const height = parseFloat((Math.random() * 10 + 20).toFixed(2)); // 20 - 30 cm
      const width = parseFloat((Math.random() * 5 + 13).toFixed(2)); // 13 - 18 cm
      const thickness = parseFloat((Math.random() * 3 + 1).toFixed(2)); // 1 - 4 cm
      const weight = parseFloat((Math.random() * 500 + 200).toFixed(2)); // 200g - 700g

      await prisma.bookDimension.create({
         data: {
            height,
            width,
            thickness,
            weight,
            bookId: book.id,
         },
      });
   }

   console.log("Dimensões dos livros inseridas com sucesso.");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(() => prisma.$disconnect());
