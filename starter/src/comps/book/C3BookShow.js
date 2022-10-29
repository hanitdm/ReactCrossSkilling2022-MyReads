import React from "react";
import PropTypes from "prop-types";
import BookControl from "./C31BookControl";

const BookShow = ({Book, onBookMoved}) => {
    const bookImage = (Book.imageLinks && Book.imageLinks.thumbnail)
        ? `url("${Book.imageLinks.thumbnail}")`
        : '';

	return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:bookImage,
                    }}
                >
                </div>
                <div className="book-shelf-changer">
                    <BookControl
                        Book={Book}
                        onBookMoved={onBookMoved}
                    />
                </div>
            </div>
            <div className="book-title">{Book.title}</div>
            <div className="book-authors">
            {
                Book.authors &&
                Book.authors.map((auth, i) => (
                    <p key={`${Book.id}_${i}`} className="author-name-1">{auth + (i<Book.authors.length-1? ',' : '')}</p>
                ))
            }
            </div>
        </div>
    )
};

BookShow.propTypes = {
    Book: PropTypes.object.isRequired,
    onBookMoved: PropTypes.func.isRequired
};

export default BookShow;