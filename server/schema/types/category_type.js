const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const Category = mongoose.model("category");

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: { 
            type: new GraphQLList(require("./product_type")),
            resolve(parentValue){
                return Category.findById(parentValue.id)
                    .populate("products")
                    .then(category => category.products);
            }
        } 
    })
});

module.exports = CategoryType;