"use strict";

const categories = require('./endpoints/categories');
const category = require('./endpoints/category');
const problems = require('./endpoints/problems');
const problem = require('./endpoints/problem');

// The root provides a resolver function for each API endpoint
const root = {
  categories,
  category,
  problems,
  problem

  // todo: newCategory and newProblem
};

module.exports = root;