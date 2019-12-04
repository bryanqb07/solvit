import React from "react";
import { Link } from 'react-router-dom';
import { FETCH_ORDERS } from "../../graphql/queries";
import { Query } from "react-apollo";
require("./orderTable.scss");

const OrdersIndex = (props) => (
    <Query query={FETCH_ORDERS}>
        {({ loading, error, data }) => {
            if (loading) return <div className="loader"></div>
            if (error) return `Error! ${error.message}`;
            const orders = data.orders;
            console.log(orders);
            return (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Customer Email</th>
                      <th>Total</th>
                      <th>Confirmation #</th>
                      <th>Order Date</th>
                      <th>Shipping Status</th>
                      <th>View Full Order Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>{order.billingInfo.name}</td>
                        <td>{order.email}</td>
                        <td>{order.total}</td>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.shippingInfo.shippingStatus}</td>
                        <td>
                          <Link to={"/staff/orders/" + order.id}>
                            View More
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }}
    </Query>
);

export default OrdersIndex;