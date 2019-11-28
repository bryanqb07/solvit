import React from 'react';
import { Mutation } from "react-apollo";
import { DELETE_PRODUCT, DELETE_CATEGORY } from "../graphql/mutations";
import { FETCH_CATEGORIES, FETCH_PRODUCTS } from '../graphql/queries';

const DeleteButton = ({id, category}) => (
    <Mutation
        mutation={category ? DELETE_CATEGORY : DELETE_PRODUCT}
        onError={err => alert(err.message)}
        update={(cache, { data }) =>{
            let items;
            const queryType = category ? FETCH_CATEGORIES : FETCH_PRODUCTS;
            try {
                // if we've already fetched the products then we can read the
                // query here
                items = cache.readQuery({ query: queryType });
            } catch (err) {
                return;
            }
            // delete item from cache
            if (items) {
                let itemArray = category ? items.categories : items.products;
                console.log(itemArray);
                let deletedItemID = category ? data.deleteCategory.id : data.deleteProduct.id
                const updatedArray = itemArray.filter(item => item.id != deletedItemID)
                const itemData = category ? { categories: updatedArray } : { products: updatedArray }
                cache.writeQuery({
                    query: queryType,
                    data: itemData
                });
            }
        }}
        onCompleted={data => {
            const successMessage = category ? "Category" : "Product";
            alert(`${successMessage} deleted successfully!`)
        }
        }
    >
        {(deleteFn, { data }) => (
            <button className="delete-button" onClick={e=>{
                e.preventDefault();
                const item = category ? "category" : "product";
                const result = window.confirm(`Are you sure you want to delete this ${item}?`);
                if (result) {
                    return deleteFn({ variables: { id }})
                }else{
                    return;
                }
            }}>{category ? 'Delete Category' : 'Delete Product'} </button>
        )}
    </Mutation>
);

export default DeleteButton;