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