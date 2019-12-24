const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    pusher: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    reason: {
        type: String,
        required: true
    },
    viewed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("notification", NotificationSchema);