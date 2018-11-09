const express = require('express');

const TweetController = require('./controllers/TweetController')
const LikesController = require('./controllers/LikesController')

const routes = express.Router();

routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.store);

routes.post('/likes/:id', LikesController.store);

module.exports = routes;