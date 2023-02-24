const { getAll, create, remove, update, getOne } = require('../controllers/song.controllers');
const express = require('express');

const songRouter = express.Router();

songRouter.route("/") // /songs
    .get(getAll)
    .post(create)

songRouter.route("/:id") // /songs/:id
    .delete(remove)
    .put(update)
    .get(getOne)

module.exports = songRouter;