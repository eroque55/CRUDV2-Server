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
   title: "O Senhor dos Anéis",
   slug: "o-senhor-dos-aneis",
   author: "J.R.R. Tolkien",
   year: 1954,
   synopsis: "Uma história épica de fantasia.",
   numberPages: 500,
   publisher: "HarperCollins",
   edition: 1,
   isbn: "9783161484100",
   barcode: "1234567890123",
   bookDimension: bookDimension,
   stock: stock,
   priceGroup: priceGroup,
   bookToCategory: [bookToCategory],
};

const controller = new Controller();

const createBook = async () => {
   await controller.create(new Book(book));
};

// createBook();
