const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
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
    duration: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("reservation", ReservationSchema);