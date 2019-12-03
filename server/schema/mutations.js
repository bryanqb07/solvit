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

const stripeKey = require('../../config/keys').STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeKey);

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
                // photo: { type: GraphQLUpload }
            },
            async resolve(_, { name, description, weight, price, category }, ctx) {
                // const file = await args.file;
                // const { createReadStream, filename, mimetype } = file;
                // const fileStream = createReadStream();

                // //Here stream it to S3
                // // Enter your bucket name here next to "Bucket: "
                // const uploadParams = {
                // Bucket: "gqlfence-dev",
                // Key: filename,
                // Body: fileStream
                // };
                // const result = await s3.upload(uploadParams).promise();

                // console.log(result);

                // return file;
                
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
                token: { type: GraphQLString },
                products: { type: GraphQLList(GraphQLID) },
                total: { type: GraphQLInt },
                // prices: { type: GraphQLList(GraphQLInt) },
                user: { type: GraphQLID },
                email: { type: GraphQLString },
                shipping_name: { type: GraphQLString },
                shipping_address1: { type: GraphQLString },
                shipping_address2: { type: GraphQLString },
                shipping_city: { type: GraphQLString },
                shipping_state: { type: GraphQLString },
                shipping_zipcode: { type: GraphQLString },
                billing_name: { type: GraphQLString },
                billing_address1: { type: GraphQLString },
                billing_address2: { type: GraphQLString },
                billing_city: { type: GraphQLString },
                billing_state: { type: GraphQLString },
                billing_zipcode: { type: GraphQLString }

            },
            async resolve(_, { 
                token, products, user, total, shipping_name, shipping_address1, shipping_address2, shipping_city,
                shipping_state, shipping_zipcode, billing_name, billing_address1, billing_address2, billing_city,
                billing_state, billing_zipcode, email
            }, ctx) {
                      // validatePrice fn
                      let order = {
                        products,
                        total,
                        email,
                        paymentInfo: {
                          gateway: "Stripe",
                          token
                        },
                        billingInfo: {
                          name: billing_name,
                          address1: billing_address1,
                          address2: billing_address2,
                          city: billing_city,
                          state: billing_state,
                          zipcode: billing_zipcode
                        },
                        shippingInfo: {
                          name: shipping_name,
                          address1: shipping_address1,
                          address2: shipping_address2,
                          city: shipping_city,
                          state: shipping_state,
                          zipcode: shipping_zipcode
                        }
                      };
                      if (user) order.user = user;
                      console.log(order);

                      // stripe validation
                      try {
                        let { status } = await stripe.charges.create({
                          amount: total * 100,
                          currency: "usd",
                          description: "An example charge",
                          source: token
                        });

                        return new Order(order).save();
                      } catch (err) {
                        console.log(err);
                        return err;
                      }
                    }
        }
    }
});

module.exports = mutation;