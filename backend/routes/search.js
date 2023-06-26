const express = require('express');

const route = express.Router();

const { search } = require('../controllers/search');

route
  .post('/search', search);

module.exports = route;
