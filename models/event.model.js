const mongoose = require("mongoose")

const eventschema = new mongoose.Schema({
title: {
    type: String,
    required: true,
},
image: {
    type: String,
    required: true,
},
eventType: String,
host: {
    type: String,
    required: true,
},
timing: {
    type: String,
    required: true,
},
address: {
    type: String,
    required: true,
},
price: {
    type: String,
    required: true,
},
speakers: {
    type: [String],
    required: true,
},
speakers: [
  { name: String, image: String },
  { name: String, image: String }
],
details: {
    type: String,
    required: true,
},
additionalInfo: {
    type: [String],
    required: true,
},
eventTags: {
    type: [String],
    required: true,
}
}, {
    timestamps: true
})

const Event = mongoose.model("Events", eventschema)

module.exports = Event