const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLList, 
    GraphQLString, GraphQLBoolean, GraphQL } = graphql;

const Order = mongoose.model("order");

const ShippingType = new GraphQLObjectType({
  name: "ShippingType",
  fields: {
        shippingStatus: { type: GraphQLString },
        name: { type: GraphQLString },
        address1: { type: GraphQLString },
        address2: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zipcode: { type: GraphQLString }
    }
});

const BillingType = new GraphQLObjectType({
  name: "BillingType",
  fields: {
    name: { type: GraphQLString },
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zipcode: { type: GraphQLString }
  }
});

const OrderType = new GraphQLObjectType({
  name: "OrderType",
  fields: () => ({
    id: { type: GraphQLID },
    subtotal: { type: GraphQLInt },
    installationFee: { type: GraphQLInt },
    insured: { type: GraphQLBoolean },
    insuranceFee: { type: GraphQLInt },
    total: { type: GraphQLInt },
    products: {
      type: new GraphQLList(require("./product_type")),
      resolve(parentValue) {
        return Order.findById(parentValue.id)
          .populate("products")
          .then(order => order.products);
      }
    },
    email: { type: GraphQLString },
    user: {
      type: require("./user_type"),
      resolve(parentValue) {
        return Order.findById(parentValue.id)
          .populate("user")
          .then(order => order.user);
      }
    },
    billingInfo: { type: BillingType },
    shippingInfo: { type: ShippingType }
  })
});

module.exports = OrderType;