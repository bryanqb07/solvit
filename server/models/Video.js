const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    asker: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    giver: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    thumbnailUrl: {
        type: String
    },
    tags: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("video", VideoSchema);