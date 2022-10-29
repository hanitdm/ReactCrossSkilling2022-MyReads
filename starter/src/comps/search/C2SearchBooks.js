import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import BookShow from "../book/C3BookShow";
import * as BooksAPI from "../../BooksAPI";

const BooksSearch = ({ onBookMoved }) => {

	const [query, setQuery] = useState("");
	const [searchedBooks, setSearchedBooks] = useState([]);

	const handleBookMoveInSearch = (book, newShelf) => {
		onBookMoved(book, newShelf);
    }

    const UpdateQuery = (query) => {
        setQuery(query);
		const GetSearchBooks = async () => {
			if (query !== "") {
				await BooksAPI.search(query, 20).then((respSearch)=>{
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