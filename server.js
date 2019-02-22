const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

const actionRoute = require('./data/helpers/actionsRouter.js');
const projectRoute = require('./data/helpers/projectsRouter.js');

//global middleware:
server.use(express.json());

server.use(helmet());
server.use(morgan());
server.use('/api/actions', actionRoute);
server.use('/api/projects', projectRoute)



server.get('/', (req, res) => {
    res.send(`<h2>Sprint Challenge-Node-Express -- Success</h2>`);
})

module.exports = server; 