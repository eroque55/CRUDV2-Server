// scripts/seedLocations.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
   const country = await prisma.country.upsert({
      where: { name: "Brasil" },
      update: {},
      create: {
         name: "Brasil",
         states: {
            create: [
               {
                  name: "São Paulo",
                  cities: {
                     create: [
                        { name: "Mogi das Cruzes" },
                        { name: "São Paulo" },
                        { name: "Campinas" },
                        { name: "Santos" },
                     ],
                  },
               },
               {
                  name: "Minas Gerais",
                  cities: {
                     create: [
                        { name: "Belo Horizonte" },
                        { name: "Uberlândia" },
                        { name: "Juiz de Fora" },
                     ],
                  },
               },
               {
                  name: "Rio de Janeiro",
                  cities: {
                     create: [
                        { name: "Rio de Janeiro" },
                        { name: "Niterói" },
                        { name: "Volta Redonda" },
                     ],
                  },
               },
            ],
         },
      },
   });

   console.log(`Seed concluído para o país: ${country.name}`);
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(() => prisma.$disconnect());
