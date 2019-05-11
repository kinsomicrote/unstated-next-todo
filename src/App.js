import React, { useState } from 'react';
import { createContainer } from "unstated-next";
import shortid from "shortid";

const useTodo = () => {
  const list = [
    { id: 1, title: 'Write code' },
    { id: 2, title: 'Buy milk' }
  ]
  const [todos, addTodo] = useState(list);
  const [item, setTodo] = useState("");

  const handleTodo = event => {
    setTodo(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const value = {
      id: shortid.generate(),
      title: item
    }
    addTodo(todos.concat(value));
    setTodo("");
  };

  return {
    todos,
    item,
    handleTodo,
    handleSubmit
  };
};

const Todo = createContainer(useTodo);

const TodoContainer = () => {
  const todo = Todo.useContainer();
  return (
    <div>
      <p>Add Todos</p>
      <input type="text" value={todo.item} onChange={todo.handleTodo} />
      <button onClick={todo.handleSubmit}>Add</button>
      <div>
        {todo.todos.map((item) => {
          return (
            <ul key={item.id}>
              <li>{item.title}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

const App = () => (
  <Todo.Provider>
    <TodoContainer />
  </Todo.Provider>
)

export default App;
