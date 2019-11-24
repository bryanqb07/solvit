import React from 'react';
import { Link } from 'react-router-dom';
require("./products_index.scss");

const ProductContainer = ({ products, nonStaff }) => (
  <div className="product-grid product-grid--flexbox">
    <div className="product-grid__wrapper">
      {products.map(product => (
        <div key={product.id} className="product-grid__product-wrapper">
          <div className="product-grid__img-wrapper">
            <img src="testFence.png"></img>
          </div>
          <span className="product-grid__title">{product.name}</span>
          {/* <div className="product-grid__extend-wrapper"> */}
          {/* <div className="product-grid__extend"> */}
          <p className="product-grid__description">
            <i>{product.description}</i>
          </p>
          <Link
            to={
              nonStaff
                ? "/products/" + product.id
                : "/staff/products/edit/" + product.id
            }
          >
            {nonStaff ? (
              <span className="product-grid__btn product-grid__view">
                <i className="fa fa-eye"></i> View more
              </span>
            ) : (
              <span className="product-grid__btn product-grid__view">Edit Product</span>
            )}
          </Link>
        </div>
      ))}
    </div>
  </div>
  // <div className="products-wrapper">
  //   {products.map(product => (
  //     <div key={product.id} className="products-container-wrapper">
  //       <div className="w3-container">
  //         <img src="testFence.png"></img>
  //         <p>Name: {product.name}</p>
  //         <p>Description: {product.description}</p>
  //         <p>Price: ${product.price}</p>
  //         <Link
  //           to={
  //             nonStaff
  //               ? "/products/" + product.id
  //               : "/staff/products/edit/" + product.id
  //           }
  //         >
  //           {nonStaff ? "View Product" : "Edit Product"}
  //         </Link>
  //       </div>
  //     </div>
  //   ))}
  // </div>
);

export default ProductContainer;