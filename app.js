var express = require('express');
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');

const fakeDb = {
    categories: [
        {
            id: 1,
            name: 'Dynamic Programming',
            description: 'This category contains problems about dynamic programming.'
        },
        {
            id: 2,
            name: 'Competitive Programming',
            description: 'This category contains problems about competitive programming'
        }
    ],
    problems: [
        {
            id: 1,
            category_id: 1,
            title: 'Fibonacci',
            description: 'Can we do better than a naive recursive fibonacci algorithm?'
        },
        {
            id: 2,
            category_id: 2,
            title: 'Deepavali',
            description: 'This was a Google APAC Test 2017 Round E problem.'
        }
    ]
};


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    categories: [Category]!
    category(id: Int!): Category
    problems: [Problem]!
    problem(id: Int!): Problem
  }
  
  type Category {
    id: Int!
    name: String!
    description: String!
    problems: [Problem]!
  }
  
  type Problem {
    id: Int!
    problem_id: Int!
    title: String!
    description: String!
  }
`);

function categories() {
    return fakeDb.categories.map(cat => new Category(cat.id)) || [];
}

function category({id}) {
    const cat = fakeDb.categories.find(cat => cat.id === id) || null;
    if (cat) {
        return new Category(id);
    } else {
        return null;
    }
}

function problems() {
    return fakeDb.problems.map(prob => new Problem(prob.id)) || [];
}

function problem({id}) {
    const prob = fakeDb.problems.find(prob => prob.id === id) || null;
    if (prob) {
        return new Problem(id);
    } else {
        return null;
    }
}

class Category {
    constructor(id) {
        this.id = id;
    }

    id() {
        return this.id;
    }

    name() {
        const category = fakeDb.categories.find(cat => cat.id === this.id);
        return category.name;
    }

    description() {
        const category = fakeDb.categories.find(cat => cat.id === this.id);
        return category.description;
    }

    problems() {
        return fakeDb.problems
            .filter(prob => prob.category_id === this.id)
            .map(prob => new Problem(prob.id));
    }
}

class Problem {
    constructor(id) {
        this.id = id;
    }

    id() {
        return this.id;
    }

    title() {
        const prob = fakeDb.problems.find(prob => prob.id === this.id) || {};
        return prob.title || null;
    }

    description() {
        const prob = fakeDb.problems.find(prob => prob.id === this.id) || {};
        return prob.description || null;
    }
}

// The root provides a resolver function for each API endpoint
var root = {
    categories,
    category,
    problems,
    problem
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');