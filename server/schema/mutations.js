const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLBoolean } = graphql;
const { GraphQLUpload } = require("graphql-upload");
const AuthService = require("../services/auth");

const CategoryType = require("./types/category_type");
const ProductType = require("./types/product_type");
const UserType = require("./types/user_type");
const OrderType = require("./types/order_type");
const FileType = require('./types/file_type');

const Category = mongoose.model("category");
const Product = mongoose.model("product");
const Order = mongoose.model("order");
const User = mongoose.model("user");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
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
        newProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                weight: { type: GraphQLInt },
                price: { type: GraphQLInt },
                category: { type: GraphQLID },
                photo: { type: GraphQLUpload }
            },
            async resolve(_, { name, description, weight, price, category }, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token, admin: true });
                if(validUser.loggedIn){
                    return new Product({ name, description, weight, price, category }).save();
                }else{
                    throw new Error("Sorry, you need to be logged-in staff to create a product.");
                }
            }
        },
        deleteProduct: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(_, { id }) {
                return Product.findByIdAndRemove(id);
            }
        },
        updateProductCategory: {
            type: ProductType,
            args: { productId: { type: GraphQLID }, categoryId: { type: GraphQLID }},
            resolve(_, { productId, categoryId }){
                return Product.updateProductCategory(productId, categoryId);
            }
        },
        updateProduct: {
            type: ProductType,
            args: { 
                productId: { type: GraphQLID }, 
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                weight: { type: GraphQLInt },
                price: { type: GraphQLInt },
                category: { type: GraphQLID }},
            resolve(_, { productId, name, description, weight, price, category } ) {
                const updatedProduct = {};
                updatedProduct.id = productId;
                if (name) updatedProduct.name = name;
                if (description) updatedProduct.description = description;
                if (weight) updatedProduct.weight = weight;
                if (price) updatedProduct.price = price;
                if (category) updatedProduct.category = category;
                return Product.findByIdAndUpdate(productId, { $set: updatedProduct }, { new: true }, (err, product) => {
                    if(category){
                        return Product.updateProductCategory(product.id, category);
                    }
                    return product;
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
        },
        newOrder: {
            type: OrderType,
            args: {
                products: { type: GraphQLList(GraphQLID) },
                prices: { type: GraphQLList(GraphQLInt) },
                user: { type: GraphQLID }
            },
            async resolve(_, { products, prices, user }, ctx) {
                const total = prices.reduce((acc, cv) => acc + cv);
                return new Order({ products, total, user }).save();
            }
        }     
    }
});

module.exports = mutation;