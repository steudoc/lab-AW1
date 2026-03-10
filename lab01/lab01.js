import dayjs from "dayjs"

let nextId = 1;

function Film(title, favorite=false, watchDate=null, rating=null, userId=1) {
    if (!title) {
        throw new Error('Title is mandatory');
    }
    this.id = nextId++;
    this.title = title;
    this.favorite = favorite;
    // saved as dayjs object only if watchDate is truthy
    this.watchDate = watchDate && dayjs(watchDate);
    this.rating = rating;
    this.userId = userId; 

    this.toString = () => {
        console.log(`Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${this.watchDate===null ? "null" : this.watchDate.format("MMMM D, YYYY")}, Rating: ${this.rating}, User id: ${this.userId}`);
    }
}

function FilmLibrary() {
    this.films = []

    this.addFilm = (film) => {
        if(!this.films.some(f => f.id == film.id))
            this.films.push(film);
        else
            console.log("Duplicated film!");
    }

    this.printAll = () => {
        this.films.forEach(film => {
            film.toString();
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

    this.removeFilm = (id) => {
        const newList = this.films.filter(function(film) {
            return film.id !== id;
        });
        this.films = newList;
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