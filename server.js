const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();



//global middleware:
server.use(express.json());

server.use(helmet());
server.use(morgan());


module.exports = server; 