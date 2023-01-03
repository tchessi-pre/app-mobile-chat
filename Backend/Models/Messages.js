const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator"); //import MongooseUValidator 

// create schema user
const messagesSchema = mongoose.Schema({
userId: { type: String },
name: { type: String },
content: { type: String, required: true },
imageUrl: { type: String, required: false },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
});

messagesSchema.plugin(uniqueValidator);

module.exports = mongoose.model("MessagesMongoDB", messagesSchema);