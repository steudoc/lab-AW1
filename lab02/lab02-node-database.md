# 01UDF/01TXY Web Applications I (2025/2026)

## Lab 2: Database integration


In this lab, you will integrate your JavaScript application with a local database. First, you will implement functions to retrieve data from the database. Then, you will implement functions to modify the stored data.

------------------------------------------------------------------------

## 1. Retrieve Data from the Database

The database includes a collection of films with fields detailed in the first lab.

Download the `films.db` database from the following link:

https://github.com/polito-webapp1/lab-2026/blob/main/lab02/films.db

Modify the program from the previous lab (you can either build upon your existing solution or use the Lab 1 solution as a starting point):

https://github.com/polito-webapp1/lab-2026/tree/main/lab01

Add the following features as **asynchronous methods** to the `FilmLibrary` for retrieving data from the database:

### Required methods

a. Retrieve all the stored films and return a **Promise** that resolves to an array of `Film` objects.

b. Retrieve all **favorite films** and return a **Promise** that resolves to an array of `Film` objects.

d. Retrieve films whose **watch date is earlier than a given date** passed as a parameter.  
Return a **Promise** that resolves to an array of `Film` objects.

f. Retrieve films whose **title contains a given string** passed as a parameter.
Return a **Promise** that resolves to an array of `Film` objects.

Finally, test the implemented methods by **calling them and printing the results**.

------------------------------------------------------------------------

## 2. Modify the Data Stored in the Database

Before starting this part, **make a copy of the local database file**, since the following operations will permanently modify its contents.

Add the following features as methods to the `FilmLibrary` object:

a. **Store a new movie** into the database.  
After completion, print a **success/failure message**.

b. **Delete a movie** from the database (using its **ID** as a reference).  
After completion, print a **success/failure message**.

c. **Delete the watch date of all films** stored in the database.  
After completion, print a **success/failure message**.

------------------------------------------------------------------------

# Notes

## SQLite module

As covered in the lectures, you can connect to an SQLite database using the following module:

https://www.npmjs.com/package/sqlite3

## Tools for browsing the database

To browse the content of the database, you can use one of the following tools:

### 1. VSCode SQLite extension

Download the Visual Studio Code SQLite extension:

https://marketplace.visualstudio.com/items?itemName=yy0931.vscode-sqlite3-editor

### 2. DB Browser for SQLite

Download the application:

https://sqlitebrowser.org/dl/
------------------------------------------------------------------------

