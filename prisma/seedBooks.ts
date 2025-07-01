// scripts/seedBooksAndCategories.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
   // Certifique-se de ter ao menos um PriceGroup criado
   const priceGroup = await prisma.priceGroup.findFirst();
   if (!priceGroup) {
      throw new Error("Crie ao menos um PriceGroup antes de rodar este seed.");
   }

   const categories = [
      { name: "Ficção Científica", slug: "ficcao-cientifica" },
      { name: "Fantasia", slug: "fantasia" },
      { name: "Clássicos", slug: "classicos" },
      { name: "Literatura Brasileira", slug: "literatura-brasileira" },
      { name: "Literatura Infantojuvenil", slug: "infantojuvenil" },
   ];

   for (const category of categories) {
      await prisma.category.upsert({
         where: { slug: category.slug },
         update: {},
         create: category,
      });
   }

   const books = [
      { slug: "1984", title: "1984", author: "George Orwell", year: 1949 },
      {
         slug: "a-guerra-dos-tronos",
         title: "A Guerra dos Tronos",
         author: "George R.R. Martin",
         year: 1996,
      },
      {
         slug: "a-revolucao-dos-bichos",
         title: "A Revolução dos Bichos",
         author: "George Orwell",
         year: 1945,
      },
      {
         slug: "admiravel-mundo-novo",
         title: "Admirável Mundo Novo",
         author: "Aldous Huxley",
         year: 1932,
      },
      {
         slug: "as-cronicas-de-narnia",
         title: "As Crônicas de Nárnia",
         author: "C.S. Lewis",
         year: 1956,
      },
      {
         slug: "cem-anos-de-solidao",
         title: "Cem Anos de Solidão",
         author: "Gabriel García Márquez",
         year: 1967,
      },
      {
         slug: "dom-quixote",
         title: "Dom Quixote",
         author: "Miguel de Cervantes",
         year: 1605,
      },
      {
         slug: "fahrenheit-451",
         title: "Fahrenheit 451",
         author: "Ray Bradbury",
         year: 1953,
      },
      {
         slug: "grande-sertao-veredas",
         title: "Grande Sertão: Veredas",
         author: "João Guimarães Rosa",
         year: 1956,
      },
      {
         slug: "harry-potter-pedra-filosofal",
         title: "Harry Potter e a Pedra Filosofal",
         author: "J.K. Rowling",
         year: 1997,
      },
      {
         slug: "jane-eyre",
         title: "Jane Eyre",
         author: "Charlotte Brontë",
         year: 1847,
      },
      {
         slug: "o-hobbit",
         title: "O Hobbit",
         author: "J.R.R. Tolkien",
         year: 1937,
      },
      {
         slug: "o-nome-do-vento",
         title: "O Nome do Vento",
         author: "Patrick Rothfuss",
         year: 2007,
      },
      {
         slug: "o-pequeno-principe",
         title: "O Pequeno Príncipe",
         author: "Antoine de Saint-Exupéry",
         year: 1943,
      },
      {
         slug: "o-senhor-dos-aneis",
         title: "O Senhor dos Anéis",
         author: "J.R.R. Tolkien",
         year: 1954,
      },
   ];

   const bookCategoryMap: { [slug: string]: string[] } = {
      "1984": ["ficcao-cientifica", "classicos"],
      "a-guerra-dos-tronos": ["fantasia"],
      "a-revolucao-dos-bichos": ["classicos", "ficcao-cientifica"],
      "admiravel-mundo-novo": ["ficcao-cientifica", "classicos"],
      "as-cronicas-de-narnia": ["fantasia", "infantojuvenil"],
      "cem-anos-de-solidao": ["classicos"],
      "dom-quixote": ["classicos"],
      "fahrenheit-451": ["ficcao-cientifica"],
      "grande-sertao-veredas": ["literatura-brasileira", "classicos"],
      "harry-potter-pedra-filosofal": ["fantasia", "infantojuvenil"],
      "jane-eyre": ["classicos"],
      "o-hobbit": ["fantasia", "infantojuvenil"],
      "o-nome-do-vento": ["fantasia"],
      "o-pequeno-principe": ["classicos", "infantojuvenil"],
      "o-senhor-dos-aneis": ["fantasia"],
   };

   for (const book of books) {
      const createdBook = await prisma.book.upsert({
         where: { slug: book.slug },
         update: {},
         create: {
            title: book.title,
            slug: book.slug,
            author: book.author,
            status: true,
            year: book.year,
            synopsis: "Descrição não disponível.",
            numberPages: 300,
            publisher: "Editora Exemplo",
            isbn: `978${Math.floor(
               100000000000 + Math.random() * 900000000000
            )}`.substring(0, 13),
            barcode: `${Math.floor(
               1000000000000 + Math.random() * 9000000000000
            )}`.substring(0, 13),
            priceGroupId: priceGroup.id,
         },
      });

      const categoriesToLink = bookCategoryMap[book.slug];
      for (const catSlug of categoriesToLink) {
         const category = await prisma.category.findUnique({
            where: { slug: catSlug },
         });
         if (category) {
            await prisma.bookToCategory.upsert({
               where: {
                  bookId_categoryId: {
                     bookId: createdBook.id,
                     categoryId: category.id,
                  },
               },
               update: {},
               create: {
                  bookId: createdBook.id,
                  categoryId: category.id,
               },
            });
         }
      }
   }

   console.log("Livros e categorias inseridos com sucesso.");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(() => prisma.$disconnect());
