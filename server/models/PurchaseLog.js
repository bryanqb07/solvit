const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseLogSchema = new Schema({
    date: {
        type: Date,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    gems: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("purchaseLog", PurchaseLogSchema);
