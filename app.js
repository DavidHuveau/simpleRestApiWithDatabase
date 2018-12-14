const express = require('express');
// const expressOasGenerator = require('express-oas-generator');
const app = express();
// expressOasGenerator.init(app, {});
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { config } = require('./config.root');
const { studentsRouter, classroomRouter } = require('./routes');

const PORT = config.port;

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(`${config.rootAPI}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`${config.rootAPI}/students`, studentsRouter);
app.use(`${config.rootAPI}/classroom`, classroomRouter);
app.use((req, res) => {
  res.status(404).send('Sorry cant find that!');
});

app.listen(PORT, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
