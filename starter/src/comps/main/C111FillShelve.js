import React from "react";
import PropTypes from "prop-types";
import BookShow from "../book/C3BookShow";

const ShelveFill = ({ShelfType, BooksOnShelf, onBookMoved}) => {
    return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{ShelfType.title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
				{
					BooksOnShelf.map(book => (
						<li key={book.id}>
							<BookShow
								key={book.id}
								Book={book}
								onBookMoved={onBookMoved}
							/>
						</li>
					))
				}
				</ol>
			</div>
	  </div>
	);
};

ShelveFill.propTypes = {
    ShelfType: PropTypes.object.isRequired,
	BooksOnShelf: PropTypes.array.isRequired,
	onBookMoved: PropTypes.func.isRequired
};

export default ShelveFill;