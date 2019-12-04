import React from "react";
import CheckoutForm from './CheckoutForm';
import { FETCH_CART_ITEMS_AND_USER } from "../../graphql/queries";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Query } from "react-apollo";
import CartItem from "../cart/CartItem";
import RemoveItemFromCart from "../RemoveFromCart";

const Checkout = () => {
    return(
        <Query query={FETCH_CART_ITEMS_AND_USER}>
            {({ loading, error, data }) => {
                if (loading) return <div className="loader"></div>
                if (error) return `Error! ${error.message}`;
                if (data && data.cart && data.cart.length > 0) {
                    let installationFee = data.cart.map(item => item.installationFee).reduce((acc, cv) => acc + cv);
                    let subtotal = data.cart.map(item => item.subtotal).reduce((acc, cv) => acc + cv);
                    let total = data.cart.map(item => item.total).reduce((acc, cv) => acc + cv);
                    let productIdList = data.cart.map(item => item.id);
                    let insuranceFee = data.insuranceFee;
                    let productRentalPeriods = data.cart.map(item => `${item.startDate},${item.endDate}`);
                    const user = data.userId
                    // console.log(data);
                    return (
                      <div className="flex space-evenly">
                        <div>
                          <StripeProvider apiKey="pk_test_W1knFGWMPCttW9lRpPYvYOhi00YbWlaJ32">
                            <div className="example">
                              <Elements>
                                <CheckoutForm
                                  user={user}
                                  products={productIdList}
                                  subtotal={subtotal}
                                  total={total}
                                  installationFee={installationFee}
                                  insuranceFee={insuranceFee}
                                  productRentalPeriods={productRentalPeriods}
                                />
                              </Elements>
                            </div>
                          </StripeProvider>
                        </div>
                        <div>
                          <h3>Order Summary</h3>
                          {data.cart.map(cartItem => (
                            <div key={cartItem.id}>
                              <CartItem cartItem={cartItem} total={total} />
                              <RemoveItemFromCart id={cartItem.id} />
                              {/* { insuranceFee > 0 ? (<p> Insurance Fee: ${insuranceFee}</p>) : ""} */}
                              <hr />
                            </div>
                          ))}
                          <p>Total: ${total}</p>
                        </div>
                      </div>
                    );
                } else {
                  return (
                      <div>Cart is empty.</div>
                  )
                }
            }}
        </Query>
    )
}

export default Checkout;