# `FilmLibrary-server`

The `FilmLibrary-server` is the server-side app companion for FilmLibrary. It presents some APIs to perform some CRUD operations on films.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### Summary
- Retrieve the list of all the available films `GET /films`
- Retrieve a list of all the favorite films `GET /films/favorites`
- Retrieve a list of all the most rated films `GET /films/bests`
- Retrieve a list of all the films seen in the last month `GET /films/last_month`
- Retrieve all the unseen films `GET /films/unseen`
- Retrieve a film given its id `GET /films/<id>`
- Create a new film `POST /films`
- Update an existing film `PUT /films/<id>`
- Update rating of an existing film `PATCH /films/<id>/rate`
- Mark an existing film as favorite/unfavorite `PATCH /films/<id>/favorite`
- Delete an existing film given its id `DELETE /films/<id>`

### __List the films__

URL: `/api/films`

HTTP Method: GET

Description: Retrieve all the available films.

Response: `200 OK` (success) or `500 Internal Server Error` (failure). In case of success, returns an array of films in JSON format (see below); otherwise, an error message.

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "rating": 5,
    "watchDate": "2026-03-10",
    "userId": 1
  },
  ...
]
```

### __List favorite films__

URL: `/api/films/favorites`

HTTP Method: GET

Description: Retrieve all the favorite films.

Response: `200 OK` (success) or `500 Internal Server Error` (failure). In case of success, returns an array of films in JSON format (see below); otherwise, an error message.

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "rating": 5,
    "watchDate": "2026-03-10",
    "userId": 1
  },
  ...
]
```

### __List most rated films__

URL: `/api/films/bests`

HTTP Method: GET

Description: Retrieve all the most rated films (those rated 5 out of 5).

Response: `200 OK` (success) or `500 Internal Server Error` (failure). In case of success, returns an array of films in JSON format (see below); otherwise, an error message.

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "rating": 5,
    "watchDate": "2026-03-10",
    "userId": 1
  },
  ...
]
```

### __List films seen in the last month__

URL: `/api/films/last_month`

HTTP Method: GET

Description: Retrieve all the films seen in the last month.

Response: `200 OK` (success) or `500 Internal Server Error` (failure). In case of success, returns an array of films in JSON format (see below); otherwise, an error message.

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "rating": 5,
    "watchDate": "2026-03-10",
    "userId": 1
  },
  ...
]
```

### __List unseen films__

URL: `/api/films/unseen`

HTTP Method: GET

Description: Retrieve all the unseen films.

Response: `200 OK` (success) or `500 Internal Server Error` (failure). In case of success, returns an array of films in JSON format (see below); otherwise, an error message.

Response body:
```
[
  {
    "id": 1,
    "title": "Star wars",
    "isFavorite": 0,
    "rating": null,
    "watchDate": null,
    "userId": 1
  },
  ...
]
```

### __Get a single film__

URL: `/api/films/<id>`

HTTP Method: GET

Description: Retrieve the film identified by <id>.

Response: `200 OK` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure). In case of success, returns a question in JSON format (see below); otherwise, an error message.

Response body:
```
{
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "rating": 5,
    "watchDate": "2026-03-10",
    "userId": 1
}
```

### __Create a new film__

URL: `/api/films`

HTTP Method: POST

Description: Create a new film represented by id.

Request body:
```
{
    "title": "Avatar",
    "isFavorite": 0,
    "rating": null,
    "watchDate": null,
    "userId": 1
}
```

### __Update an existing film__

URL: `/api/films/<id>`

HTTP Method: PUT

Description: Update the film identified by id.

Request body:
```
{
    "title": "Avatar",
    "isFavorite": 0,
    "rating": null,
    "watchDate": null,
    "userId": 1
}
```

Response: `200 OK` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure). If the request body isn't valid, `422 Unprocessable Entity` (validation error).

### __Update rating of a film__

URL: `/api/films/<id>/rate`

HTTP Method: PATCH

Description: Update the rating of the film identified by <id>.

Request body:
```
{
  "rating": 3
}
```

Response: `204 No content` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure). If the request body isn't valid, `422 Unprocessable Entity` (validation error).

### __Mark film as favorite/unfavorite__

URL: `/api/films/<id>/favorite`

HTTP Method: PATCH

Description: Mark as favorite/unfavorite the film identified by id.

Request body:
```
{
  "isFavorite": 1
}
```

