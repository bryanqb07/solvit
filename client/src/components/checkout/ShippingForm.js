import React, { Component } from "react";

class ShippingForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: "",
            message: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }


    render() {
        return (
            <div>
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
                    <label>State</label>
                    <select
                        onChange={this.update("state")}
                        value={this.state.state}
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
                        onChange={this.update("zipcode")}
                        value={this.state.zipcode}
                        placeholder="Zip Code"
                        type="text"
                    />
                </form>
            </div>
        )
    }
}

export default ShippingForm;