const path = require('path');

module.exports = function(app) {

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/index.html'));
});

}

