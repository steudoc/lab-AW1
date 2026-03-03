# 01UDF/01TXY Web Applications I (2025/2026)

## Lab 1: Getting Started with Node.js

In this lab, you will become familiar with JavaScript by putting into
practice what you have seen in the last lectures.

------------------------------------------------------------------------

## 1. Create a Film Library

In this exercise, you will implement a simple application to track the films that a person wants to watch and the ones they have already watched. Each film is represented by the following fields:

-   **Id**: unique numerical id (mandatory)
-   **Title**: string (mandatory)
-   **Favorite**: boolean (mandatory, default: `false`)
-   **Watch date**: date (optional)
-   **Rating**: number between 1 and 5 (optional)
-   **User id**: numerical id (mandatory, default: `1`)

### Step 1: Film Constructor

Implement a constructor function to create `Film` objects.

### Step 2: FilmLibrary Constructor

Implement a constructor function to create a `FilmLibrary` object containing an array of films.

### Step 3: Add Films

Implement a method that adds a new `Film` object to the `FilmLibrary`.

Populate the `FilmLibrary` using this method.

### Step 4: Print Films

Print the entire list of films stored in the `FilmLibrary`, including all their fields.

#### Example Output     
    Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2025, Rating: 5, User id: 1
    Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2025, Rating: 4, User id: 1
    Id: 3, Title: Star Wars, Favorite: false, Watch date: null, Rating: null, User id: 1
    Id: 4, Title: Matrix, Favorite: false, Watch date: null, Rating: null, User id: 1
    Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2025, Rating: 3, User id: 1

### Hints

-   Use the **day.js** library to handle dates.
-   Use the **functional programming paradigm** to manipulate the array of films.

------------------------------------------------------------------------

## 2. Add Functionalities to the Film Library

Extend the `FilmLibrary` object with the following functionalities:

### 1. Sort by Date

Sort films by **ascending watch date**.

-   Unwatched films must be placed at the end.

#### Example Output

    Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2025, Rating: 5, User: 1
    Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2025, Rating: 4, User: 1
    Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2025, Rating: 3, User: 1
    Id: 3, Title: Star Wars, Favorite: false, Watch date: null, Rating: null, User: 1
    Id: 4, Title: Matrix, Favorite: false, Watch date: null, Rating: null, User: 1

------------------------------------------------------------------------

### 2. Sort by Rating

Sort films by **decreasing rating**.

-   Films without a rating must be placed at the end.

#### Example Output

    Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2025, Rating: 5, User: 1
    Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2025, Rating: 4, User: 1
    Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2025, Rating: 3, User: 1
    Id: 3, Title: Star Wars, Favorite: false, Watch date: null, Rating: null, User: 1
    Id: 4, Title: Matrix, Favorite: false, Watch date: null, Rating: null, User: 1

------------------------------------------------------------------------


### 3. Remove a Film

Remove a film from the `FilmLibrary` given its id.

------------------------------------------------------------------------

### 4. Update Rating

Update the rating of a film with a given id in the `FilmLibrary`.

------------------------------------------------------------------------

### Final Step

Test all the methods by invoking them on the `FilmLibrary` instance created and populated in Exercise 1.
