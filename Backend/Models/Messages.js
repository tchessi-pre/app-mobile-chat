const mongoose = require('mongoose');

// create schema user
const messagesSchema = mongoose.Schema({
userId: { type: String, required: true },
content: { type: String, required: true },
imageUrl: { type: String, required: false },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("MessagesMongoDB", messagesSchema);