const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const imgSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

imgSchema.virtual('uniqueId')
    .get(() => {
        return this.filename.replace(
            path.extname(this.filename, "")
        );
    });

module.exports = mongoose.model('Image', imgSchema);