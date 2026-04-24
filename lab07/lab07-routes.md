# 01UDFOV/01TXYOV Applicazioni Web I / Web Applications I [2025/2026]

## Lab 7: Multiple Pages in React

You will update your React-enabled FilmLibrary to support multiple "pages" (through routes). Optionally, you will also allow users to edit "in-line" previously inserted films.

---

### 1. Enable Routing through React Router

Update the FilmLibrary application to support multiple pages using React Router. Specifically:

- Show the form for entering and editing a film in **separate Routes**.
- Restructure the React application to implement each filter as a **separate Route**.

  > **Beware:** if the user reloads the webpage when the browser URL corresponds to the Route of a given filter, the application should use the URL to detect which is the current filter and automatically apply it when the page is ready.

- Design and implement a new page that allows users to log in to the FilmLibrary. In this lab, the login form does not actually work; it simply redirects users to the home page when the login button is clicked.

- Design and implement a new page layout to be rendered when the user enters an **invalid URL**.

Each of the routes described above should display the main graphical components specified in the previous labs. Specifically, the navigation bar, the sidebar with the filters, and the main content (which will change according to the selected route).

The "+" button for adding new films must **not** be displayed in the routes for adding or editing a film.

---

### 2. Optional: Manipulating Films In-line

- Enable users to **delete** films from the library by clicking on the trash icon (🗑) near each entry of the film library.

- Update the web application to give users the possibility of changing "in line" some film properties. For example:
  - The possibility of changing if a film is **favorite** or not by means of the related checkbox.
  - The possibility of changing the film's **rating** by clicking on the related stars. 

---

### Hints

1. Official documentation of React Router: [https://reactrouter.com/](https://reactrouter.com/)
