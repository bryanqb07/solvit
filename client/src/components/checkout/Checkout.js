import React from "react";
import CheckoutForm from './CheckoutForm';
import { FETCH_CART_ITEMS_AND_USER } from "../../graphql/queries";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Query } from "react-apollo";

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
                    let productRentalPeriods = data.cart.map(item => `${item.startDate},${item.endDate}`);
                    const user = data.userId
                    // console.log(data);
                    return (
                        <div>
                          <StripeProvider apiKey="pk_test_W1knFGWMPCttW9lRpPYvYOhi00YbWlaJ32">
                            <div className="example">
                              <Elements>
                                <CheckoutForm
                                  user={user}
                                  productIdList={productIdList}
                                  subtotal={subtotal}
                                  total={total}
                                  installationFee={installationFee}
                                  productRentalPeriods={productRentalPeriods}
                                  cartItems={data.cart}
                                />
                              </Elements>
                            </div>
                          </StripeProvider>
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