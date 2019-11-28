import React from 'react';
import { Mutation } from "react-apollo";
import { FETCH_PRODUCTS } from "../graphql/queries";
import { DELETE_PRODUCT } from "../graphql/mutations";

const DeleteButton = ({id}) => (
    <Mutation
        mutation={DELETE_PRODUCT}
        onError={err => alert(err.message)}
        onCompleted={data => {
            alert("Product deleted successfully!")
        }
        }
    >
        {(deleteProduct, { data }) => (
            <button className="delete-button" onClick={e=>{
                e.preventDefault();
                const result = window.confirm("Are you sure you want to delete this product?");
                if (result) {
                    return deleteProduct({ variables: { id }})
                }else{
                    return;
                }
            }}>Delete Product</button>
        )}
    </Mutation>
);

export default DeleteButton;