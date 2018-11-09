const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://goweek:goweek123@ds119091.mlab.com:19091/goweek-backend', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());

app.use(express.json());

app.use(require("./routes"))

app.listen(3000, () => {
    console.log('Server started');
});