const mongoose = require("mongoose");
const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLFloat } = graphql;
const AWSKey = require("../../../config/keys").AWSKey;

const UserType = require("./user_type");
const VideoType = require("./video_type");
const ReservationType = require("./video_type");
const CategoryType = require("./category_type");

const User = mongoose.model("user");

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve(){
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(_, { id }){
                return User.findById(id);
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve() {
                return Category.find({});
            }
        },
        category: {
            type: CategoryType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, { id }) {
                return Category.findById(id);
            }
        }
    })
});

module.exports = RootQueryType;