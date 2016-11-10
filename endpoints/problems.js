"use strict";

const db = require('../db');

const Problem = require('../types/Problem');

function problems() {
  return db.problems()
    .then(ps => ps.map(p => new Problem(p.id, p.category_id, p.title)));
}

module.exports = problems;
