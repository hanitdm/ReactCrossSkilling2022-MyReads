import React from "react";
import PropTypes from "prop-types";
//import { useState } from "react";
//import { Link } from "react-router-dom";
import shelfTypes from "../Constants";
import ShelveFill from "./C111FillShelve";

const ShelvesList = ({AllShelvesBooks, onBookMoved}) => {
    return (
        <div>
        {
            Object.values(shelfTypes).map((shelfType) => (
                <ShelveFill
                    key={shelfType.id}
                    ShelfType={shelfType}
                    BooksOnShelf={AllShelvesBooks.filter(book => book.shelf === shelfType.id)}
                    onBookMoved ={onBookMoved}
                />
            ))
        }
        </div>
    );
};

ShelvesList.propTypes = {
	AllShelvesBooks: PropTypes.array.isRequired,
	onBookMoved: PropTypes.func.isRequired
};

export default ShelvesList;