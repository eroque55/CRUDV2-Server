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

const book: Partial<Book> = {
   title: "O Pequeno Príncipe",
   slug: "o-pequeno-principe",
   author: "Antoine de Saint-Exupéry",
   year: 1943,
   synopsis:
      "O Pequeno Príncipe é uma história sobre um jovem príncipe que viaja de planeta em planeta, aprendendo lições valiosas sobre a vida, o amor e a amizade.",
   numberPages: 96,
   publisher: "Editora X",
   edition: 1,
   isbn: "9783161484101",
   barcode: "1234567890127",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const romeuJulieta: Partial<Book> = {
   title: "Romeu e Julieta",
   slug: "romeu-e-julieta",
   author: "William Shakespeare",
   year: 1597,
   synopsis:
      "A trágica história de amor entre Romeu e Julieta, jovens de famílias rivais em Verona, cujo amor proibido leva a um desfecho fatal.",
   numberPages: 128,
   publisher: "Editora Y",
   edition: 1,
   isbn: "9783161484117",
   barcode: "1234567890124",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const orgulhoPreconceito: Partial<Book> = {
   title: "Orgulho e Preconceito",
   slug: "orgulho-e-preconceito",
   author: "Jane Austen",
   year: 1813,
   synopsis:
      "A história acompanha Elizabeth Bennet enquanto lida com questões de educação, moralidade e casamento na sociedade aristocrática do início do século XIX.",
   numberPages: 424,
   publisher: "Editora Z",
   edition: 1,
   isbn: "9783161484124",
   barcode: "1234567890125",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const controller = new Controller();

const createBook = async () => {
   await controller.create(new Book(book));
   await controller.create(new Book(romeuJulieta));
   await controller.create(new Book(orgulhoPreconceito));
};

// createBook();
