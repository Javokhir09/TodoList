import React, { useEffect, useState } from 'react'

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {text: newTodo, completed: false}]);
      setNewTodo('');
    }
  };

  const toggleComplete = (index) => {
    const updateTodos = todos.map((todo, i) =>
      i === index ? {...todo, completed: !todo.completed} : todo);
    setTodos(updateTodos);
  }

  const deleteTodo = (index) => {
    const updateTodos = todos.filter((_, i) => i !== index);
    setTodos(updateTodos);
  }

  return (
    <div className='todo-con'>
      <div className="todo-top">
        <h3>Todo List</h3>
        <hr />
        <div className="bottom">

          <input 
            type="text" 
            id='newTodo' 
            placeholder='Add new todo...'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />

          <button type='submit' onClick={addTodo}>Add</button>

        </div>
      </div>
      <ul className='todo-list'>
        {todos.map((todo, index) => (
          <li key={index}>

            <span
              onClick={() => {toggleComplete(index)}} 
              style={{
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through': 'none'
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(index)}>&times;</button>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList;