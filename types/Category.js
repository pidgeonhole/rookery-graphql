"use strict";

const debug = require('debug')('rookery-graphql:types/Category');
const db = require('../db');

const Problem = require('./Problem');

class Category {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  problems() {
    return db.problems(this.id)
      .then(ps => ps.map(p => new Problem(p.id, p.category_id, p.title)));
  }
}

module.exports = Category;
