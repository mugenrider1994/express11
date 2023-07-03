const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// API Routes
router.get('/notes', (req, res) => {
  // Read the notes from the file
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));

  // Send the notes as a response
  res.json(notes);
});

router.post('/notes', (req, res) => {
  // Read the existing notes from the file
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));

  // Create a new note object with the request body
  const newNote = {
    id: Math.floor(Math.random() * 1000), // Generate a random ID
    title: req.body.title,
    text: req.body.text,
  };

  // Add the new note to the notes array
  notes.push(newNote);

  // Write the updated notes array back to the file
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

  // Send the new note as a response
  res.json(newNote);
});

module.exports = router;