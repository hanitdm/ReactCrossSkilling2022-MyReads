import React from "react";
import PropTypes from "prop-types";
import ShelvesList from "./C11ListShelves";
import BookAdd from "./C12AddBook";

const BooksList = ({AllShelvesBooks, onBookMoved}) => {
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>

			<div className="list-books-content">
				<ShelvesList
					AllShelvesBooks={AllShelvesBooks}
					onBookMoved={onBookMoved}
				/>
			</div>

			<BookAdd />
		</div>
	)
};

BooksList.propTypes = {
	AllShelvesBooks: PropTypes.array.isRequired,
	onBookMoved: PropTypes.func.isRequired
};

export default BooksList;