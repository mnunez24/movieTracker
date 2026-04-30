const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    imdbID: String,
    poster: String,
    plot: String,
    rating: String,
});

module.exports = mongoose.model("Movie", movieSchema);