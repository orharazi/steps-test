const mongoose = require("mongoose")
const { Schema } = mongoose;


const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
}, {timestamps: true})

module.exports = mongoose.model('Posts', postSchema);