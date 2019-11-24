const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const Order = mongoose.model("order");

const OrderType = new GraphQLObjectType({
    name: "OrderType",
    fields: () => ({
        id: { type: GraphQLID },
        total: { type: GraphQLInt },
        products: {
            type: new GraphQLList(require("./product_type")),
            resolve(parentValue) {
                return Order.findById(parentValue.id)
                    .populate("products")
                    .then(order => order.products)
            }
        },
        user: {
            type: require('./user_type'),
            resolve(parentValue){
                return Order.findById(parentValue.id)
                    .populate("user")
                    .then(order => order.user)
            }
        }
    })
});

module.exports = OrderType;