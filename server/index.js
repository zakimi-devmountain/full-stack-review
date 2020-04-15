const express = require('express'),
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController'),
      port = 3333,
      app = express();

app.use(express.json());

app.listen(port, () => console.log(`Memeing on port ${port}`));