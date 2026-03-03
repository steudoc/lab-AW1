import dayjs from "dayjs"

let nextId = 1;

function Film(title, favorite=false, date=null, rating=null, userId=1) {
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
}

const library = new FilmLibrary();

library.addFilm(new Film("Pulp Fiction", true, '2025-03-10', 5));
library.addFilm(new Film("21 Grams", true, '2025-03-17', 4));
library.addFilm(new Film("Star Wars"));
library.addFilm(new Film("Matrix"));
library.addFilm(new Film("Shrek", false, '2025-03-21', 3));

library.printAll();