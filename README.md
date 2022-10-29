# MyReads Project
## Udacity - EgFWD - React Development Cross-Skilling Nanodegree Program
### October 2022 Cohort
### By: Hani AbdelAal (hanitdm@yahoo.com)

This application has two pages. First page is the main page which displays a list of "shelves" (i.e. categories), each of which contains a number of books.
### The three shelves are:
- Currently Reading
- Want to Read
- Read

The second page is built to enable dynamic search for new books, adding any book to one of the three shelves, and option to change shelves for selected books.
Both pages can navigate to each other smoothly.

## Installation Steps for testing and development on your environment

First clone the project to your development environment:
- install all project dependencies with `npm install`
- start the development server with `npm start`

## What You're Getting

```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── comps # project components.
    │   ├── main    # main page components.
    │   │   ├── C1ListBooks.js
    │   │   ├── C11ListShelves.js
    │   │   ├── C12AddBook.js
    │   │   └── C111FillShelve.js
    │   ├── search   # search page components.
    │   │   └── C2SearchBooks.js
    │   ├── book # shared book components.
    │   │   ├── C3BookShow.js
    │   │   └── C31BookControl.js
    |   └── constants.js    # shared constants.
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.

```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.