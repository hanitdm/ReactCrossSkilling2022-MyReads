import React from 'react'
//import ReactDOM from 'react-dom'
import { useState, useEffect } from "react";
//import { Route, Routes, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import BooksList from "./comps/main/C1ListBooks";
import BooksSearch from "./comps/search/C2SearchBooks";
import "./App.css";
import * as BooksAPI from "./utils/BooksAPI";
//import shelfTypes from "./comps/Constants";
//import allBooks from "./utils/AllBooksDB";  //!!!!! Change to API

const App = () => {
	//let appNav = useNavigate();
	console.log("Headers : ", BooksAPI.headers);	//!!!!! Remove Export in API
	const [allShelvesBooks, setAllShelvesBooks] = useState([]);

	const handleBookMove = (movedBook, newShelf) => {
		movedBook.shelf = newShelf;
        const updateBookShelf = async (bookForUpdate) => {
            const update_Resp = await BooksAPI.update(bookForUpdate, newShelf);
			console.log("update_Resp:", update_Resp);
			if (!update_Resp || update_Resp.error)
				return;
			//update_Resp is JSON object with 3 key(shelve): array['book.id', ...]
			//Reconstructing the allShelvesBooks array from update response,
			//while adding any new book added to database :: (may be concurrent user in another place added it since last time getAll called)
			let newAllShelvesBooks = allShelvesBooks.filter(asBook => {
				const bookIsInOneShelfHere = Object.entries(update_Resp).map(([shelfName, bookIds]) => {
					//console.log("asBook.id:", asBook.id, ", shelfName:", shelfName);
					if (bookIds) {
						let indexOfId = bookIds.indexOf(asBook.id);
						if(indexOfId > -1) {
							//console.log("bookIds", bookIds);
							asBook.shelf = shelfName;
							bookIds[indexOfId] = null;	//Only Left Items will be retrieved using API.get
							//console.log("bookIds - removed key: ", bookIds);
							return asBook.id;
						}
					}
					return null;
				});
				//console.log("update_Resp-processed:", update_Resp);
				//console.log("bookIsInOneShelfHere:", bookIsInOneShelfHere);

				return bookIsInOneShelfHere.includes(asBook.id);
			});
			//console.log("newAllShelvesBooks:", newAllShelvesBooks);

			//let missingBooksRetrieved = [];
			Object.values(update_Resp).forEach(bookIds => {
				console.log(bookIds);
				bookIds.filter(bookId => (bookId !== null)).forEach(bookId => {
					const getMissingBook = async () => {
						const respMissingBook = await BooksAPI.get(bookId);
						if (respMissingBook && !respMissingBook.error) {
							console.log("MissingBookRetrieved:", respMissingBook);
							newAllShelvesBooks = newAllShelvesBooks.concat(respMissingBook);
							console.log("newAllShelvesBooks-Concated:", newAllShelvesBooks);
							setAllShelvesBooks(newAllShelvesBooks);
						}
					};
					getMissingBook();
				});
			});
			//return newAllShelvesBooks;
			console.log("newAllShelvesBooks-Final:", newAllShelvesBooks);
			setAllShelvesBooks(newAllShelvesBooks);
		};
		updateBookShelf(movedBook);
    };

	/* const handleBookMoveInSearch = (book, newShelf) => {
		handleBookMoveInMain(book, newShelf);
		//book.shelf = newShelf;
		//const booksOnAllShelves1 = allBooks.books.map((book)=>book);
		//setAllShelvesBooks(booksOnAllShelves1);
    }; */

	useEffect(()=> {
		const getAllBooksFromAPI = async () => {
			const getAll_Resp = await BooksAPI.getAll();
			if (getAll_Resp && !getAll_Resp.error) {
				setAllShelvesBooks(getAll_Resp);
				console.log("getAll_Resp:", getAll_Resp);
			}
		};
		//Call the async function
		getAllBooksFromAPI();
	}, []);

	return (
		<Routes className="app">
			<Route
				exact path="/"
				element={
					<BooksList
						AllShelvesBooks={allShelvesBooks}
						onBookMoved={handleBookMove}
					/>}
			/>

			<Route
				path="/search"
				element={
					<BooksSearch
						AllShelvesBooks={allShelvesBooks}
						onBookMoved={handleBookMove}
				/>}
			/>
		</Routes>
	);
};

export default App;
