const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLFloat } = graphql;

const Product = mongoose.model("product");

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
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
        price: { type: GraphQLFloat },
        width: { type: GraphQLFloat },
        height: { type: GraphQLFloat },
        flatInstallationFee: { type: GraphQLFloat },
        perFtInstallationFee: { type: GraphQLFloat },
        unitPrice: { type: GraphQLFloat },
        perFtUnitPriceThreeMonths: { type: GraphQLFloat },
        perFtUnitPriceSixMonths: { type: GraphQLFloat },
        perFtUnitPriceNineMonths: { type: GraphQLFloat },
        perFtUnitPriceTwelveMonths: { type: GraphQLFloat }
    })
});

module.exports = ProductType;