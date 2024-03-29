const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Sauce = require("./models/sauce");
const app = express();
const saucesRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path");
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
