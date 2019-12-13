import React from "react";
import { FETCH_ORDER } from "../../graphql/queries";
import { Query } from "react-apollo";


function OrderDetail(props) {
    return (
        <Query query={FETCH_ORDER} variables={props.match.params}>
            {({ loading, error, data }) => {
                if (loading) return <div className="loader"></div>
                if (error) return <div className="error">`Error! ${error.message}`</div>

                const order = data.order;
                // console.log(order);
                return (
                    <div>
                        <p>ID: {order.id}</p>
                        <p>Total: {order.total}</p>
                    </div>
                )
            }}
        </Query>
    );
}

export default OrderDetail;