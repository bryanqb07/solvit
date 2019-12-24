const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, 
        GraphQLID, GraphQLList, GraphQLBoolean, GraphQLFloat } = graphql;
const AuthService = require("../services/auth");

const CategoryType = require("./types/category_type");
const UserType = require("./types/user_type");

const User = mongoose.model("user");

const stripeKey = require('../../config/keys').STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeKey);

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        updateUserName: {
            type: UserType,
            args: { 
                id: { type: GraphQLID },
                name: { type: GraphQLString},
                email: { type: GraphQLString}},
                interests: { type: GraphQLList(GraphQLID) },
            resolve(_, { id, name, email }){
                const updatedUser = {};
                updatedUser.id = id;
                updatedUser.email = email;
                updatedUser.isStaff = true;
                if (name) updatedUser.name = name;
                return User.findByIdAndUpdate(id, { $set: updatedUser }, { new: true }, (err, user) => {
                    return user;
                });
            }
        },
        newCategory: {
            type: CategoryType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(_, { name }) {
                return new Category({ name }).save();
            }
        },
        deleteCategory: {
            type: CategoryType,
            args: { id: { type: GraphQLID } },
            resolve(_, { id }) {
                return Category.findByIdAndRemove(id);
            }
        },
        updateCategory: {
            type: CategoryType,
            args: { 
                id: { type: GraphQLID },
                name: { type: GraphQLString}},
            resolve(_, { id, name }){
                const updatedCategory = {};
                updatedCategory.id = id;
                if (name) updatedCategory.name = name;
                return Category.findByIdAndUpdate(id, { $set: updatedCategory }, { new: true }, (err, category) => {
                    return category;
                });
            }
        },
        register: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args){
                return AuthService.register(args);
            }
        },
        logout: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(_, args){
                return AuthService.logout(args);
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args){
                return AuthService.login(args);
            }
        },
        verifyUser: {
            type: UserType,
            args: {
                token: { type: GraphQLString },
                isStaff: { type: GraphQLBoolean }
            },
            resolve(_, args){
                return AuthService.verifyUser(args);
            }
        }
    }
});

module.exports = mutation;