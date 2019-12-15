import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_ORDER } from "../../graphql/mutations";
import { CardElement, injectStripe } from "react-stripe-elements";
import { withRouter } from "react-router";
import CheckoutSummary from './CheckoutSummary';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.insuranceRate = 0.15;
        this.salesTax = 0.07;
        this.state = {
            insuranceFee: this.props.subtotal ? this.props.subtotal * this.insuranceRate : 0,        
            insuranceChecked: true,
            email: "",
            name: "",
            telephone: "",

            shippingName: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: "",

            message: "",
            // checked: true, // billing info = shipping info
            submitDisabled: false
        };
        this.toggleInsuranceCheck = this.toggleInsuranceCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stateList = ["--Select State--", "Alabama", "Arkansas", "Florida", "Georgia", "Kentucky", "Louisiana", "Mississippi", 
            "North Carolina", "South Carolina", "Tennessee"];
    }

    toggleInsuranceCheck(e){      
      this.setState({ 
        insuranceChecked: !this.state.insuranceChecked, 
        insuranceFee: this.state.insuranceChecked ? 0 : this.insuranceRate * this.props.subtotal
      });
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    async handleSubmit(e, newOrder) {
        e.preventDefault();
        let {token} = await this.props.stripe.createToken({name: "Name"}); 
        const salesTax = this.state.shipping_state === "Mississippi" ? Math.round(this.salesTax * this.props.subtotal) / 100 : 0;
        const total = (this.props.subtotal + this.props.installationFee + this.state.insuranceFee).toFixed(2);
        newOrder({
            variables: {

                name: this.state.name,              
                user: this.props.user,
                products: this.props.productIdList,
                telephone: this.state.telephone,
                email: this.state.email,
                totalFootage: parseInt(this.props.totalFootage),
                productRentalPeriods: this.props.productRentalPeriods,
                subtotal: parseFloat(this.props.subtotal),
                installationFee: parseFloat(this.props.installationFee),
                insured: this.state.insuranceChecked,
                insuranceFee: parseFloat(Math.round(this.state.insuranceFee * 100) / 100),
                total: parseFloat(this.props.subtotal + this.props.installationFee + this.state.insuranceFee + salesTax),
                token: token.id,

                shippingName: this.state.shippingName,
                address1: this.state.address1,
                address2: this.state.address2,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,


                salesTax
            }
        });
      this.setState({ submitDisabled: true });
    }

    render() {
        // console.log(this.state);
        console.log(this.props);
        return(
              <Mutation
                mutation={CREATE_ORDER}
                onError={err => this.setState({ message: err.message, submitDisabled: false })}
                onCompleted={data => {
                  this.setState({
                    message: `New order created successfully`
                  })

                  this.props.history.push({
                    pathname: "/confirmation",
                    search: `id=${data.newOrder.id}`
                  });
                }}
              >
                {(newOrder, { data }) => {
                  return (
                    <div className="flex space-between">
                      <div className="checkout-form-wrapper">
                        <div className="billing-checkout">
                          <h3>Billing Information</h3>
                          <form>
                            <label>Name</label>
                            <input
                              onChange={this.update("name")}
                              value={this.state.name}
                              placeholder="Name"
                              type="text"
                            />
                            <br />
                            <label>Email</label>
                            <input
                              onChange={this.update("email")}
                              value={this.state.email}
                              placeholder="Email"
                              type="text"
                            />
                            <br />
                            <label>Telephone</label>
                            <input
                              onChange={this.update("telephone")}
                              value={this.state.telephone}
                              placeholder="(555) 555-5555"
                              type="text"
                            />
                            <br />
                            <label>Credit Card Details</label>
                            <CardElement />
                            <br />
                            <img src="stripe-logo.png" className="secure-payment" />
                          </form>
                        </div>
                        <br />
                      </div>
                      <div className="shipping-checkout-container">
                        <h3>Shipping Information</h3>
                          <div>
                            <form>
                              <label>Name</label>
                              <input
                                onChange={this.update("shippingName")}
                                value={this.state.shippingName}
                                placeholder="Name"
                                type="text"
                              />
                              <br />
                              <label>Address Line 1</label>
                              <input
                                onChange={this.update("address1")}
                                value={this.state.address1}
                                placeholder="Address Line 1"
                                type="text"
                              />
                              <br />
                              <label>Address Line 2</label>
                              <input
                                onChange={this.update("address2")}
                                value={this.state.address2}
                                placeholder="Address Line 2"
                                type="text"
                              />
                              <br />
                              <label>City</label>
                              <input
                                onChange={this.update("city")}
                                value={this.state.city}
                                placeholder="City"
                                type="text"
                              />
                              <br />
                              <div className="state-zip-container">
                                <div className="state-container">
                                <label>State</label>
                                <select
                                  onChange={this.update("state")}
                                  value={this.state.state}
                                  placeholder="State"
                                  type="text"
                                >
                                  {this.stateList.map(state => (
                                    <option value={state} key={state}>
                                      {state}
                                    </option>
                                  ))}
                                </select>
                                </div>

                                <div className="zip-container">
                                  <label>Zip Code</label>
                                  <input
                                    className="half-width"
                                    onChange={this.update("zipcode")}
                                    value={this.state.zipcode}
                                    placeholder="Zip Code"
                                    id="zipcode"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                      </div>
                      <div className="checkout-order-container">
                        <CheckoutSummary
                          insuranceFee={this.state.insuranceFee}
                          subtotal={this.props.subtotal + this.props.installationFee}
                          cartItems={this.props.cartItems}
                          salesTax={this.state.shipping_state === "Mississippi" ? this.salesTax * this.props.subtotal : 0}
                        />
                        <span>Yes, I would like to insure my order </span>
                        <input
                          type="checkbox"
                          checked={this.state.insuranceChecked}
                          onChange={this.toggleInsuranceCheck}
                        />
                        <br />
                        <button
                          className="quote-button pink-bg zoom checkout-btn"
                          disabled={this.state.submitDisabled}
                          onClick={e => this.handleSubmit(e, newOrder)}
                        >
                          Complete Purchase
                        </button>
                        <br />
                        <p>{this.state.message}</p>
                      </div>
                    </div>
                  );
                }}
              </Mutation>
        )
    }
}

export default withRouter(injectStripe(CheckoutForm));