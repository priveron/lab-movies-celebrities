const router = require("express").Router();
const celebrityModel = require("../models/Celebrity.model")
// all your routes here

router.get('/create', (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post('/create', async (req, res, next) => {
  try {
    await celebrityModel.create(req.body);
    res.redirect("/celebrities");
  } catch (err) {
    console.log(err);
    res.redirect("/celebrities/create");
  }
});

router.get('/', async (req, res, next) => {
  try {
    const celebrities = await celebrityModel.find();
    res.render("celebrities/celebrities.hbs", {celebrities});
  } catch (err) {
    console.err(err)
  }
});

module.exports = router;