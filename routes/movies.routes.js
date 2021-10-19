const router = require("express").Router();
const celebrityModel = require("../models/Celebrity.model")
const movieModel = require("../models/Movie.model")
// all your routes here

router.get('/create', (req, res, next) => {
  celebrityModel.find()
  .then((celebrities) => {
    console.log(celebrities)
    res.render("movies/new-movie.hbs", {celebrities});
  })
  .catch((err) => {
    console.err(err);
  })
});

router.post('/create', async (req, res, next) => {
  try {
    await movieModel.create(req.body);
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
    res.redirect("/movies/create");
  }
});

router.get('/', async (req, res, next) => {
  try {
    const movies = await movieModel.find();
    res.render("movies/movies.hbs", {movies});
  } catch (err) {
    console.error(err)
  }
});

router.get('/:id([a-z0-9]{24})', (req, res, next) => {
  movieModel.findById(req.params.id).populate('cast')
  .then((movie) => {
    console.log(movie)
    res.render("movies/movie-details.hbs", {movie});
  })
  .catch((err) => {
    console.error(err)
  })
});

router.post('/:id([a-z0-9]{24})/delete', (req, res, next) => {
  movieModel.findByIdAndRemove(req.params.id)
  .then((movie) => {
    res.redirect("/movies");
  })
  .catch((err) => {
    console.error(err)
  })
});

router.get('/:id([a-z0-9]{24})/edit', async (req, res, next) => {
  try {
    const movie = await movieModel.findById(req.params.id)
    const celebrities = await celebrityModel.find()
    res.render("movies/edit-movie.hbs", {movie, celebrities});
  } catch (err) {
    console.error(err)
  }
});

router.post('/:id([a-z0-9]{24})/edit', (req, res, next) => {
  movieModel.findByIdAndUpdate(req.params.id, req.body)
  .then((movie) => {
    res.redirect("/movies");
  })
  .catch((err) => {
    console.error(err)
  })
});

module.exports = router;