const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');
const opts = { toJSON: { virtuals: true } };
const imgSchema = new Schema({
    uniqueId: { type: String }, 
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imgSchema);