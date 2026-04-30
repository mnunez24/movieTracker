require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});
const Movie = require("./models/Movie");

app.get("/watchlist", async (req, res) => {
    const movies = await Movie.find();
    res.render("watchlist", { movies });
});

const movieRoutes = require("./routes/movies");
app.use("/movies", movieRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});