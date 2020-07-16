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
  async createTodo({ todo }) {
    try {
      return await Todo.create({
        title: todo.title,
        done: false,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Creating failed");
    }
  },
  async completeTodo({ id }) {
    try {
      const todo = await Todo.findByPk(id);
      todo.done = true;
      await todo.save();
      return todo;
    } catch (error) {
      throw new Error("Completing failed");
    }
  },
  async removeTodo({ id }) {
    try {
      const todos = await Todo.findAll({
        where: { id },
      });
      await todos[0].destroy();
      return true;
    } catch (error) {
      throw new Error("Removing failed");
    }
  },
};
