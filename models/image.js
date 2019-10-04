const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    created_at: { type: Date, default: Date.now() },
    date: { type: String },
    user: { type: String },
    logo: { type: Boolean },
    tag: { type: String },
    evento: { type: String }
});


module.exports = model('Image', imageSchema);