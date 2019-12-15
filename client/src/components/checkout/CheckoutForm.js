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

            shipping_name: "",
            shipping_address1: "",
            shipping_address2: "",
            shipping_city: "",
            shipping_state: "",
            shipping_zipcode: "",

            // billing_name: "",
            // billing_address1: "",
            // billing_address2: "",
            // billing_city: "",
            // billing_state: "",
            // billing_zipcode: "",

            message: "",
            // checked: true, // billing info = shipping info
            submitDisabled: false
        };
        this.toggleCheck = this.toggleCheck.bind(this);
        this.toggleInsuranceCheck = this.toggleInsuranceCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stateList = ["--Select State--", "Alabama", "Arkansas", "Florida", "Georgia", "Kentucky", "Louisiana", "Mississippi", 
            "North Carolina", "South Carolina", "Tennessee"];
    }

    toggleCheck(e){
        if(this.state.checked){
            this.setState({ 
                shipping_name: "",
                shipping_address1: "",
                shipping_address2: "",
                shipping_city: "",
                shipping_state: "",
                shipping_zipcode: "",
                checked: false 
            });
        }else{
            this.setState({
                shipping_name: this.state.billing_name,
                shipping_address1: this.state.billing_address1,
                shipping_address2: this.state.billing_address2,
                shipping_city: this.state.billing_city,
                shipping_state: this.state.billing_state,
                shipping_zipcode: this.state.billing_zipcode,
                checked: true
            });
        }
    }

    toggleInsuranceCheck(e){      
      if(this.state.insuranceChecked){
        this.setState({ insuranceChecked: false, insuranceFee: 0 });
      }else{
        this.setState({
          insuranceChecked: true,
          insuranceFee: this.insuranceRate * this.props.subtotal
        });
      }
    }

    updateShipping(field) {
        return e => {
            if(this.state.checked){
                this.setState({ [`shipping_${field}`]: e.target.value, [`billing_${field}`]: e.target.value });
            }else{
                this.setState({ [field]: e.target.value });
            }
        };
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
                user: this.props.user,
                products: this.props.productIdList,
                email: this.state.email,
                totalFootage: parseInt(this.props.totalFootage),
                productRentalPeriods: this.props.productRentalPeriods,
                subtotal: parseFloat(this.props.subtotal),
                installationFee: parseFloat(this.props.installationFee),
                insured: this.state.insuranceChecked,
                insuranceFee: parseFloat(Math.round(this.state.insuranceFee * 100) / 100),
                total: parseFloat(this.props.subtotal + this.props.installationFee + this.state.insuranceFee + salesTax),
                token: token.id,

                shipping_name: this.state.shipping_name,
                shipping_address1: this.state.shipping_address1,
                shipping_address2: this.state.shipping_address2,
                shipping_city: this.state.shipping_city,
                shipping_state: this.state.shipping_state,
                shipping_zipcode: this.state.shipping_zipcode,

                billing_name: this.state.billing_name,
                billing_address1: this.state.billing_address1,
                billing_address2: this.state.billing_address2,
                billing_city: this.state.billing_city,
                billing_state: this.state.billing_state,
                billing_zipcode: this.state.billing_zipcode,
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
                              onChange={this.updateShipping("name")}
                              value={this.state.billing_name}
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
                            {/* <label>Address Line 1</label>
                            <input
                              onChange={this.updateShipping("address1")}
                              value={this.state.billing_address1}
                              placeholder="Address Line 1"
                              type="text"
                            />
                            <br />
                            <label>Address Line 2</label>
                            <input
                              onChange={this.updateShipping("address2")}
                              value={this.state.billing_address2}
                              placeholder="Address Line 2"
                              type="text"
                            />
                            <br />
                            <label>City</label>
                            <input
                              onChange={this.updateShipping("city")}
                              value={this.state.billing_city}
                              placeholder="City"
                              type="text"
                            />
                            <br />
                            <label>State</label>
                            <select
                              onChange={this.updateShipping("state")}
                              value={this.state.billing_state}
                              placeholder="State"
                              type="text"
                            >
                              {this.stateList.map(state => (
                                <option value={state} key={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                            <br />
                            <label>Zip Code</label>
                            <input
                              className="half-width"
                              onChange={this.updateShipping("zipcode")}
                              value={this.state.billing_zipcode}
                              placeholder="Zip Code"
                              type="text"
                            /> */}
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
                                onChange={this.update("shipping_name")}
                                value={this.state.shipping_name}
                                placeholder="Name"
                                type="text"
                              />
                              <br />
                              <label>Address Line 1</label>
                              <input
                                onChange={this.update("shipping_address1")}
                                value={this.state.shipping_address1}
                                placeholder="Address Line 1"
                                type="text"
                              />
                              <br />
                              <label>Address Line 2</label>
                              <input
                                onChange={this.update("shipping_address2")}
                                value={this.state.shipping_address2}
                                placeholder="Address Line 2"
                                type="text"
                              />
                              <br />
                              <label>City</label>
                              <input
                                onChange={this.update("shipping_city")}
                                value={this.state.shipping_city}
                                placeholder="City"
                                type="text"
                              />
                              <br />
                              <div className="state-zip-container">
                                <div className="state-container">
                                <label>State</label>
                                <select
                                  onChange={this.update("shipping_state")}
                                  value={this.state.shipping_state}
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
                                    onChange={this.update("shipping_zipcode")}
                                    value={this.state.shipping_zipcode}
                                    placeholder="Zip Code"
                                    id="zipcode"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        {/* <label>Shipping Info Matches Billing Info</label>
                        <input
                          type="checkbox"
                          checked={this.state.checked}
                          onChange={this.toggleCheck}
                        />
                        <br /> */}
                        <p>{this.state.message}</p>
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
                      </div>
                    </div>
                  );
                }}
              </Mutation>
        )
    }
}

export default withRouter(injectStripe(CheckoutForm));