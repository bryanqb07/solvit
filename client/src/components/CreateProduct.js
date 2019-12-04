import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { FETCH_PRODUCTS } from "../graphql/queries";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../graphql/mutations";

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        const product = this.props.product;
        this.state = {
            message: "",
            productId: product ? this.props.productId : '',
            name: product ? product.name : '',
            width: product ? product.width : '',
            height: product ? product.height : '',
            description: product ?  product.description : '',
            category: product ? product.category.id : this.props.categories[0].id,
            flatInstallationFee: product ? product.flatInstallationFee : 0.00,
            perFtInstallationFee: product ? product.perFtInstallationFee : 0.00,
            unitPrice: product ? product.unitPrice : 0.00,
            perFtUnitPriceThreeMonths: product ? product.perFtUnitPriceThreeMonths : 0.00,
            perFtUnitPriceSixMonths: product ? product.perFtUnitPriceSixMonths : 0.00,
            perFtUnitPriceNineMonths: product ? product.perFtUnitPriceNineMonths : 0.00,
            perFtUnitPriceTwelveMonths: product ? product.perFtUnitPriceTwelveMonths : 0.00,
            photo: ''
        };
        // this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(cache, { data }){
        if(this.props.update) return; // no need to update cache if product already exists
        let products;
        try {
                // if we've already fetched the products then we can read the
                // query here
                products = cache.readQuery({ query: FETCH_PRODUCTS });
        } catch(err){
            return;
        }
        // if we had previously fetched products we'll add our new product to our cache
        if(products){
            let productArray = products.products;
            let newProduct = data.newProduct;
            cache.writeQuery({
                query: FETCH_PRODUCTS,
                data: { products: productArray.concat(newProduct) }
            });
        }
    }

    handleSubmit(e, productFn){
        e.preventDefault();

        if(this.props.update){
            productFn({
                variables: {
                    name: this.state.name,
                    description: this.state.description,
                    width: parseFloat(this.state.width),
                    height: parseFloat(this.state.height),
                    category: this.state.category,
                    flatInstallationFee: parseFloat(this.state.flatInstallationFee),
                    perFtInstallationFee: parseFloat(this.state.perFtInstallationFee),
                    unitPrice: parseFloat(this.state.unitPrice),
                    perFtUnitPriceThreeMonths: parseFloat(this.state.perFtUnitPriceThreeMonths),
                    perFtUnitPriceSixMonths: parseFloat(this.state.perFtUnitPriceSixMonths),
                    perFtUnitPriceNineMonths: parseFloat(this.state.perFtUnitPriceNineMonths),
                    perFtUnitPriceTwelveMonths: parseFloat(this.state.perFtUnitPriceTwelveMonths)
                }
            });
        }else{
            productFn({
                variables: {
                    name: this.state.name,
                    description: this.state.description,
                    width: parseFloat(this.state.width),
                    height: parseFloat(this.state.height),
                    category: this.state.category,
                    flatInstallationFee: parseFloat(this.state.flatInstallationFee),
                    perFtInstallationFee: parseFloat(this.state.perFtInstallationFee),
                    unitPrice: parseFloat(this.state.unitPrice),
                    perFtUnitPriceThreeMonths: parseFloat(this.state.perFtUnitPriceThreeMonths),
                    perFtUnitPriceSixMonths: parseFloat(this.state.perFtUnitPriceSixMonths),
                    perFtUnitPriceNineMonths: parseFloat(this.state.perFtUnitPriceNineMonths),
                    perFtUnitPriceTwelveMonths: parseFloat(this.state.perFtUnitPriceTwelveMonths)
                }
            });
        }

    }

    // handlePhotoUpload(e){
    //     this.setState({
    //         photo: URL.createObjectURL(e.target.files[0])
    //     });
    // }

    render(){
        // console.log(this.state);
        return(
            <Mutation
                mutation={this.props.update ? UPDATE_PRODUCT : CREATE_PRODUCT}
                onError={err => this.setState({ message: err.message })}
                // update cache on product creation
                update={(cache, data) => this.updateCache(cache, data)}
                onCompleted={data => {
                    this.setState({
                        message: this.props.update ? `Product updated successfully` : `New product created successfully`
                    })
                    }
                }
            >
                {(productFn, { data }) => (
                    <div className="product-form-wrapper">
                        <h3>{this.props.update ? "Update Product" : "Create Product"}</h3>
                        <form className="product-form" onSubmit={e => this.handleSubmit(e, productFn)}>
                            <span>Name: </span>
                            <input
                                onChange={this.update("name")}
                                value={this.state.name}
                                placeholder="Name"
                            />
                            <br/>
                            <span>Description: </span>
                            <textarea
                                onChange={this.update("description")}
                                value={this.state.description}
                                placeholder="description"
                            />
                            <br />
                            <span>Dimensions: </span>
                            <input
                                onChange={this.update("width")}
                                value={this.state.width}
                                placeholder="Width"
                                type="number"
                            /><span>x</span>
                            <input
                                onChange={this.update("height")}
                                value={this.state.height}
                                placeholder="Height"
                                type="number"
                            /><span>ft</span>
                            <br />
                            <span>Price-per-ft 0-3 months</span>
                            <span className="dollar-sign">$</span>
                            <input
                                onChange={this.update("perFtUnitPriceThreeMonths")}
                                value={this.state.perFtUnitPriceThreeMonths}
                                placeholder="$/ft 0-3 months"
                                step=".05"
                                type="number"
                            />
                            <br />
                            <span>Price-per-ft 3-6 months</span>
                            <span className="dollar-sign">$</span>
                            <input
                                onChange={this.update("perFtUnitPriceSixMonths")}
                                value={this.state.perFtUnitPriceSixMonths}
                                placeholder="$/ft 3-6 months"
                                step=".05"
                                type="number"
                            />
                            <br />
                            <span>Price-per-ft 6-9 months</span>
                            <span className="dollar-sign">$</span>
                            <input
                                onChange={this.update("perFtUnitPriceNineMonths")}
                                value={this.state.perFtUnitPriceNineMonths}
                                placeholder="$/ft 6-9 months"
                                step=".05"
                                type="number"
                            />
                            <br />
                            <span>Price-per-ft 9-12 months</span>
                            <span className="dollar-sign">$</span>
                            <input
                                onChange={this.update("perFtUnitPriceTwelveMonths")}
                                value={this.state.perFtUnitPriceTwelveMonths}
                                placeholder="$/ft 9-12 months"
                                step=".05"
                                type="number"
                            />
                            <br />
                            <span>Flat per-unit price</span>
                            <span className="dollar-sign">$</span>
                            <input
                                onChange={this.update("unitPrice")}
                                value={this.state.unitPrice}
                                placeholder="$/unit"
                                type="number"
                            />
                            <br />
                            <span>Flat Installation Fee</span>
                            <span className="dollar-sign">$</span>
                            <input
                                onChange={this.update("flatInstallationFee")}
                                value={this.state.flatInstallationFee}
                                placeholder="Installation price"
                                type="number"
                            />
                            <br />
                            <span>Per Ft Installation Fee</span>
                            <span className="dollar-sign">$</span>
                            <input
                                onChange={this.update("perFtInstallationFee")}
                                value={this.state.perFtInstallationFee}
                                placeholder="$/ft install fee"
                                step=".05"
                                type="number"
                            />
                            <br />
                            <span>Category: </span>
                            <select 
                                value={this.state.category}
                                onChange={this.update("category")}>
                                { this.props.categories.map(category => 
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )}
                            </select>
                            <br/>
                            {/* <span>Image: </span>
                            <input
                                type="file" 
                                onChange={this.handlePhotoUpload}
                            />
                            <br /> */}
                            <button type="submit">{this.props.update ? "Update Product" : "Create Product"}</button>
                        </form>
                        <span>{this.state.message}</span>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default CreateProduct;