import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { FETCH_PRODUCT, FETCH_PRODUCTS } from "../graphql/queries";
import { CREATE_PRODUCT } from "../graphql/mutations";

class CheckoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            name: "",
            weight: "",
            description: "",
            price: ""
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            // let result = (
            // <Query query={FETCH_PRODUCT} variables={this.props.match.params}>
            //     {({ loading, error, data }) => {
            //         if (loading) return ("Loading...");
            //         if (error) return (error.message);
            //         const product = data.product;
            //         return this.setState({
            //             name: product.name,
            //             weight: product.weight,
            //             description: product.description,
            //             price: product.price
            //         });
            //     }}
            // </Query>
            // )
            // console.log(result.props.children);
            // return result;
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(cache, { data }) {
        let products;
        try {
            // if we've already fetched the products then we can read the
            // query here
            products = cache.readQuery({ query: FETCH_PRODUCTS })
        } catch (err) {
            return;
        }
        // if we had previously fetched products we'll add our new product to our cache
        if (products) {
            let productArray = products.products;
            let newProduct = data.newProduct;
            cache.writeQuery({
                query: FETCH_PRODUCTS,
                data: { products: productArray.concat(newProduct) }
            })
        }
    }

    handleSubmit(e, newProduct) {
        e.preventDefault();
        newProduct({
            variables: {
                name: this.state.name,
                description: this.state.description,
                weight: parseInt(this.state.weight)
            }
        })
    }

    render() {
        return (
            <Mutation
                mutation={CREATE_PRODUCT}
                onError={err => this.setState({ message: err.message })}
                // update cache on product creation
                update={(cache, data) => this.updateCache(cache, data)}
                onCompleted={data => {
                    const { name } = data.newProduct;
                    this.setState({
                        message: `New product ${name} created successfully`
                    })
                }
                }
            >
                {(newProduct, { data }) => (
                    <div>
                        <form onSubmit={e => this.handleSubmit(e, newProduct)}>
                            <input
                                onChange={this.update("name")}
                                value={this.state.name}
                                placeholder="Name"
                            />
                            <textarea
                                onChange={this.update("description")}
                                value={this.state.description}
                                placeholder="description"
                            />
                            <input
                                onChange={this.update("weight")}
                                value={this.state.weight}
                                placeholder="Weight"
                                type="number"
                            />
                            <input
                                onChange={this.update("price")}
                                value={this.state.price}
                                placeholder="Price"
                                type="number"
                            />
                            <button type="submit">{this.props.match.params.id ? "Update Product" : "Create Product"}</button>
                        </form>
                        <p>{this.state.message}</p>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default CreateProduct;