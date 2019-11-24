import React from 'react';
import CartContainer from './cart/CartContainer';
import { Link } from 'react-router-dom';

const TopNav = (props) => (
    <header className="w3-container w3-xlarge">
        <p className="w3-left">Top Products</p>
        <p className="w3-right">
            <Link to="/cart"><i className="fa fa-shopping-cart w3-margin-right"></i></Link>
            <i className="fa fa-search"></i>
        </p>
    </header>
);

export default TopNav;
