import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import * as BooksAPI from "../../utils/BooksAPI";
//import { Link } from "react-router-dom";

const BookControl = ({Book, onBookMoved}) => {

    const [currBookShelf, setCurrBookShelf] = useState(Book.shelf);
    const handleShelfChange = (newShelf) => {
        const updateBookShelf = async (book) => {
            //await BooksAPI.update(book.id, newShelf);
            console.log("book in updateBookShelf : ", book);
            onBookMoved(book, newShelf);
            setCurrBookShelf(newShelf);
        }
        updateBookShelf(Book);
    }
    //
    useEffect(()=> {
        // Set async function
        const AdjustBookShelf = async () => {
            const respBook = await BooksAPI.get(Book.id);
            if (respBook && !respBook.error) {
                setCurrBookShelf(respBook.shelf);
                console.log(respBook.shelf);
            }
        };
        //Call the async function
        !Book.shelf && AdjustBookShelf();
    }, [Book]);
    //
    return (
        <select
            value={currBookShelf? currBookShelf : 'none'}
            onChange={(e=>handleShelfChange(e.target.value))}
        >
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {(currBookShelf !== 'none') && <option value="none">None</option>}
        </select>
    )
};

BookControl.propTypes = {
    Book: PropTypes.object.isRequired,
    onBookMoved: PropTypes.func.isRequired
};

export default BookControl;