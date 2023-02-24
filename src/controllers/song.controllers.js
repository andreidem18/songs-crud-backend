const catchError = require('../utils/catchError');
const Song = require('../models/Song');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const songs = await Song.findAll();
    return res.json(songs);
});

const create = catchError(async(req, res) => {
    const { name, artist, genre, releaseDate } = req.body;
    const song = await Song.create({ name, artist, genre, releaseDate });
    return res.status(201).json(song);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const song = await Song.findByPk(id);
    if(!song) return res.status(404).json({ message: "Song not found" });
    return res.json(song);
})

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const songsDeleted = await Song.destroy({where: {id}});
    if(songsDeleted === 0) return res.status(404).json({ message: "Song not found" })
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { name, artist, genre, releaseDate } = req.body;
    const { id } = req.params;
    const song = await Song.update(
        {name, genre, artist, releaseDate},
        { where: { id }, returning: true }
    )
    if(song[0] === 0) return res.status(404).json({ message: "Song not found" })
    return res.json(song[1][0]);
});

module.exports = {
    getAll,
    create,
    remove,
    update,
    getOne
}
