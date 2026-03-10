import dayjs from "dayjs"
import sqlite from "sqlite3"

const db = new sqlite.Database("films_copy.db", (err) => {
    if (err) throw err;
})

function Film(id, title, isFavorite=false, watchDate=null, rating=null, userId=1) {
    if (!id) 
        throw new Error("Id is mandatory");
    if (!title) 
        throw new Error('Title is mandatory');
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite ? true : false;
    // saved as dayjs object only if watchDate is truthy
    this.watchDate = watchDate && dayjs(watchDate);
    this.rating = rating;
    this.userId = userId; 

    this.toString = () => {
        console.log(`Id: ${this.id}, Title: ${this.title}, Favorite: ${this.isFavorite}, Watch date: ${this.watchDate===null ? "null" : this.watchDate.format("MMMM D, YYYY")}, Rating: ${this.rating}, User id: ${this.userId}`);
    }
}

function FilmLibrary() {
    // Print all the films in the array passed as parameter
    this.printAll = (films) => {
        films.forEach(film => film.toString());
    }

    // a. Retrieve all the stored films and return a Promise that resolves to an array of Film objects.
    this.getAllFilms = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, [], (err,rows) => {
                if (err)
                    reject(err);
                else if (rows !== undefined) {
                    const films = rows.map(row => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId));
                    resolve(films);
                } else
                    resolve("Film list not available");
            });
        });
    }

    // b. Retrieve all favorite films and return a Promise that resolves to an array of Film objects.
    this.getFavoriteFilms = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE isFavorite = ?";
            db.all(sql, [1], (err,rows) => {
                if (err)
                    reject(err);
                else if (rows !== undefined) {
                    const films = rows.map(row => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId));
                    resolve(films);
                } else
                    resolve("Film list not available");
            });
        });
    }

    // d. Retrieve films whose watch date is earlier than a given date passed as a parameter. Return a Promise that resolves to an array of Film objects.
    this.getFilmsEarlierDate = (watchDate) => {
        return new Promise((resolve, reject) => {
            if (!watchDate) return reject(new Error("watchDate is required"));

            const sql = "SELECT * FROM films WHERE watchDate < ?";
            db.all(sql, [watchDate.format('YYYY-MM-DD')], (err,rows) => {
                if (err)
                    reject(err);
                else if (rows !== undefined) {
                    const films = rows.map(row => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId));
                    resolve(films);
                } else
                    resolve("Film list not available");
            });
        });
    }

    // f. Retrieve films whose title contains a given string passed as a parameter. Return a Promise that resolves to an array of Film objects.
    this.getFilmsByTitle = (title) => {
        return new Promise((resolve, reject) => {
            if (!title) return reject(new Error("Title is required"));

            const sql = "SELECT * FROM films WHERE title LIKE ?";
            db.all(sql, [`%${title}%`], (err,rows) => {
                if (err)
                    reject(err);
                else if (rows !== undefined) {
                    const films = rows.map(row => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId));
                    resolve(films);
                } else
                    resolve("Film list not available");
            });
        });
    }

    // a. Store a new movie into the database. After completion, print a success/failure message.
    this.addFilm = (film) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO films(title, isFavorite, rating, watchDate, userId) VALUES(?, ?, ?, ?, ?)";
            db.run(sql, [film.title, film.isFavorite, film.rating, film.watchDate ? film.watchDate.format('YYYY-MM-DD') : null, film.userId], function (err) {
                if (err)
                    resolve("Insertion failed. Please retry");
                else {
                    resolve(`Film '${film.title}' correctly added!`);
                }
            });
        });
    }

    // b. Delete a movie from the database (using its ID as a reference). After completion, print a success/failure message.
    this.deleteFilm = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM films WHERE id = ?";
            db.run(sql, [id], function (err) {
                if (err)
                    resolve("Deletion failed. Please retry");
                else {
                    resolve(`Film with id ${id} correctly deleted!`);
                }
            });
        });
    }

    // c. Delete the watch date of all films stored in the database.After completion, print a success/failure message.
    this.deleteWatchDate = () => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE films SET watchDate = NULL";
            db.run(sql, [], function (err) {
                if (err)
                    resolve("Deletion failed. Please retry");
                else {
                    resolve(`WatchDate correctly deleted!`);
                }
            });
        });
    }

    this.sortByDate = () => {
        this.films.sort((film1, film2) => {
            if (film1.watchDate && film2.watchDate) {
                return film1.watchDate.isBefore(film2.watchDate) ? -1 : 1;
            }
            if (!film1.watchDate && film2.watchDate) return 1;
            if (film1.watchDate && !film2.watchDate) return -1;
            return 0;
        });
    }

    this.sortByRating = () => {
        this.films.sort((film1,film2) => {
            if (film1.rating && film2.rating) {
                return film2.rating - film1.rating;
            }
            if (!film1.rating && film2.rating) return 1;
            if (film1.rating && !film2.rating) return -1;
            return 0;
        });
    }

    this.updateRating = (id, newRating) => {
        this.films.find(film => film.id === id).rating = newRating;
    }
}

async function main() {
    const library = new FilmLibrary();

    console.log("\nRetrieve all films:")
    let films = await library.getAllFilms();
    library.printAll(films);

    console.log("\nRetrieve all favorite films:")
    let favoriteFilms = await library.getFavoriteFilms();
    library.printAll(favoriteFilms);

    console.log("\nRetrieve films with watch date earlier than 20/03/2024:");
    let earlierFilms = await library.getFilmsEarlierDate(dayjs("2024-03-20"));
    library.printAll(earlierFilms);

    console.log("\nRetrieve films that contain 'ulp' in the title: ");
    let titleFilms = await library.getFilmsByTitle("ulp");
    library.printAll(titleFilms);

    /*let res = await library.addFilm(new Film(7, "Dune"));
    console.log(`\n${res}`);
    films = await library.getAllFilms();
    library.printAll(films);*/

    let res = await library.deleteFilm(7);
    console.log(`\n${res}`);

    res = await library.deleteWatchDate();
    console.log(`\n${res}`);

    db.close();

/*
    library.sortByDate();
    console.log("\nAfter sorting by ascending watch date:");
    library.printAll();

    library.sortByRating();
    console.log("\nAfter sorting by decreasing rating:");
    library.printAll();

    library.updateRating(6, 2);
    console.log("\nAfter updating rating:");
    library.printAll();
    */
}

main();
