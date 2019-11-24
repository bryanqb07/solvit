import React from "react";
import CategoriesIndex from "./categories/CategoriesIndex";
import Nav from "./Nav";
import { Link } from "react-router-dom"

const CategoryBar = (props) => (
    <nav
            className="w3-sidebar w3-bar-block w3-white w3-collapse w3-top"
            id="mySidebar"
    >
        <Link to="/" className="w3-container w3-display-container w3-padding-16 w3-button">
            <h3 className="w3-wide">
                <b>Fence Share</b>
            </h3>
        </Link>
        <CategoriesIndex sidebar={true}/>
        <Nav />
    </nav>
);

export default CategoryBar;