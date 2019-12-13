import React from "react";
import { NavLink } from 'react-router-dom';
import CategoriesIndex from "./categories/CategoriesIndex";

const MenuBar = () => (
    <div className="grey-border-bottom">
        <div className="navbar-wrapper wrapped">
            <CategoriesIndex sidebar={true} />
            <NavLink
                to="/cart"
                className="no-decoration large-font default-font-color"
                activeClassName='is-active'><i className="fa fa-shopping-cart"></i></NavLink>
        </div>
    </div>

)

export default MenuBar;
