import dayjs from "dayjs"
import sqlite from "sqlite3"
import express from "express"
import morgan from "morgan"
import { check, validationResult } from "express-validator"
import FilmLibrary from "./FilmLibrary.js";
import Film from "./Film.js"

// init 
const app = express();
const port = 3001;

// middlewares
app.use(express.json());
app.use(morgan('dev'));

let library = new FilmLibrary();

/* ROUTES */

// GET /api/films
app.get("/api/films", (req, res) => {
    library.getAll()
        .then(films => res.json(films))
        .catch(() => res.status(500).end());
});

// GET /api/films/favorites
app.get("/api/films/favorites", async (req, res) => {
    try {
        const films = await library.getFavorites();
        if (films.error) {
            res.status(500).end();
        } else res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/bests
app.get("/api/films/bests", async (req, res) => {
    try {
        const films = await library.getMostRated();
        if (films.error) {
            res.status(500).end();
        } else res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/last_month
app.get("/api/films/last_month", async (req, res) => {
    try {
        const films = await library.getWatchedLastMonth();
        if (films.error) {
            res.status(500).end();
        } else res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/unseen
app.get("/api/films/unseen", async (req, res) => {
    try {
        const films = await library.getUnseenFilms();
        if (films.error) {
            res.status(500).end();
        } else res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/<id>
app.get("/api/films/:id", async (req, res) => {
  try {
    const film = await library.getFilmById(req.params.id);
    if(film.error) {
      res.status(404).json(film);
    }
    else res.json(film);
  }
  catch {
    res.status(500).end();
  }
});

// POST /api/films
app.post("/api/films", [
  check("title").notEmpty(),
  check("isFavorite").optional().isNumeric(),
  check("rating").optional().isNumeric(),
  check("watchDate").optional().isDate({format: "YYYY-MM-DD", strictMode: true}),
  check("userId").optional().isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const newFilm = req.body;

  try {
    const id = await library.addFilm(new Film(0, newFilm.title, newFilm.isFavorite, newFilm.watchDate, newFilm.rating, newFilm.userId));
    res.status(201)/*.location(id)*/.end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    res.status(503).json({error: "Impossible to create the film."});
  }
});

// PUT /api/films/<id>
app.put("/api/films/:id", [
  check("title").notEmpty(),
  check("isFavorite").optional().isNumeric(),
  check("rating").optional().isNumeric(),
  check("watchDate").optional().isDate({format: "YYYY-MM-DD", strictMode: true}),
  check("userId").optional().isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const filmToUpdate = req.body;
  const id = req.params.id;

  try {
    const film = await library.getFilmById(id);
    if (film.error){
      res.send(404).end();
    }
    await library.updateFilm(new Film(id, filmToUpdate.title, filmToUpdate.isFavorite, filmToUpdate.watchDate, filmToUpdate.rating, filmToUpdate.userId));
    res.status(200).end();
  } catch {
    res.status(503).json({"error": `Impossible to update film #${req.params.id}.`});
  }
});

// PATCH /api/films/<id>/rate
app.patch("/api/films/:id/rate", [
  check("rating").isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const newRating = req.body.rating;
  const id = req.params.id;
  const film = await library.getFilmById(id);
  if (film.error){
    res.send(404).end();
  }

  try {
    await library.updateFilm(new Film(id, film.title, film.isFavorite, film.watchDate, newRating, film.userId))
    res.status(200).end();
  } catch {
    res.status(503).json({"error": `Impossible to update rating of film #${req.params.id}.`});
  }
});

// PATCH /api/films/<id>/favorite
app.patch("/api/films/:id/favorite", [
  check("isFavorite").isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const newFavorite = req.body.isFavorite;
  const id = req.params.id;
  const film = await library.getFilmById(id);
    if (film.error){
      res.send(404).end();
    }

  try {
    await library.updateFilm(new Film(id, film.title, newFavorite, film.watchDate, film.rating, film.userId))
    res.status(200).end();
  } catch {
    res.status(503).json({"error": `Impossible to change favorite status of film #${req.params.id}.`});
  }
});

// DELETE /api/films/<id>/delete
app.delete("/api/films/:id/delete", async (req, res) => {

  try {
    const film = await library.getFilmById(id);
    if (film.error){
      res.send(404).end();
    }
    await library.deleteFilm(req.params.id);
    res.status(200).end();
  } catch {
    res.status(503).json({"error": `Impossible to delete film #${req.params.id}`});
  }
});

// start the server
app.listen(port, () => {console.log(`API server started at http://localhost:${port}`)});