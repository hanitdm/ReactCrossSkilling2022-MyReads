import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import BookShow from "../book/C3BookShow";
//import searchBooks from "../../utils/SearchBooksDB";  //!!!!! Change to API
import * as BooksAPI from "../../utils/BooksAPI";



const BooksSearch = ({ onBookMoved }) => {

	const [query, setQuery] = useState("");
	const [searchedBooks, setSearchedBooks] = useState([]);

	const handleBookMoveInSearch = (book, newShelf) => {
		//book.shelf = newShelf;
		/////////// Update API
		onBookMoved(book, newShelf);
		//const searchedBooks1 = searchBooks.books.map((book)=>book);
		//setSearchedBooks(searchedBooks1);
    }

    const UpdateQuery = (query) => {
        setQuery(query.trim());
		const GetSearchBooks = async () => {
			if (query !== "") {
				await BooksAPI.search(query, 20).then((respSearch)=>{
					console.log(respSearch);
					if (respSearch && !respSearch.error) {
						setSearchedBooks(respSearch);
					}
					else
						setSearchedBooks([]);
				});
			}
			else
				setSearchedBooks([]);
		};
		//Call the async function
		GetSearchBooks();
	}

	return (
        <div className="search-books">
			<div className="search-books-bar">
            	<Link className="close-search" to="/">Close</Link>
            	<div className="search-books-input-wrapper">
              		<input
                		type="text"
                		placeholder="Search by title, author, or ISBN"
						value={query}
                		onChange={(e) => UpdateQuery(e.target.value)}
              		/>
            	</div>
          	</div>
          	<div className="search-books-results">
            	<ol className="books-grid">
            	{
					(query !== "") && (Array.isArray(searchedBooks)) &&
					searchedBooks.map(book => (
                	<li key={book.id}>
                  	<BookShow
                    	Book={book}
                    	onBookMoved={handleBookMoveInSearch}
                  	/>
                	</li>
              		))
            	}
            	</ol>
          	</div>
        </div>
    )
};

BooksSearch.propTypes = {
	onBookMoved: PropTypes.func.isRequired
};

export default BooksSearch;