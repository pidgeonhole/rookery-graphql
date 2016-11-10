"use strict";

const {buildSchema} = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    categories: [Category]!
    category(id: Int!): Category
    problems: [Problem]!
    problem(id: Int!): Problem
  }
  
  type Category {
    id: ID!
    name: String!
    description: String
    problems: [Problem]!
  }
  
  type Problem {
    id: ID!
    category_id: Int!
    title: String!
    description: String
  }
  
  input ProblemInput {
    category_id: ID!
    title: String!
    description: String!
  }
  
  input NestedProblemInput {
    title: String!
    description: String!
  }
  
  input CategoryInput {
    name: String!
    description: String!
    problems: [NestedProblemInput!]
  }
  
  type Mutation {
    newCategory(category: CategoryInput!): Category
    newProblem(problem: ProblemInput!): Problem
  }
`);

module.exports = schema;