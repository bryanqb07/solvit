const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CallLogSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
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
  }
}, { timestamps: true });

module.exports = mongoose.model("callLog", CallLogSchema);
