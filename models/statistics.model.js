const mongoose = require("mongoose")
const { Schema } = mongoose;


const statisticsSchema = new Schema({
  functionName: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Statistics', statisticsSchema);