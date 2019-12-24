const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;

const Notification = mongoose.model("notification");

const NotificationType = new GraphQLObjectType({
    name: "NotificationType",
    fields: () => ({
        id: { type: GraphQLID },
        pusher: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Notification.findById(parentValue.id)
                    .populate("pusher")
                    .then(notification => notification.asker);
            }
        },
        receiver: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Notification.findById(parentValue.id)
                    .populate("receiver")
                    .then(notification => notification.giver);
            }
        },
        viewed: { type: GraphQLBoolean },
        reason: { type: GraphQLString },
        date: { type: GraphQLString }
    })
});

module.exports = NotificationType;