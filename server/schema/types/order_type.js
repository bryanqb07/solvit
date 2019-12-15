const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLFloat, GraphQLList, 
    GraphQLString, GraphQLBoolean } = graphql;

const Order = mongoose.model("order");

const OrderType = new GraphQLObjectType({
  name: "OrderType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    telephone: { type: GraphQLString },
    subtotal: { type: GraphQLFloat },
    installationFee: { type: GraphQLFloat },
    insured: { type: GraphQLBoolean },
    insuranceFee: { type: GraphQLFloat },
    total: { type: GraphQLFloat },
    
    products: {
      type: new GraphQLList(require("./product_type")),
      resolve(parentValue) {
        return Order.findById(parentValue.id)
          .populate("products")
          .then(order => order.products);
      }
    },

    user: {
      type: require("./user_type"),
      resolve(parentValue) {
        return Order.findById(parentValue.id)
          .populate("user")
          .then(order => order.user);
      }
    },

    date: { type: GraphQLString },
    shippingStatus: { type: GraphQLString },
    shippingName: { type: GraphQLString },
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zipcode: { type: GraphQLString }
  })
});

module.exports = OrderType;