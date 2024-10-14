// Package
require('dotenv').config();
const express = require('express');

// Note Router
const noteApp = express.Router();

// Import User Model
const NoteModel = require('../Models/note.model');

// Create a new Note
noteApp.post('/create', async function (req, res) {

    // Note content given by user
    const { title, content } = req.body

    try {

        // Creates a new Note with the given title, content in MongoDB Database
        const newNote = new NoteModel({ title, content, user: req.user._id });
        await newNote.save();

        // Returns a success message along with the newly created Note
        return res.status(201).json({ message: "Note Created Successfully", newNote });
    } catch (error) {
        // Error response
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})


// Get all notes or can get by search in 'q' query
noteApp.get('/', async function (req, res) {

    // Query that user wants to search
    const { q } = req.query;

    try {

        // Search for notes by title if 'q' query is provided
        if (q) {
            // Get all notes by query
            const notes = await NoteModel.find({ title: { $regex: new RegExp(q, 'i') } })
            return res.status(200).json({ notes: notes })
        }

        // Get all notes of logged in user
        const notes = await NoteModel.find({ user: req.user._id }).sort({ updatedAt: -1 });
        return res.json({ message: `Number of Notes : ${notes.length}`, notes });
    } catch (error) {
        // Errror response
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

// Update notes by given id in request params
noteApp.patch('/update/:id', async function (req, res) {

    // Updated note content given by user
    const { title, content } = req.body;

    try {
        // Find and update the note with given id
        const updatedNote = await NoteModel.findByIdAndUpdate(req.params.id, { title, content });

        // Returns a success message along with the updated Note
        return res.json({ message: "Note Updated Successfully", updatedNote });
    } catch (error) {
        // Error response
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

})

// Delete notes by given id in request params
noteApp.delete('/delete/:id', async function (req, res) {

    try {
        // Find and delete the note with given id
        const deletedNote = await NoteModel.findByIdAndDelete(req.params.id);

        // Returns a success message along with the deleted Note
        return res.json({ message: "Note Deleted Successfully", deletedNote });
    } catch (error) {
        // Error response
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})


module.exports = noteApp;