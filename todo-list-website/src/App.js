import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import uuid from 'uuid/dist/v4'
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {

  function toggleTodo(id)
  {
    const NewTodos = [...todos]
    const todo = NewTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(NewTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(
      prevTodos => {
        return [...prevTodos, {id: uuid(), name: name, complete: false}]
      }     
    )
    todoNameRef.current.value = null;
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem('LOCAL_STORAGE_KEY'))
    if(storedTodos) setTodos(storedTodos)
  },[]
  )

  useEffect(()=>{
    localStorage.setItem('LOCAL_STORAGE_KEY', JSON.stringify(todos))
  },[todos]
  )

  return (
    <div>
    <TodoList todos={todos} toggleTodo = {toggleTodo}/>
    <input ref={todoNameRef} type="text"></input>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  )
}



export default App;
