const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    email: {
        type: String,
        required: true
    },
    productRentalPeriods: [
        {
            startDate: {
                type: Date,
                required: true
            }
        },
        {
            endDate: {
                type: Date,
                required: true
            }
        }
    ],
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    billingInfo: {
        name: {
            type: String,
            required: true
        },
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        }
    },
    shippingInfo: {   
        shippingStatus: {
            type: String,
            default: "Not shipped"
        },
        name: {
            type: String,
            required: true
        },
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        }
    },
    paymentInfo: {
        gateway: { 
            type: String,
            required: true 
        },
        token: { 
            type: String,
            required: true
        }
    },
    insured: {
        type: Boolean,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    insuranceFee: {
        type: Number,
        required: true
    },
    installationFee: {
        type: Number,
        required: true
    },
    salesTax: {
        type: Number
    },
    total: {
        type: Number,
        required: true
    },
    totalFootage: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("order", OrderSchema);