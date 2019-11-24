import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { FETCH_CATEGORIES } from "../../graphql/queries";
import { Query } from "react-apollo";

const CategoriesIndex = ({sidebar}) => (
  <Query query={FETCH_CATEGORIES}>
      {({ loading, error, data }) => {
          if (loading) return <div className="loader">Loading...</div>
          if (error) return `Error! ${error.message}`;
          if (sidebar){
            return (
              <div
                className="w3-padding-64 w3-large w3-text-grey"
                id="categoryList"
              >
                {data.categories.map(category => (
                  <NavLink
                    to={"/categories/" + category.id}
                    className="w3-bar-item w3-button"
                    activeClassName='is-active'
                    key={category.id}
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            );
          }else{ // STAFF page
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
      }}
  </Query>
);


export default CategoriesIndex;