Response: `204 No content` (success), `404 Not Found` (failure, if id doesn't exists) or `500 Internal Server Error` (failure). If the request body isn't valid, `422 Unprocessable Entity` (validation error).

### __Delete a film__

URL: `/api/films/<id>/delete`

HTTP Method: DELETE

Description: Delete and existing film given its id.

Response `200 OK` (success), `404 Not Found` (failure, if id doesn't exists) or `500 Internal Server Error`.
# Lab 03 - APIs with Express

This repository contains a proposed solution for the third laboratory of the courses. Specifically, this README includes an overview of the files contained in the `solution` folder and a description of each API offered by the server.

## File overview

- `server.js`: the main file of the server. It defines all the API endpoints and behavior. It interacts with the database and returns to the client the desired data.
- `db.js`: it opens the database. It has to be imported (e.g., by `dao-film.js`) to interact with the db.
- `dao-films.js`: it contains all the method for interacting with the database (specifically, to interact with the `film` table).
- `films.js`: the same data model for Film objects used in the previous labs.
- `test-api.http`: this file can be used for testing the API with a dedicated Visual Studio Code extension.

## List of APIs offered by the server

### Film Management

#### Get all films

HTTP method: `GET`  URL: `/api/films`

- Description: Get the full list of films or the films that match the query filter parameter
- Request body: _None_
- Request query parameter: _filter_ name of the filter to apply (filter-all, filter-favorite, filter-best, filter-lastmonth, filter-unseen)
- Response: `200 OK` (success)
- Response body: Array of objects, each describing one film:

  ``` json
  [
    {
      "id": 1,
      "title": "Pulp Fiction",
      "favorite": true,
      "watchDate": "2023-03-11",
      "rating": 5,
      "userId": 1
    },
    {
      "id": 2,
      "title": "21 Grams",
      "favorite": true,
      "watchDate": "2023-03-17",
      "rating": 4,
      "userId": 1
    },
    ...
  ]
  ```

- Error responses:  `500 Internal Server Error` (generic error)

#### Get film by id

HTTP method: `GET`  URL: `/api/films/:id`

- Description: Get the film corresponding to the id 
- Request body: _None_
- Response: `200 OK` (success)
- Response body: One object describing the required film:

  ``` JSON
  [
    {
      "id": 2,
      "title": "21 Grams",
      "favorite": true,
      "watchDate": "2023-03-17",
      "rating": 4,
      "userId": 1
    }
  ]
  ```

- Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable)

#### Add a new film

HTTP method: `POST`  URL: `/api/films`

- Description: Add a new film to the films of a specified user
- Request body: description of the object to add

  ``` JSON
  {
      "title": "21 Grams",
      "favorite": true,
      "watchDate": "2023-03-17",
      "rating": 4,
      "userId": 1
  }
  ```

- Response: `200 OK` (success)
- Response body: the entire representation of the newly-added film

- Error responses: `404 Not Found` (not present or unavailable), `422 Unprocessable Entity` (invalid input), `503 Service Unavailable` (database error)

#### Update an existing film

HTTP method: `PUT`  URL: `/api/films/:id`

- Description: Update values of an existing film, except the id
- Request body: description of the object to update

  ``` JSON
  {
      "title": "The Matrix",
      "favorite": true,
      "watchDate": "2023-03-31",
      "rating": 5,
      "userId": 1
  }
  ```

- Response: `200 OK` (success)
- Response body: the entire representation of the newly-added film

- Error responses: `404 Not Found` (not present or unavailable), `422 Unprocessable Entity` (invalid input), `503 Service Unavailable` (database error)

#### Delete an existing film

HTTP method: `DELETE`  URL: `/api/films/:id`

- Description: Delete an existing film
- Request body: _None_

- Response: `200 OK` (success)
- Response body: _None_

- Error responses:  `404 Not Found` (not present or unavailable), `503 Service Unavailable` (database error)

#### Update whether a film is favorite

HTTP method: `PUT`  URL: `/api/films/:id/favorite`

- Description: Update favorite value of an existing film 
- Request body: value of the favorite property

  ``` JSON
  {
      "favorite": true,
  }
  ```

- Response: `200 OK` (success)
- Response body: the object as represented in the database

- Error responses: `404 Not Found` (not present or unavailable), `422 Unprocessable Entity` (invalid input), `503 Service Unavailable` (database error)

#### Update the rating of an existing film 

HTTP method: `PUT`  URL: `/api/films/:id/rating`

- Description: Update the rating of an existing film 
- Request body: value of the rating property

  ``` JSON
  {
      "rating": 5,
  }
  ```

- Response: `200 OK` (success)
- Response body: the object as represented in the database

- Error responses: `404 Not Found` (not present or unavailable), `422 Unprocessable Entity` (invalid input), `503 Service Unavailable` (database error)
