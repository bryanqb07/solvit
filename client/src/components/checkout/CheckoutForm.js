import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { FETCH_PRODUCT, FETCH_PRODUCTS } from "../../graphql/queries";
import { CREATE_ORDER } from "../../graphql/mutations";
import ShippingForm from "./ShippingForm";

class CheckoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user ? this.props.user : "",
            products: this.props.products ? this.props.products : "",
            total: this.props.total ? this.props.total : "",

            shipping_name: "",
            shipping_address1: "",
            shipping_address2: "",
            shipping_city: "",
            shipping_state: "",
            shipping_zipcode: "",

            billing_name: "",
            billing_address1: "",
            billing_address2: "",
            billing_city: "",
            billing_state: "",
            billing_zipcode: "",

            message: "",
            checked: true // billing info = shipping info
        };
        this.toggleCheck = this.toggleCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCheck(e){
        if(this.state.checked){
            this.setState({ 
                billing_name: "",
                billing_address1: "",
                billing_address2: "",
                billing_city: "",
                billing_state: "",
                billing_zipcode: "",
                checked: false 
            });
        }else{
            this.setState({
                billing_name: this.state.shipping_name,
                billing_address1: this.state.shipping_address1,
                billing_address2: this.state.shipping_address2,
                billing_city: this.state.shipping_city,
                billing_state: this.state.shipping_state,
                billing_zipcode: this.state.shipping_zipcode,
                checked: true
            });
        }
        this.setState({ checked: !this.state.checked });
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

    // updateCache(cache, { data }) {
    //     let products;
    //     try {
    //         // if we've already fetched the products then we can read the
    //         // query here
    //         products = cache.readQuery({ query: FETCH_PRODUCTS })
    //     } catch (err) {
    //         return;
    //     }
    //     // if we had previously fetched products we'll add our new product to our cache
    //     if (products) {
    //         let productArray = products.products;
    //         let newProduct = data.newProduct;
    //         cache.writeQuery({
    //             query: FETCH_PRODUCTS,
    //             data: { products: productArray.concat(newProduct) }
    //         })
    //     }
    // }

    handleSubmit(e, newOrder) {
        e.preventDefault();
        newOrder({
            variables: {
                user: this.state.user,
                products: this.state.products,
                total: this.state.total,

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
            }
        });
    }

    render() {
        return (
            <Mutation
                mutation={CREATE_ORDER}
                onError={err => this.setState({ message: err.message })}
                // update cache on product creation
                update={(cache, data) => this.updateCache(cache, data)}
                onCompleted={data => {
                    this.setState({
                        message: `New order created successfully`
                    })
                }
                }
            >
                {(newOrder, { data }) => 
                {
                    console.log(this.state);
                    return (
                        <div>
                            <div>
                                <h3>Shipping Information</h3>
                                <form>
                                    <label>Name</label>
                                    <input
                                        onChange={this.updateShipping("name")}
                                        value={this.state.shipping_name}
                                        placeholder="Name"
                                        type="text"
                                    />
                                    <br />
                                    <label>Address Line 1</label>
                                    <input
                                        onChange={this.updateShipping("address1")}
                                        value={this.state.shipping_address1}
                                        placeholder="Address Line 1"
                                        type="text"
                                    />
                                    <br />
                                    <label>Address Line 2</label>
                                    <input
                                        onChange={this.updateShipping("address2")}
                                        value={this.state.shipping_address2}
                                        placeholder="Address Line 2"
                                        type="text"
                                    />
                                    <br />
                                    <label>City</label>
                                    <input
                                        onChange={this.updateShipping("city")}
                                        value={this.state.shipping_city}
                                        placeholder="City"
                                        type="text"
                                    />
                                    <br />
                                    <label>State</label>
                                    <select
                                        onChange={this.updateShipping("state")}
                                        value={this.state.shipping_state}
                                        placeholder="State"
                                        type="text"
                                    >
                                        <option value="Alabama">Alabama</option>
                                        <option value="Arkansas">Arkansas</option>
                                        <option value="Florida">Florida</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Kentucky">Kentucky</option>
                                        <option value="Louisiana">Louisiana</option>
                                        <option value="Mississippi">Mississippi</option>
                                        <option value="North Carolina">North Carolina</option>
                                        <option value="South Carolina">South Carolina</option>
                                        <option value="Tennessee">Tennessee</option> <option value="Texas">Texas</option>
                                    </select>
                                    <br />
                                    <label>Zip Code</label>
                                    <input
                                        onChange={this.updateShipping("zipcode")}
                                        value={this.state.shipping_zipcode}
                                        placeholder="Zip Code"
                                        type="text"
                                    />
                                </form>
                            </div>
                            <br />
                            <label>Billing Info Matches Shipping Info</label>
                            <input type="checkbox" checked={this.state.checked} onChange={this.toggleCheck} />
                            <br />
                            {this.state.checked ? "" : (
                            <div>
                                <h3>Billing Information</h3>
                                <form>
                                    <label>Name</label>
                                    <input
                                        onChange={this.update("billing_name")}
                                        value={this.state.billing_name}
                                        placeholder="Name"
                                        type="text"
                                    />
                                    <br />
                                    <label>Address Line 1</label>
                                    <input
                                        onChange={this.update("billing_address1")}
                                        value={this.state.billing_address1}
                                        placeholder="Address Line 1"
                                        type="text"
                                    />
                                    <br />
                                    <label>Address Line 2</label>
                                    <input
                                        onChange={this.update("billing_address2")}
                                        value={this.state.billing_address2}
                                        placeholder="Address Line 2"
                                        type="text"
                                    />
                                    <br />
                                    <label>City</label>
                                    <input
                                        onChange={this.update("billing_city")}
                                        value={this.state.billing_city}
                                        placeholder="City"
                                        type="text"
                                    />
                                    <br />
                                    <label>State</label>
                                    <select
                                        onChange={this.update("billing_state")}
                                        value={this.state.billing_state}
                                        placeholder="State"
                                        type="text"
                                    >
                                        <option value="Alabama">Alabama</option>
                                        <option value="Arkansas">Arkansas</option>
                                        <option value="Florida">Florida</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Kentucky">Kentucky</option>
                                        <option value="Louisiana">Louisiana</option>
                                        <option value="Mississippi">Mississippi</option>
                                        <option value="North Carolina">North Carolina</option>
                                        <option value="South Carolina">South Carolina</option>
                                        <option value="Tennessee">Tennessee</option> <option value="Texas">Texas</option>
                                    </select>
                                    <br />
                                    <label>Zip Code</label>
                                    <input
                                        onChange={this.update("billing_zipcode")}
                                        value={this.state.billing_zipcode}
                                        placeholder="Zip Code"
                                        type="text"
                                    />
                                </form>
                            </div>
                            )}
                            <br/>
                            <button onClick={e => this.handleSubmit(e, newOrder)}>Submit Order</button>
                            <p>{this.state.message}</p>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}

export default CheckoutForm;