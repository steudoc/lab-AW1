import dayjs from "dayjs"

let nextId = 1;

function Film(title, favorite=false, date=null, rating=null, userId=1) {
    if (!title) {
        throw new Error('Title is mandatory');
    }
    this.id = nextId++;
    this.title = title;
    this.favorite = favorite;
    this.date = date===null ? null : dayjs(date);
    this.rating = rating;
    this.userId = userId; 
}

function FilmLibrary() {
    this.films = []

    this.addFilm = (film) => {
        this.films.push(film);
    }

    this.printAll = () => {
        this.films.forEach(film => {
            console.log(`Id: ${film.id}, Title: ${film.title}, Favorite: ${film.favorite}, Watch date: ${film.date===null ? "null" : film.date.format("MMMM D, YYYY")}, Rating: ${film.rating}, User id: ${film.userId}`)
        })
    }

    this.sortByDate = () => {
        this.films.sort((film1, film2) => {
            if (film1.date && film2.date) {
                return film1.date.isBefore(film2.date) ? -1 : 1;
            }
            if (!film1.date && film2.date) return 1;
            if (film1.date && !film2.date) return -1;
            return 0;
        });
    }

    this.sortByRating = () => {
        this.films.sort((film1,film2) => {
            if (film1.rating && film2.rating) {
                return film2.rating - film1.rating;
            }
            if (!film1.date && film2.date) return 1;
            if (film1.date && !film2.date) return -1;
            return 0;
        });
    }

    this.removeFilm = (id) => {
        const index = this.films.findIndex(film => film.id === id);
        if (index !== -1) {
            this.films.splice(index, 1);
        }
    }

    this.updateRating = (id, newRating) => {
        this.films.find(film => film.id === id).rating = newRating;
    }
}

const library = new FilmLibrary();

library.addFilm(new Film("Pulp Fiction", true, '2025-03-10', 5));
library.addFilm(new Film("21 Grams", true, '2025-03-17', 4));
library.addFilm(new Film("Star Wars"));
library.addFilm(new Film("Matrix"));
library.addFilm(new Film("Shrek", false, '2025-03-21', 3));

library.printAll();

library.sortByDate();
console.log("\nAfter sorting by ascending watch date:");
library.printAll();

library.sortByRating();
console.log("\nAfter sorting by decreasing rating:");
library.printAll();

library.addFilm(new Film("Dune"));
console.log("\nAfter insertion of Dune:");
library.printAll();

library.updateRating(6, 2);
console.log("\nAfter updating rating:");
library.printAll();

library.removeFilm(6);
console.log("\nAfter removing film with id = 6:");
library.printAll();