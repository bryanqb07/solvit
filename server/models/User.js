const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 8,
        max: 32
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isStaff: {
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model("user", UserSchema);