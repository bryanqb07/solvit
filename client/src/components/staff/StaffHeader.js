import React from 'react';
import { Link } from 'react-router-dom';

const StaffHeader = () => (
    <header className="">
        <p className="">Admin</p>
        <p className="">
            <Link to="products/new" className="">New Product</Link>
            <Link to="categories/new" className="">New Category</Link>
        </p>
    </header>
);

export default StaffHeader;
