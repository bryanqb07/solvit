const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat } = graphql;

const CallLog = mongoose.model("callLog");

const CallLogType = new GraphQLObjectType({
    name: "CallLogType",
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
        asker: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return CallLog.findById(parentValue.id)
                    .populate("asker")
                    .then(callLog => callLog.asker);
            }
        },
        giver: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return CallLog.findById(parentValue.id)
                    .populate("giver")
                    .then(callLog => callLog.giver);
            }
        },
        duration: { type: GraphQLFloat }
    })
});

module.exports = CallLogType;