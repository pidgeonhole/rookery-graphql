"use strict";

const debug = require('debug')('rookery-graphql:db');
const pgp = require('pg-promise')();

const cn = {
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD
};

const db = pgp(cn);

function categories() {
  return db.any(`
    SELECT id, name, description 
    FROM categories`);
}

function category(id) {
  return db.oneOrNone(`
    SELECT id, name, description
    FROM categories
    WHERE id = $1`,
    id);
}

/**
 * Retrieves problems from the database
 * @param {number} [category_id] - Restrict results to a single category
 * @returns {Promise<{id, category_id, title}[]>}
 */
function problems(category_id) {
  if (category_id) {
    return db.any(`
      SELECT id, category_id, title
      FROM problems
      WHERE category_id = $1`,
      category_id);
  } else {
    return db.any(`
      SELECT id, category_id, title 
      FROM problems`);
  }
}

/**
 * Fetches a single problem from the database
 * @param {number} id
 * @returns {Promise<{id, category_id, title}>}
 */
function problem(id) {
  return db.oneOrNone(`
    SELECT id, category_id, title
    FROM problems
    WHERE id = $1`,
    id);
}

function problem_description(problem_id) {
  return db.oneOrNone(`
    SELECT description
    FROM problem_descriptions
    WHERE problem_id = $1`,
    problem_id);
}

module.exports = {
  categories,
  category,
  problems,
  problem,
  problem_description
};
