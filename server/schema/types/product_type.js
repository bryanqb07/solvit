const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const Product = mongoose.model("product");

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        weight: { type: GraphQLInt },
        category: {
            type: require("./category_type"),
            resolve(parentValue) {
                return Product.findById(parentValue.id)
                    .populate("category")
                    .then(product => {
                        return product.category;
                    });
            }
        },
        price: { type: GraphQLInt }
    })
});

module.exports = ProductType;