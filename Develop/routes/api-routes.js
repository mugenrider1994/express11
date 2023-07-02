const fs = require('fs');

module.exports = function (app) {
  const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

  app.get('/api/notes', function (req, res) {
    res.json(data);
  });

  app.get('/api/notes/:id', function (req, res) {
    res.json(data[Number(req.params.id)]);
  });

  app.post('/api/notes', function (req, res) {
    const newNote = req.body;
    const uniqueId = String(data.length);
    newNote.id = uniqueId;
    data.push(newNote);
    console.log(uniqueId);

    fs.writeFileSync('./db/db.json', JSON.stringify(data));

    res.json(data);
  });
};