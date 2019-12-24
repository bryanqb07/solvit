const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt } = graphql;

const Video = mongoose.model("video");

const VideoType = new GraphQLObjectType({
    name: "CallLogType",
    fields: () => ({
        id: { type: GraphQLID },
        asker: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Video.findById(parentValue.id)
                    .populate("asker")
                    .then(video => video.asker);
            }
        },
        giver: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Video.findById(parentValue.id)
                    .populate("giver")
                    .then(video => video.giver);
            }
        },
        
        category: {
            type: new GraphQLList(require("./category_type")),
            resolve(parentValue) {
                return Video.findById(parentValue.id)
                    .populate("category")
                    .then(video => video.category);
            }
        },
        views: { type: GraphQLInt },
        likes: { type: GraphQLInt},
        dislikes: { type: GraphQLInt },
        url: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        thumbnailUrl: { type: GraphQLString },
        tags: { type: GraphQLList(GraphQLString) },
        rating: { type: GraphQLFloat }
    })
});

module.exports = VideoType;