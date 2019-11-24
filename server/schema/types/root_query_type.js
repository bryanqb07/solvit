const mongoose = require("mongoose");
const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const AWSKey = require("../../../config/keys").AWSKey;

const UserType = require("./user_type");
const ProductType = require("./product_type");
const CategoryType = require("./category_type");
const OrderType = require("./order_type");

const User = mongoose.model("user");
const Product = mongoose.model("product");
const Category = mongoose.model("category");
const Order = mongoose.model("order");

// const authOptions = {
//     method: "GET",
//     url: "https://ck1hilkpie.execute-api.us-east-2.amazonaws.com/default/generate-price",
//     headers: {
//         "x-api-key": AWSKey
//     }
// }

const aws = require('aws-sdk');
const s3 = new aws.S3(); // Pass in opts to S3 if necessary

var getParams = {
    Bucket: 'gqlfence-dev', // your bucket name,
    Key: 'testFence.png' // path to the object you're looking for
};

s3.getObject(getParams, function (err, data) {
    // Handle any error and exit
    if (err)
        return err;

    // No error happened
    // Convert Body from a Buffer to a String

    let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
});


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
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve() {
                return Product.find({});
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, { id }) {
                return Product.findById(id);
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve() {
                return Order.find({});
            }
        },
        order: {
            type: OrderType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, { id }) {
                return Order.findById(id);
            }
        },
        userOrders: {
            type: new GraphQLList(OrderType),
            args: { user: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, { user }) {
                return Order.find({ user })
                            .then(orders => orders);
            }
        },
        searchProducts: {
            type: new GraphQLList(ProductType),
            args: { queryString: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, { queryString }) {
                return Product.find({ $text: { $search:  queryString } });
            }
        }
    })
});

module.exports = RootQueryType;