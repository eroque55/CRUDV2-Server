import Card from "./Card";
import Sale from "./Sale";

class CardToSale {
   card?: Card;
   sale?: Sale;

   constructor(data?: Partial<CardToSale>) {
      Object.assign(this, data);
   }
}

export default CardToSale;
