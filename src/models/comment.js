const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjetId } = mongoose;
const cmmntSchema = new Schema({
    image_id: { type: Schema.Types.ObjectId },
    name: { type: String },
    email: { type: String }, 
    comment: { type: String },
    gravatar: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', cmmntSchema);