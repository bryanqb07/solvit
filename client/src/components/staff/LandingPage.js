import React from 'react';
import ProductsIndex from '../products/ProductsIndex';
import Sidebar from './Sidebar';

const Home = () => (
    <div className="flex">
        <Sidebar />
        <ProductsIndex role="staff" />
    </div>
);

export default Home;