# Applicazioni Web I / Web Applications I [2025/2026]

## Lab 8: APIs integration

In this lab, you will **update the back-end** implemented in [Lab 3](https://github.com/polito-webapp1/lab-2026/tree/main/lab03) to enable authentication functionalities. Then, you will **update the front-end** of FilmLibrary to fetch, display and modify the list of films from the server using the designed APIs.

## 0. Configure CORS

Add and configure **CORS** on your **back-end** server to make all the APIs available for the front-end following the two server configuration as seen in class.

## 1. Login and logout your users

You will add enable users to **authenticate** (i.e., login and logout functionalities) for managing their films. Non-authenticated users won’t see a list of films anymore.
- In the front-end, add a new page (with a dedicated route) with a form, which will be used to log in. The page should be well structured in terms of needed components and appropriate states. The login form will have two mandatory fields: **email** and **password**. The login form should be validated before its submission, and you must use proper error messages when inconsistencies are found. Specifically, at least the following checks should be executed: 
    - When a field is missing or empty it must be forbidden to send a log-in request to the server. 
    - The email should be properly formatted (i.e., something@something.something). 
- In Express, implement the login process by exploiting the [Passport authentication middleware](https://www.passportjs.org/).
    - Add a new user in the database using your personal data as username name.surname@polito.it. Choose a password for that user. **Beware**: do not store **plain text passwords** in the database! 
        - Use **scrypt** (see the notes) to generate a hash of the passwords before saving them. 
        - Each password MUST have a **different salt**! 
    - Create at least three new films in the database and assign them to the newly created user. 
- When the login process **fails**, the front-end should display a suitable error message (e.g., “Incorrect username or password”) and continue to show the login form. Instead, when the login is **successful**, the application redirects the users to their film list page, showing a message like:  “Welcome, {name_of_the_user}”. 
- Identify the routes that need to be authenticated (e.g., those to get or modify the list of films) and protect them accordingly. Non-authenticated users must not see any film, meanwhile authenticated users must see **only** their films. 
- Implement the **logout** functionality, again by exploiting the Passport authentication middleware. When the users are logged out, redirect them to the login form.

## 2. Film list

Modify the FilmLibrary React application so that: 
- When the application's home page loads after log-in, **user's films are gathered from the server** by invoking the corresponding API endpoint. The retrieved data must be **stored in the application’s state**. 
- When the user clicks on a filter, the list of **filtered films is gathered from the server** by invoking the corresponding API endpoint. The films must be filtered directly on the server side.

## 3. Add a new film

When the user adds a new film, it must be **saved on the server-side database**, and the displayed list of films must be updated accordingly. To do so, invoke the proper API endpoint for adding films, and then retrieve the updated list of films from the server. In this way you will be sure that client and server side are always aligned.

## 4. Edit a film

Make the update operations persistent: when the user updates a film through its dedicated edit form, the film is **modified on the server-side database**, and the list of films is updated and displayed accordingly. To do so, invoke the proper API for updating a film, and then retrieve the updated list of films from the server.

## 5. Optional: Delete films and in-line editing

- Make the deletion persistent: when the user deletes a film, the **film is removed from the server-side database**, and the list of films is updated and displayed accordingly. To do so, invoke the proper API for deleting a film, and then retrieve the updated list of films from the server. 
- Users should have the possibility of changing some values “in-line”:
    - The favorite property through the checkbox displayed near each film in the list. 
    - The rating property through the displayed stars. For instance, if the film is rated two out of five and the user clicks on the fourth star, the new rating becomes four out of five.
    **Beware**: if the user clicks on the current assigned rate, you should not trigger an update in the back end.

## Notes

A possible solution of the Lab 3 (API server) is available at https://github.com/polito-webapp1/lab-2026/tree/main/lab03.

The password of the users already inserted into the database from the solution of Lab 3 is `password`.

You can use the following website to generate the hash of a password, according to scrypt: https://www.browserling.com/tools/scrypt. If you need to generate a salt by hand, you can use https://www.browserling.com/tools/random hex, considering the length of the generated hex as the one of the salt (e.g., 16).

Create a back-up copy of the database before testing your APIs.

Trust the server! It shall be always up-to-date, and every operation rely on it, not on the internal state of the web application.