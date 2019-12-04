import React from "react";
import { FETCH_USER_ORDERS } from "../../graphql/queries";
import { Query } from "react-apollo";

const UserOrders = (props) => (
    <Query query={FETCH_USER_ORDERS} variables={{user: props.match.params.id }}>
        {({ loading, error, data }) => {
            if (loading) return <div className="loader"></div>
            if (error) return `Error! ${error.message}`;
            const orders = data.userOrders;
            if(orders.length > 0){
                return (
                    <div className="orders-wrapper">
                        <h3>Orders</h3>
                        {orders.map(order => (
                            <div key={order.id} className="order-container">
                                <p>ID: {order.id}</p>
                                <p>Products: </p> 
                                { order.products.map(product =>
                                    <div className="order-product-container" key={product.id}>
                                        <p>ID: {product.id}</p>
                                        <p>Name: {product.name}</p>
                                        <p>Price: ${product.price}</p>
                                    </div>
                                )}
                                <p>Total: ${order.total}</p>
                            </div>
                        ))}
                    </div>
                )
            }else{
                return(
                    <div>
                        <h3>Orders</h3>
                        <div>No orders found for this user.</div>
                    </div>
                )
            }
        }}
    </Query>
);

export default UserOrders;