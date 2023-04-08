export const baseUrl = "http://localhost:3000/api/v1";

export const schema = {
  todos: {
    type: "todos",
    relationships: {
      user: {
        type: "users",
      },
    },
  },
  users: {
    type: "users",
    relationships: {
      todos: {
        type: "todos",
      },
    },
  },
};
