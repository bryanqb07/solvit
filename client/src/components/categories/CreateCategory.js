import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { FETCH_CATEGORIES } from "../../graphql/queries";
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "../../graphql/mutations";

class CreateCategory extends Component {
    constructor(props) {
        super(props);

        const category = this.props.category;
        this.state = {
            message: "",
            name: category ? category.name : "",
            id: category ? category.id : ''
        };
    }

    updateCache(cache, { data }) {
        if(this.props.update) return;
        
        let categories;
        try {
            // if we've already fetched the categories then we can read the
            // query here
            categories = cache.readQuery({ query: FETCH_CATEGORIES });
        } catch (err) {
            return;
        }
        // if we had previously fetched categories we'll add our new product to our cache
        if (categories) {
            let categoryArray = categories.categories;
            let newCategory = data.newCategory;
            cache.writeQuery({
                query: FETCH_CATEGORIES,
                data: { categories: categoryArray.concat(newCategory) }
            });
        }
    }

    handleSubmit(e, categoryFn) {
        e.preventDefault();
        if(this.props.update){
            categoryFn({
                variables: {
                    id: this.state.id,
                    name: this.state.name
                }
            });
        }else{
            categoryFn({
                variables: {
                    name: this.state.name
                }
            });
        }

    }

    render() {
        return (
            <Mutation
                mutation={this.props.update ? UPDATE_CATEGORY : CREATE_CATEGORY}
                onError={err => this.setState({ message: err.message })}
                // update cache on category creation
                update={(cache, data) => this.updateCache(cache, data)}
                onCompleted={data => {
                    // const { name } = data.newCategory;
                    this.setState({
                        message: this.props.update ? "Category updated successfully" : "New category created successfully"
                    })
                }
                }
            >
                {(categoryFn, { data }) => (
                    <div className="product-form-wrapper">
                        <h3>{this.props.update ? "Update Category" : "Create New Category"}</h3>
                        <form className="product-form" onSubmit={e => this.handleSubmit(e, categoryFn)}>
                            <input
                                onChange={e => this.setState({ name: e.target.value })}
                                value={this.state.name}
                                placeholder="Name"
                            />
                            <br />
                            <button type="submit">{this.props.update ? "Update" : "Create"}</button>
                        </form>
                        <p>{this.state.message}</p>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default CreateCategory;