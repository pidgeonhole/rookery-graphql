"use strict";

const debug = require('debug')('rookery-graphql:types/Problem');
const db = require('../db');

class Problem {
  constructor(id, category_id, title) {
    this.id = id;
    this.category_id = category_id;
    this.title = title;
  }

  description() {
    return db.problem_description(this.id)
      .then(result => result !== null ? result.description : null);
  }
}

module.exports = Problem;