const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(',')
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

const db = require('./models');

db.sequelize.sync().then(() => {
  console.log('Sync Database');
});

app.get('/', function (req, res) {
  res.send({ status: 'success' });
});

require('./controller/auth.routes')(app);
require('./controller/user.routes')(app);

const server = app.listen(process.env.PORT || 8081, function () {
  const port = server.address().port;
  console.log('App started at port:', port);
});
