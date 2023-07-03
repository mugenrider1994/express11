const fs = require('fs');
const express = require('express');
const router = express.Router();

const dataPath = './Develop/db/db.json';

router.get('api/notes', function (req, res) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(data);
});

router.get('api/notes/:id', function (req, res) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(data[Number(req.params.id)]);
});

router.post('api/notes', function (req, res) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const newNote = req.body;
  const uniqueId = String(data.length);
  newNote.id = uniqueId;
  data.push(newNote);
  console.log(uniqueId);

  fs.writeFileSync(dataPath, JSON.stringify(data));

  res.json(data);
});

module.exports = router;