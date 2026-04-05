/*
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 2 - 2026
 */

import Film from "./Film.js";
import dayjs from "dayjs";

function mapRowsToFilms(rows) {
    return rows.map(row => new Film(row.id, row.title, row.isFavorite === 1, row.watchDate, row.rating, row.userId));
}

export default function FilmLibrary() {
    
    this.films = [];

    this.addFilm = (film) => {
        this.films.push(film);
    }

    this.getAllFilms = () => {
        return this.films;
    };

    this.getFavoriteFilms = () => {
        return this.films.filter(film => film.favorite);
    };

    this.getBestRatedFilms = () => {
        return this.films.filter(film => film.rating === 5);
    }

    this.getWatchedLastMonth = () => {
        return this.films.filter(film => {
            if (!film.watchDate) return false;
            const watchDate = dayjs(film.watchDate);
            const today = dayjs();
            return watchDate.isAfter(today.subtract(1, 'month'));
        });
    }

    this.getUnseenFilms = () => {
        return this.films.filter(film => !film.watchDate);
    }

    this.getWatchedBefore = (watchDate) => {
        return this.films.filter(film => {
            if (!film.watchDate) return false;
            const filmWatchDate = dayjs(film.watchDate);
            return filmWatchDate.isBefore(watchDate);
        });
    }

    this.getContainingString = (string) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE title LIKE ?';
            db.all(query, [`%${string}%`], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(mapRowsToFilms(rows));
                }
            });
        });
    };

    this.getFilmById = (id) => {
        return this.films.find(film => film.id === id);
    };

    /**
     * These methods are related to exercise 2
     */
    this.deleteFilm = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM films WHERE id = ?';
            db.run(query, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    };

    this.resetWatchDates = () => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE films SET watchDate = NULL';
            db.run(query, [], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    this.updateFilm = (film) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE films SET title = ?, isFavorite = ?, watchDate = ?, rating = ?, userId = ? WHERE id = ?';
            const watchDate = film.watchDate ? film.watchDate.format("YYYY-MM-DD") : null;
            let rating = undefined;
            if (!film.rating || film.rating < 1 || film.rating > 5) 
                rating = null;
            else
                rating = film.rating;
            db.run(query, [film.title, film.favorite, watchDate, rating, film.userId, film.id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(film);
                }
            });
        });
    };

}
