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
   Id: 3,
});

const bookToCategory = new BookToCategory({
   Category: category,
});

const bookDimension = new BookDimension({
   Height: 20,
   Width: 15,
   Thickness: 3,
   Weight: 0.5,
});

const stockMovement = new StockMovement({
   Amount: 10,
   Cost: 20,
   Supplier: "Supplier A",
   MovementType: "ENTRADA",
});

const stock = new Stock({
   StockMovement: [stockMovement],
});

const priceGroup = new PriceGroup({
   Id: 1,
});

const book: Partial<Book> = {
   Title: "O Senhor dos Anéis",
   Slug: "o-senhor-dos-aneis",
   Author: "J.R.R. Tolkien",
   Year: 1954,
   Synopsis: "Uma história épica de fantasia.",
   NumberPages: 500,
   Publisher: "HarperCollins",
   Edition: 1,
   Isbn: "9783161484100",
   Barcode: "1234567890123",
   BookDimension: bookDimension,
   Stock: stock,
   PriceGroup: priceGroup,
   BookToCategory: [bookToCategory],
};

const controller = new Controller();

const createBook = async () => {
   await controller.create(new Book(book));
};

// createBook();
