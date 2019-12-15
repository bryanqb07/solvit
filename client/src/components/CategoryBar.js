import React from "react";
import CategoriesIndex from "./categories/CategoriesIndex";
import { Link } from "react-router-dom";

const CategoryBar = (props) => (
    <nav
            className=""
            id="mySidebar"
    >
        <Link to="/" className="">
            <h3 className="">
                <b>Fence Share</b>
            </h3>
        </Link>
        <CategoriesIndex sidebar={true}/>
    </nav>
);

export default CategoryBar;