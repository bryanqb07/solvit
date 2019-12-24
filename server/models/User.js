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
        required: true,
        min: 8,
        max: 32
    },
    isGiver: {
        type: Boolean,
        required: true
    },
    expertiseCategories: [{
        type: Schema.Types.ObjectId,
        ref: "category"
    }],
    expertiseTitle: {
        type: String
    },
    expertiseDescription: {
        type: String
    },
    hourlyRate: {
        type: Number
    },
    giverVideos: [{
        type: Schema.Types.ObjectId,
        ref: "video"
    }],
    schedule: [{
        type: Date
    }],
    pendingGiverReservations: [{
        type: Schema.Types.ObjectId,
        ref: "reservations"
    }],
    scheduledGiverReservations: [{
        type: Schema.Types.ObjectId,
        ref: "reservations"
    }],
    isAsker: {
        type: Boolean,
        required: true
    },
    interests: [{
        type: Schema.Types.ObjectId,
        ref: "category"
    }],
    askerVideos: [{
        type: Schema.Types.ObjectId,
        ref: "video"
    }],
    pendingAskerReservations: [{
        type: Schema.Types.ObjectId,
        ref: "reservations"
    }],
    scheduledAskerReservations: [{
        type: Schema.Types.ObjectId,
        ref: "reservations"
    }],
    gems: {
        type: Number,
        default: 0
    },
    avatar_url: {
        type: String
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    followees: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    likedVideos: [{
        type: Schema.Types.ObjectId,
        ref: "video"
    }],
    reviewsGiven: [{
        type: Schema.Types.ObjectId,
        ref: "review"
    }],
    reviewsReceived: [{
        type: Schema.Types.ObjectId,
        ref: "review"
    }],
    purchaseLogs: [{
        type: Schema.Types.ObjectId,
        ref: "purchaseLog"
    }],
    callLogs: [{
        type: Schema.Types.ObjectId,
        ref: "callLog"
    }],
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: "notification"
    }]
}, { timestamps: true });

module.exports = mongoose.model("user", UserSchema);