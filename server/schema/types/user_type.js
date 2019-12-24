const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat,
    GraphQLID, GraphQLBoolean, GraphQLList, GraphQLInt } = graphql;

const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
        loggedIn: { type: GraphQLBoolean },
        expertiseTitle: { type: GraphQLString },
        expertiseDescription: { type: GraphQLString },
        hourlyRate: { type: GraphQLFloat },
        gems: { type: GraphQLInt },
        avatar_url: { type: GraphQLString },
        isAsker: { type: GraphQLBoolean },
        schedule: { type: GraphQLList(GraphQLString) }, // FIX
        expertiseCategories: {
            type: new GraphQLList(require("./category_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("expertiseCategories")
                    .then(user => user.expertiseCategories);
            }
        },
        giverVideos: {
            type: new GraphQLList(require("./video_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("giverVideos")
                    .then(user => user.giverVideos);
            }
        },
        pendingGiverReservations: {
            type: new GraphQLList(require("./reservation_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("reservations")
                    .then(user => user.pendingGiverReservations);
            }
        },
        scheduledGiverReservations: {
            type: new GraphQLList(require("./reservation_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("reservations")
                    .then(user => user.scheduledGiverReservations);
            }
        },
        pendingAskerReservations: {
            type: new GraphQLList(require("./reservation_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("reservations")
                    .then(user => user.pendingAskerReservations);
            }
        },
        scheduledAskerReservations: {
            type: new GraphQLList(require("./reservation_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("reservations")
                    .then(user => user.scheduledAskerReservations);
            }
        },
        interests: {
            type: new GraphQLList(require("./category_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("categories")
                    .then(user => user.interests);
            }
        },
        askerVideos: {
            type: new GraphQLList(require("./video_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("askerVideos")
                    .then(user => user.askerVideos);
            }
        },
        followers: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("users")
                    .then(user => user.followers);
            }
        },
        followees: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("users")
                    .then(user => user.followees);
            }
        },
        likedVideos: {
            type: new GraphQLList(require("./video_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("videos")
                    .then(user => user.likedVideos);
            }
        },
        reviewsGiven: {
            type: new GraphQLList(require("./review_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("reviews")
                    .then(user => user.reviewsGiven);
            }
        },
        reviewsReceived: {
            type: new GraphQLList(require("./review_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("reviews")
                    .then(user => user.reviewsReceived);
            }
        },
        purchaseLogs: {
            type: new GraphQLList(require("./purchase_log_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("videos")
                    .then(user => user.purchaseLogs);
            }
        },
        callLogs: {
            type: new GraphQLList(require("./call_log_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("callLogs")
                    .then(user => user.callLogs);
            }
        },
        notifications: {
            type: new GraphQLList(require("./notification_type")),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate("notifications")
                    .then(user => user.notifications);
            }
        }
    })
});

module.exports = UserType;