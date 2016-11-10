"use strict";

const db = require('../db');

const Category = require('../types/Category');

function category({id}) {
  return db.category(id)
    .then(c => new Category(c.id, c.name, c.description));
}

module.exports = category;
