const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

const actionRoute = require('./data/helpers/actionsRouter.js');

//global middleware:
server.use(express.json());

server.use(helmet());
server.use(morgan());
server.use('/api/actions', actionRoute)


server.get('/', (req, res) => {
    res.send(`<h2>Node-Blog -- Success</h2>`);
})

module.exports = server; 