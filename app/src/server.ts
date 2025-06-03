import express from "express";
import cors from "cors";

import * as Routes from "./routes";
import Book from "./models/Book";
import Category from "./models/Category";
import BookToCategory from "./models/BookToCategory";
import BookDimension from "./models/BookDimension";
import Stock from "./models/Stock";
import StockMovement from "./models/StockMovement";
import PriceGroup from "./models/PriceGroup";
import Controller from "./controllers/Controller";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(8000, () => console.log("Started at: http://localhost:8000"));

app.use("/addresses", Routes.AddressRoutes);

app.use("/ai", Routes.AiRoutes);

app.use("/books", Routes.BookRoutes);

app.use("/cards", Routes.CardRoutes);

app.use("/carriers", Routes.CarrierRoutes);

app.use("/carts", Routes.CartRoutes);

app.use("/categories", Routes.CategoryRoutes);

app.use("/cities", Routes.CityRoutes);

app.use("/countries", Routes.CountryRoutes);

app.use("/coupons", Routes.CouponRoutes);

app.use("/customers", Routes.CustomerRoutes);

app.use("/phones", Routes.PhoneRoutes);

app.use("/sales", Routes.SaleRoutes);

app.use("/states", Routes.StateRoutes);

const category = new Category({
   id: 1,
});

const bookToCategory = new BookToCategory({
   category: category,
});

const bookDimension = new BookDimension({
   height: 20,
   width: 15,
   thickness: 3,
   weight: 0.5,
});

const stockMovement = new StockMovement({
   amount: 10,
   cost: 20,
   supplier: "Supplier A",
   movementType: "ENTRADA",
});

const stock = new Stock({
   stockMovement: [stockMovement],
});

const priceGroup = new PriceGroup({
   id: 1,
});

const controller = new Controller();

const domQuixote: Partial<Book> = {
   title: "Dom Quixote",
   slug: "dom-quixote",
   author: "Miguel de Cervantes",
   year: 1605,
   synopsis:
      "A história de um fidalgo que enlouquece após ler muitos romances de cavalaria e decide se tornar um cavaleiro andante.",
   numberPages: 928,
   publisher: "Editora A",
   edition: 1,
   isbn: "9783161484131",
   barcode: "1234567890126",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const cemAnosSolidao: Partial<Book> = {
   title: "Cem Anos de Solidão",
   slug: "cem-anos-de-solidao",
   author: "Gabriel García Márquez",
   year: 1967,
   synopsis:
      "A saga da família Buendía e a fundação do povoado fictício de Macondo, obra-prima do realismo mágico.",
   numberPages: 432,
   publisher: "Editora B",
   edition: 1,
   isbn: "9783161484148",
   barcode: "1234567890444",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const mobyDick: Partial<Book> = {
   title: "Moby Dick",
   slug: "moby-dick",
   author: "Herman Melville",
   year: 1851,
   synopsis:
      "A obsessiva caça do capitão Ahab à grande baleia branca que arrancou sua perna.",
   numberPages: 624,
   publisher: "Editora C",
   edition: 1,
   isbn: "9783161484155",
   barcode: "1234567890128",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const guerraPaz: Partial<Book> = {
   title: "Guerra e Paz",
   slug: "guerra-e-paz",
   author: "Liev Tolstói",
   year: 1869,
   synopsis:
      "Épico que retrata a sociedade russa durante a invasão napoleônica em 1812.",
   numberPages: 1225,
   publisher: "Editora D",
   edition: 1,
   isbn: "9783161484162",
   barcode: "1234567890129",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const crimeCastigo: Partial<Book> = {
   title: "Crime e Castigo",
   slug: "crime-e-castigo",
   author: "Fiódor Dostoiévski",
   year: 1866,
   synopsis:
      "O estudante Raskólnikov comete um assassinato e enfrenta as consequências psicológicas de seu ato.",
   numberPages: 551,
   publisher: "Editora E",
   edition: 1,
   isbn: "9783161484179",
   barcode: "1234567890130",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const harryPotterPedraFilosofal: Partial<Book> = {
   title: "Harry Potter e a Pedra Filosofal",
   slug: "harry-potter-e-a-pedra-filosofal",
   author: "J.K. Rowling",
   year: 1997,
   synopsis:
      "O início da jornada do jovem bruxo Harry Potter na Escola de Magia e Bruxaria de Hogwarts.",
   numberPages: 223,
   publisher: "Editora F",
   edition: 1,
   isbn: "9783161484186",
   barcode: "1234567890131",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const laranjaMecanica: Partial<Book> = {
   title: "Laranja Mecânica",
   slug: "laranja-mecanica",
   author: "Anthony Burgess",
   year: 1962,
   synopsis:
      "A violenta história de Alex e sua gangue em um futuro distópico, explorando livre-arbítrio e reforma social.",
   numberPages: 192,
   publisher: "Editora H",
   edition: 1,
   isbn: "9783161484209",
   barcode: "1234567890133",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const hobbit: Partial<Book> = {
   title: "O Hobbit",
   slug: "o-hobbit",
   author: "J.R.R. Tolkien",
   year: 1937,
   synopsis:
      "A aventura de Bilbo Bolseiro, que parte numa jornada inesperada para recuperar um tesouro guardado por um dragão.",
   numberPages: 310,
   publisher: "Editora I",
   edition: 1,
   isbn: "9783161484216",
   barcode: "1234567890134",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const anneGreenGables: Partial<Book> = {
   title: "Anne de Green Gables",
   slug: "anne-de-green-gables",
   author: "Lucy Maud Montgomery",
   year: 1908,
   synopsis:
      "A história da animada ruiva Anne Shirley, uma órfã enviada por engano para viver com um casal de irmãos em Prince Edward Island.",
   numberPages: 320,
   publisher: "Editora J",
   edition: 1,
   isbn: "9783161484223",
   barcode: "1234567890135",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const createBook = async () => {
   // await controller.create(new Book(domQuixote));
   await controller.create(new Book(cemAnosSolidao));
   await controller.create(new Book(mobyDick));
   await controller.create(new Book(guerraPaz));
   await controller.create(new Book(crimeCastigo));
   await controller.create(new Book(harryPotterPedraFilosofal));
   await controller.create(new Book(laranjaMecanica));
   await controller.create(new Book(hobbit));
   await controller.create(new Book(anneGreenGables));
};

// createBook();
