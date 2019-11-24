import React from 'react';
import { Link } from 'react-router-dom';

const StaffHeader = () => (
    <header className="w3-container w3-xlarge">
        <p className="w3-left">Admin</p>
        <p className="w3-right">
            <Link to="products/new" className="w3-margin-right">New Product</Link>
            <Link to="categories/new" className="w3-margin-right">New Category</Link>
        </p>
    </header>
);

export default StaffHeader;
