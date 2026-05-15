import Film from "../../../server/Film";

const SERVER_URL = "http://localhost:3001";

// 1. Retrieve the list of all available films
// GET /api/films
const getFilms = async () => {
    const response = await fetch(SERVER_URL + "/api/films");
    if (response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userid));
    } else {
        throw new Error("Internal server error");
    }
}

// 2. Retrieve a film, given its "id".
// GET /api/films/<id>
const getFilmById = async (id) => {
  const response = await fetch(`${SERVER_URL}/api/films/${id}`);
  if (response.ok) {
    const filmJson = await response.json();
    return new Film(filmJson.id, filmJson.title, filmJson.isFavorite, filmJson.watchDate, filmJson.rating, filmJson.userId);
  } else {
    throw new Error("Internal server error");
  }
}

// 3. Create a new film, by providing all relevant information
// POST /api/films
const addFilm = async (film) => {
    const response = await fetch(`${SERVER_URL}/api/films`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title: film.title, isFavorite: film.isFavorite, watchDate: film.watchDate, rating: film.rating, userId: film.userId}),
        credentials: "include"
    });
    
    // TODO: migliorare gestione errori
    if(!response.ok) {
    let errMessage = await response.json();
    if(response.status === 422)
      errMessage = `${errMessage.errors[0].msg} for ${errMessage.errors[0].path}.`
    else
      errMessage = errMessage.error;
    throw errMessage;
    }
    else return null;
}

// 4. Update an existing film, by providing all the relevant information
// PUT /api/films/<id>
const updateFilm = async (film) => {
  const response = await fetch(`${SERVER_URL}/api/films/${film.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title: film.title, isFavorite: film.isFavorite, watchDate: film.watchDate, rating: film.rating, userId: film.userId}),
    credentials: "include"
  });

  if(!response.ok) {
    let errMessage;
    try {
      const errorBody = await response.json();
      if(response.status === 422) {
        const keys = Object.keys(errorBody.validationErrors);
        errMessage = errorBody.validationErrors[keys[0]];
      } else
        errMessage = errorBody.error ?? `Unexpected error (status ${response.status})`;
    } catch {
      errMessage = `Unexpected error (status ${response.status})`;
    }
    throw Error(errMessage);
  }
  else return null;
}

// 5. Mark an existing film as favorite/unfavorite
// PUT /api/films/<id>/favorite
const favoriteFilm = async (id, isFavorite) => {
  const response = await fetch(`${SERVER_URL}/api/films/${id}/favorite`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isFavorite }),
    credentials: "include"
  });

  if(!response.ok) {
    let errMessage;
    try {
      const errorBody = await response.json();
      if(response.status === 422)
        errMessage = `${errorBody.errors[0].msg} for ${errorBody.errors[0].path}.`
      else
        errMessage = errorBody.error ?? `Unexpected error (status ${response.status})`;
    } catch {
      errMessage = `Unexpected error (status ${response.status})`;
    }
    throw Error(errMessage);
  }
  else return null;
}

// 6. Update the rating of a specific film
// PUT /api/films/<id>/rating 
const rateFilm = async (id, rating) => {
  const response = await fetch(`${SERVER_URL}/api/films/${id}/rating`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating }),
    credentials: "include"
  });

  // TODO: migliorare gestione errori
  if(!response.ok) {
    let errMessage = await response.json();
    if(response.status === 422)
      errMessage = `${errMessage.errors[0].msg} for ${errMessage.errors[0].path}.`
    else
      errMessage = errMessage.error;
    throw errMessage;
  }
  else return null;
}

// 7. Delete an existing film, given its id
// DELETE /api/films/<id>
const deleteFilm = async (id) => {
  const response = await fetch(`${SERVER_URL}/api/films/${id}`, {
    method: "DELETE",
    credentials: "include"
  });

  // TODO: migliorare gestione errori
  if(!response.ok) {
    let errMessage = await response.json();
    if(response.status === 422)
      errMessage = `${errMessage.errors[0].msg} for ${errMessage.errors[0].path}.`
    else
      errMessage = errMessage.error;
    throw errMessage;
  }
  else return null;
}

const API = { getFilms, getFilmById, addFilm, updateFilm, favoriteFilm, rateFilm, deleteFilm };
export default API;