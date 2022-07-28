const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const http = require('http');

const config = require('./config');
const desktopApi = require('./routes/desktop');


// * Morgan Logger
app.use(morgan('tiny'));

// * Enabre cors by all control origins
app.use(cors());

// * Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Services
desktopApi(app);

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});