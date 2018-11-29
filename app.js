const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('./config.root');
const { studentsRouter, classroomRouter } = require('./routers');

const PORT = config.port;

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(`${config.rootAPI}/students`, studentsRouter);
app.use(`${config.rootAPI}/classroom`, classroomRouter);

app.listen(PORT, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
