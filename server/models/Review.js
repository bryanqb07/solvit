const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    asker: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    giver: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    score: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("review", ReviewSchema);
