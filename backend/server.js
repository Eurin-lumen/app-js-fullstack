const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const port = 5000;

const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/post", require("./routes/post.routes"));

// Lancement du serveur
app.listen(port, () => console.log("Le serveur a démarré sur le port " + port));
