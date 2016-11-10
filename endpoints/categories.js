"use strict";

const debug = require('debug')('rookery-graphql:db');
const db = require('../db');

const Category = require('../types/Category');

function categories() {
  return db.categories()
    .then(cs => cs.map(c => new Category(c.id, c.name, c.description)));
}

module.exports = categories;