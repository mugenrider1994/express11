const fs = require('fs');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const dataPath = './Develop/db/db.json';

  app.get('/assets/notes', function (req, res) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
  });

  app.get('/assets/notes/:id', function (req, res) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data[Number(req.params.id)]);
  });

  app.post('/assets/notes', function (req, res) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const newNote = req.body;
    const uniqueId = String(data.length);
    newNote.id = uniqueId;
    data.push(newNote);
    console.log(uniqueId);

    fs.writeFileSync(dataPath, JSON.stringify(data));

    res.json(data);
  });
};