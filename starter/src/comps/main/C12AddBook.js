import React from "react";
import { Link } from "react-router-dom";

const BookAdd = () => {
    return (
        <div className="open-search">
            <Link to="/search" className="add-contact">Add a book</Link>
        </div>
    );
};

export default BookAdd;