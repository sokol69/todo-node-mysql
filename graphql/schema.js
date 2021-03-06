const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    name: String!
    age: Int!
  }

  type TestType {
    conunt: Int!
    user: [User!]!
  }

  type Todo {
    id: ID!
    title: String!
    done: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Query {
    test: TestType!
    getTodos: [Todo!]!
  }

  input TodoInput {
    title: String!
  }

  type Mutation {
    createTodo(todo: TodoInput!): Todo!
    completeTodo(id: ID!): Todo!
    removeTodo(id: ID!): Boolean!
  }
`);
