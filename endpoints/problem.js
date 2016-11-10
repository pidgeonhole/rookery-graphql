"use strict";

const db = require('../db');

const Problem = require('../types/Problem');

function problem({id}) {
  return db.problem(id)
    .then(p => new Problem(p.id, p.category_id, p.title));
}

module.exports = problem;
