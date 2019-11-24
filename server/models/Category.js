const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "product"
        }
    ]
});

module.exports = mongoose.model("category", CategorySchema);