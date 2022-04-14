const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const compression = require("compression");
// ROUTES
const todosRoutes = require("./routes/todos.js");
const userRoutes = require("./routes/users.js");

require("dotenv").config();

const port = 8000;

mongoose
  .connect(process.env.DB_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecté à MongoDB ! 🌿"))
  .catch((err) => console.log(err));

const app = express();

app.use(helmet());

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

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/todos", todosRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => console.log("📡 LISTENING ON PORT " + port));
