import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import * as BooksAPI from "../../BooksAPI";

const BookControl = ({Book, onBookMoved}) => {

    const [currBookShelf, setCurrBookShelf] = useState(Book.shelf);
    const handleShelfChange = (newShelf) => {
        const updateBookShelf = async (book) => {
            onBookMoved(book, newShelf);
            setCurrBookShelf(newShelf);
        }
        updateBookShelf(Book);
    }
    //
    useEffect(()=> {
        let mounted = true;
        // Set async function
        const AdjustBookShelf = async () => {
            const respBook = await BooksAPI.get(Book.id);
            if (mounted && respBook && !respBook.error) {
                setCurrBookShelf(respBook.shelf);
            }
        };
        //Call the async function
        !Book.shelf && AdjustBookShelf();

        return () => { mounted = false };
    }, [Book]);
    //
    return (
        <select
            value={currBookShelf? currBookShelf : 'none'}
            onChange={(e=>handleShelfChange(e.target.value))}
        >
            <option value="moveto" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {<option value="none">None</option>}
        </select>
    )
};

BookControl.propTypes = {
    Book: PropTypes.object.isRequired,
    onBookMoved: PropTypes.func.isRequired
};

export default BookControl;