const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");
const productsRoute = require("./routes/products");


const products = require("./Product");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products",productsRoute)


app.get("/", (req, res) => {
  res.send("Welcome to our Smart Shop 🛒");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 8000;
const uri = process.env.MONGO;

app.listen(port, () => console.log(`App has Started in port ${port} `));

mongoose.set("strictQuery", false);
  
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected successfully..."))
  .catch((err) => console.log("mongobd connection failed", err.message));
