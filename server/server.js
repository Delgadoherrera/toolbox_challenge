const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;
const routes = require('./api/files');

app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server ON:  ${PORT}`);
});

module.exports = app;
