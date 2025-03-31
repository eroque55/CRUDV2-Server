import Card from "./Card";
import Sale from "./Sale";

class CardToSale {
   private card?: Card;
   private sale?: Sale;

   constructor(data?: Partial<CardToSale>) {
      Object.assign(this, data);
   }

   get Card(): Card | undefined {
      return this.card;
   }

   set Card(card: Card) {
      this.card = card;
   }

   get Sale(): Sale | undefined {
      return this.sale;
   }

   set Sale(sale: Sale) {
      this.sale = sale;
   }
}

export default CardToSale;
