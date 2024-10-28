import React, { useEffect, useState } from 'react'
import unchecked from "../../assets/images/unchecked.png"
import checked from "../../assets/images/checked.png"
import icon from "../../assets/images/icon.png"
import "./TodoList.css"

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
  };

  const deleteTodo = (index) => {
    const updateTodos = todos.filter((_, i) => i !== index);
    setTodos(updateTodos);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo();
    };
  };

  return (
    <div className='todo-con'>
      <div className="todo-top">
        <h3>Todo List <img src={icon} alt="icon" width={50} /></h3>
        <hr />
        <div className="bottom">

          <input 
            type="text" 
            id='newTodo' 
            placeholder='Add new todo...'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button type='submit' onClick={addTodo}>Add</button>

        </div>
      </div>
      <ul className='todo-list'>
        {todos.map((todo, index) => (
          <li key={index}>

            <div className="left-side">
              <img 
                src={todo.completed ? checked : unchecked} alt="" width={25} 
                onClick={() => {toggleComplete(index)}} 
              />
              <span
                className='text'
                onClick={() => {toggleComplete(index)}} 
                style={{
                  cursor: 'pointer',
                  textDecoration: todo.completed ? 'line-through': 'none'
                }}
                >
                {todo.text}
              </span>
            </div>
          
            <span className='del' onClick={() => deleteTodo(index)}>&times;</span>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList;