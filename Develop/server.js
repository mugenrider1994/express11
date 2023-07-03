const express = require('express');
const app = express();
const path = require('path');
const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
