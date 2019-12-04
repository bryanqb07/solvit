import React from "react";
import { Link } from 'react-router-dom';
import { FETCH_ORDERS } from "../../graphql/queries";
import { Query } from "react-apollo";

const OrdersIndex = (props) => (
    <Query query={FETCH_ORDERS}>
        {({ loading, error, data }) => {
            if (loading) return <div className="loader"></div>
            if (error) return `Error! ${error.message}`;
            const orders = data.orders;
            return(
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                {/* <th>Name</th>
                                <th>Email</th> */}
                                <th>Total</th>
                                <th>View Full Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            { orders.map(order => 
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    {/* <td>{order.user.name}</td>
                                    <td>{order.user.email}</td> */}
                                    <td>{order.total}</td>
                                    <td><Link to={"/staff/orders/" + order.id}>
                                            View More Details
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        }}
    </Query>
);

export default OrdersIndex;