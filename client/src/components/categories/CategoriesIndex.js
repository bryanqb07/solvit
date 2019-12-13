import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { FETCH_CATEGORIES } from "../../graphql/queries";
import { useQuery } from '@apollo/react-hooks';

const CategoriesIndex = ({ sidebar }) => {
  const { loading, error, data } = useQuery(FETCH_CATEGORIES);
  if (loading) return <div className="loader"></div>
  if (error) return `Error! ${error.message}`;
  if (sidebar) {
    return (
      <div
        className="categories-container"
      >
        <Link to="/" 
          className="no-decoration large-font category-link"
              activeClassName='is-active '>Home</Link>
        {data.categories.map(category => (
          <NavLink
            to={"/categories/" + category.id}
            className="no-decoration large-font category-link"
            activeClassName='is-active'
            key={category.id}
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    );
  } else { // STAFF page
    return (
      <div className="product-grid product-grid--flexbox">
        <div className="product-grid__wrapper">
          {data.categories.map(category => (
            <div key={category.id} className="product-grid__product-wrapper">
              <p>Name: {category.name}</p>
              <Link
                to={"/staff/categories/edit/" + category.id}
                key={category.id}
                className="product-grid__btn product-grid__view undecorated"
              >
                Edit Category
                      </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CategoriesIndex;
