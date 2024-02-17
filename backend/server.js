const express = require("express");

const port = 5000;

const app = express();



// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/post", require("./routes/post.routes"));

// lancer le serveur 
app.listen(port, () => console.log("Le serveur a démarré sur le port " + port));
