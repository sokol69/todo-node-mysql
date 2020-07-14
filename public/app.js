new Vue({
  el: "#app",
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: "",
      todos: [],
    };
  },
  created() {
    fetch("/api/todo", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((todos) => {
        this.todos = todos;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();
      if (!title) {
        return;
      }
      fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          this.todos.push(todo);
          this.todoTitle = "";
        })
        .catch((error) => console.log(error));
    },
    removeTodo(id) {
      fetch(`/api/todo/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          this.todos = this.todos.filter((t) => t.id !== id);
        })
        .catch((error) => console.log(error));
    },
    completeTodo(id) {
      fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: true }),
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          const idx = this.todos.findIndex((t) => t.id === todo.id);
          this.todos[idx].updatedAt = todo.updatedAt;
        })
        .catch((error) => console.log(error));
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value, withTime) {
      const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };

      if (withTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
      }

      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    },
  },
});
