const {model, Schema} = require("mongoose");

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: { type: [Schema.Types.ObjectId], ref: 'celebrities' }
});

const movieModel = model("movies", movieSchema);

module.exports = movieModel;