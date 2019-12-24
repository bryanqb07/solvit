const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt, GraphQLList } = graphql;

const PurchaseLog = mongoose.model("purchaseLog");

const PurchaseLogType = new GraphQLObjectType({
    name: "PurchaseLogType",
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        user: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return PurchaseLog.findById(parentValue.id)
                    .populate("user")
                    .then(purchaseLog => purchaseLog.user);
            }
        },
        amount: { type: GraphQLFloat },
        gems: { type: GraphQLInt }
    })
});

module.exports = PurchaseLogType;