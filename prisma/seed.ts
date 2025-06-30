import { PrismaClient, SaleStatus } from "@prisma/client";
const prisma = new PrismaClient();

function randomDate(start: Date, end: Date): Date {
   return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
   );
}

async function main() {
   const customer = await prisma.customer.findFirst();
   if (!customer) throw new Error("Crie um customer primeiro");

   const card = await prisma.card.findFirst({
      where: { customerId: customer.id },
   });
   if (!card) throw new Error("Crie um cartão para o cliente");

   const coupon = await prisma.coupon.findFirst();
   const carrier = await prisma.carrier.findFirst();
   const address = await prisma.address.findFirst({
      where: { customerId: customer.id },
   });

   const allBooks = await prisma.book.findMany({ where: { id: { lte: 14 } } });

   for (let i = 0; i < 50; i++) {
      const bookIds = allBooks
         .sort(() => 0.5 - Math.random())
         .slice(0, Math.floor(Math.random() * 7) + 4); // entre 4 e 10 livros

      const cart = await prisma.cart.create({
         data: {
            customerId: customer.id,
            bookToCart: {
               create: bookIds.map((book) => ({
                  bookId: book.id,
                  amount: Math.ceil(Math.random() * 3),
               })),
            },
         },
         include: { bookToCart: true },
      });

      const totalValue = bookIds.reduce((acc, book) => {
         const amount =
            cart.bookToCart.find((b) => b.bookId === book.id)?.amount || 1;
         return acc + book.id * 10 * amount; // lógica fictícia
      }, 0);

      const saleDate = randomDate(new Date("2024-01-01"), new Date());

      await prisma.sale.create({
         data: {
            totalValue: totalValue.toFixed(2),
            status: SaleStatus.APROVADA,
            paymentMethod: card.cardBrand,
            cartId: cart.id,
            couponId: coupon?.id,
            createdAt: saleDate,
            cardToSale: {
               create: { cardId: card.id },
            },
            freight:
               address && carrier
                  ? {
                       create: {
                          addressId: address.id,
                          carrierId: carrier.id,
                          deliveryTime: Math.floor(Math.random() * 5) + 1,
                       },
                    }
                  : undefined,
         },
      });
   }

   console.log("10 vendas criadas com sucesso.");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
