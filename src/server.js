const express = require('express');
const morgan = require('morgan');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// CORS enabled for allowing 3rd party web-apps to consume Swagger metadata and backedn.
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'Oringin, X-Reqiested-With, Content-Type, authorization');
  res.header('Access-Control-Allow-Origin', 'OPTIONS,GET,POST,PUT,DELETE');

  // Allow preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routers
app.use(require('./routes/index'));

// Starting the server
app.listen(3000, () => {
 console.log(`Server running on port ${app.get('port')}`);
});
