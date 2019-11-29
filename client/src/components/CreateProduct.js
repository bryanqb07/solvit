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
            weight: product ? product.weight : '',
            description: product ?  product.description : '',
            price: product ? product.price : '',
            category: product ? product.category.id : this.props.categories[0].id,
            photo: ''
        };
        this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
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
                    productId: this.state.productId,
                    name: this.state.name,
                    description: this.state.description,
                    weight: parseInt(this.state.weight),
                    price: parseInt(this.state.price),
                    category: this.state.category
                }
            });
        }else{
            productFn({
                variables: {
                    name: this.state.name,
                    description: this.state.description,
                    weight: parseInt(this.state.weight),
                    price: parseInt(this.state.price),
                    category: this.state.category
                }
            });
        }

    }

    handlePhotoUpload(e){
        this.setState({
            photo: URL.createObjectURL(e.target.files[0])
        });
    }

    render(){
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
                            <span>Weight: </span>
                            <input
                                onChange={this.update("weight")}
                                value={this.state.weight}
                                placeholder="Weight"
                                type="number"
                            />
                            <br />
                            <span>Price: </span>
                            <input
                                onChange={this.update("price")}
                                value={this.state.price}
                                placeholder="Price"
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
                            <span>Image: </span>
                            <input
                                type="file" 
                                onChange={this.handlePhotoUpload}
                            />
                            <br />
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