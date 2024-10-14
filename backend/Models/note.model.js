// Package
const mongoose = require('mongoose');

// Schema
const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Model
const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel;