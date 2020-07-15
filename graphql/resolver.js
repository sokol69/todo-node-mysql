const Todo = require("../models/todo");

module.exports = {
  test() {
    return "Hello Graphql";
  },
  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (error) {
      throw new Error("Fetch todos in not available");
    }
  },
};
