const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/search", async (req, res) => {
    const title = req.query.title;
    const apiKey = process.env.OMDB_API_KEY;

    try {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
        const response = await axios.get(url);

        res.render("results", { movie: response.data });
    } catch (error) {
        console.log(error.message);
        res.send("Error searching for movie: " + error.message);
    }
});

const Movie = require("../models/Movie");

router.post("/save", async (req, res) => {
    try {
        const movie = new Movie({
            title: req.body.title,
            year: req.body.year,
            imdbID: req.body.imdbID,
            poster: req.body.poster,
            plot: req.body.plot,
            rating: req.body.rating
        });

        await movie.save();

        res.redirect("/watchlist");
    } catch (error) {
        res.send("Error saving movie");
    }
});

router.post("/delete/:id", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect("/watchlist");
    } catch (error) {
        res.send("Error deleting movie");
    }
});

module.exports = router;