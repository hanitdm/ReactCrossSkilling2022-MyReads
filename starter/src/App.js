import React from 'react'
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BooksList from "./comps/main/C1ListBooks";
import BooksSearch from "./comps/search/C2SearchBooks";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

const App = () => {
	const [allShelvesBooks, setAllShelvesBooks] = useState([]);

	const handleBookMove = (movedBook, newShelf) => {
		movedBook.shelf = newShelf;
        const updateBookShelf = async (bookForUpdate) => {
            const update_Resp = await BooksAPI.update(bookForUpdate, newShelf);
			if (!update_Resp || update_Resp.error)
				return;
			//update_Resp is JSON object with 3 key(shelve): array['book.id', ...]
			//Reconstructing the allShelvesBooks array from update response,
			//while adding any new book added to database :: (may be concurrent user in another place added it since last time getAll called)
			let newAllShelvesBooks = allShelvesBooks.filter(asBook => {
				const bookIsInOneShelfHere = Object.entries(update_Resp).map(([shelfName, bookIds]) => {
					if (bookIds) {
						let indexOfId = bookIds.indexOf(asBook.id);
						if(indexOfId > -1) {
							asBook.shelf = shelfName;
							bookIds[indexOfId] = null;	//Only Left Items will be retrieved using API.get
							return asBook.id;
						}
					}
					return null;
				});
				return bookIsInOneShelfHere.includes(asBook.id);
			});

			Object.values(update_Resp).forEach(bookIds => {
				bookIds.filter(bookId => (bookId !== null)).forEach(bookId => {
					const getMissingBook = async () => {
						const respMissingBook = await BooksAPI.get(bookId);
						if (respMissingBook && !respMissingBook.error) {
							newAllShelvesBooks = newAllShelvesBooks.concat(respMissingBook);
							setAllShelvesBooks(newAllShelvesBooks);
						}
					};
					getMissingBook();
				});
			});
			setAllShelvesBooks(newAllShelvesBooks);
		};
		updateBookShelf(movedBook);
    };

	useEffect(()=> {
		let mounted = true;
		const getAllBooksFromAPI = async () => {
			const getAll_Resp = await BooksAPI.getAll();
			if (mounted && getAll_Resp && !getAll_Resp.error) {
				setAllShelvesBooks(getAll_Resp);
			}
		};
		getAllBooksFromAPI();

		return () => { mounted = false };
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
