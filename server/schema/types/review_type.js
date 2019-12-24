const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList } = graphql;

const Review = mongoose.model("review");

const ReviewType = new GraphQLObjectType({
    name: "ReviewType",
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        asker: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Review.findById(parentValue.id)
                    .populate("asker")
                    .then(review => review.asker);
            }
        },
        giver: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Review.findById(parentValue.id)
                    .populate("giver")
                    .then(review => review.giver);
            }
        },
        score: { type: GraphQLFloat },
        comment: { type: GraphQLString }
    })
});

module.exports = ReviewType;