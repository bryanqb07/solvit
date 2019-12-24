const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean } = graphql;

const Reservation = mongoose.model("reservation");

const ReservationType = new GraphQLObjectType({
    name: "ReservationType",
    fields: () => ({
        id: { type: GraphQLID },
        asker: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Reservation.findById(parentValue.id)
                    .populate("asker")
                    .then(reservation => reservation.asker);
            }
        },
        giver: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Reservation.findById(parentValue.id)
                    .populate("giver")
                    .then(reservation => reservation.giver);
            }
        },
        date: { type: GraphQLString },
        time: { type: GraphQLString },
        duration: { type: GraphQLFloat },
        rate: { type: GraphQLFloat },
        confirmed: { type: GraphQLBoolean },
        completed: { type: GraphQLBoolean }
    })
});

module.exports = ReservationType;