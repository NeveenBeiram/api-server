'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

const logger = require('./middleware/logger.js');


const foodRoutes = require('./routes/food.js');
const clothesRoutes = require('./routes/clothes.js');


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(logger);


app.use('/api/v1/food', foodRoutes);
app.use('/api/v1/clothes', clothesRoutes);

app.get('/', home);
app.get('/bad', badReq);

function home(req,res){
  res.send('welcome to server.js');
}
function badReq(req, res) {
  throw new Error('Something went wrong !!!!!');
}

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    server: app,
    start: (port) => {
        const PORT = port || 3000;
        app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
    }
}