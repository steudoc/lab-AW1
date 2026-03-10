/* 
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I 2025/2026
 * Lab 01
 */

import dayjs from "dayjs";


function Film(id, title, isFavorite = false, watchDate = null, rating = null, userId = 1) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  // saved as dayjs object only if watchDate is truthy
  this.watchDate = watchDate && dayjs(watchDate);
  this.userId = userId

  this.toString = () => {
    return `Id: ${this.id}, ` +
    `Title: ${this.title}, Favorite: ${this.favorite}, ` +
    `Watch date: ${this.watchDate}, Score: ${this.rating}, ` +
    `User: ${this.userId}` ;
  }
}


function FilmLibrary() {
  this.films = [];

  this.addFilm = (film) => {
    if(!this.films.some(f => f.id == film.id))
        this.films.push(film);
    else
        console.log("Duplicated film");
  };

  this.deleteFilm = (id) => {
    const newList = this.films.filter(function(film, index, arr) {
      return film.id !== id;
    })
    this.films = newList;
  }

  this.updateRating = (id, rating) => {
    this.films.forEach(film => {
        if(id && film.id == id)
            film.rating = rating
    });
  }

  this.sortByDate = () => {
    const newArray = [...this.films];
    newArray.sort((f1, f2) => {
        if(!f1.watchDate) return  1;   // null watchDate is the lower value
        if(!f2.watchDate) return -1;
        return f1.watchDate.diff(f2.watchDate, 'day')
    });
    return newArray;
  }
  this.sortByRating= () => {
    const newArray = [...this.films];
    newArray.sort((f1, f2) => {
        if(!f1.rating) return  1;   // null rating is the lower value
        if(!f2.rating) return -1;
        return f1.rating - f2.rating
    });
    return newArray;
  }

}


function main() {
    // Creating some film entries
    const pulpFiction = new Film(1, "Pulp Fiction", true, "2024-03-10", 5);
    const grams21 = new Film(2, "21 Grams", true, "2024-03-17", 4);
    const starWars = new Film(3, "Star Wars", false);
    const matrix = new Film(4, "Matrix", false);
    const shrek = new Film(5, "Shrek", false, "2024-03-21", 3);
    
    // Adding the films to the FilmLibrary
    const library = new FilmLibrary();
    library.addFilm(pulpFiction);
    library.addFilm(grams21);
    library.addFilm(starWars);
    library.addFilm(matrix);
    library.addFilm(shrek);

    // Print Sorted films (by date)
    console.log("***** List of films (sorted by date) *****");
    const sortedFilmsByDate = library.sortByDate();
    sortedFilmsByDate.forEach((film) => console.log(film.toString()));
    
    // Print Sorted films (by rating)
    console.log("***** List of films (sorted by rating) *****");
    const sortedFilmsByRating = library.sortByRating();
    sortedFilmsByRating.forEach((film) => console.log(film.toString()));

    // Deleting film #3
    library.deleteFilm(3);

    // Printing modified Library
    console.log("***** List of films *****");
    library.films.forEach((item) => console.log(item.toString()));

    // Update rating of film 4
    library.updateRating(4, 5);
    // Printing modified Library
    console.log("***** List of films *****");
    library.films.forEach((item) => console.log(item.toString()));
}

main();
