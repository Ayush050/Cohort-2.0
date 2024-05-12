import { useState } from 'react'
import './App.css'
import {CreateTodo} from './components/CreateTodo'
 import { Todos } from './components/Todos'

 function App() { 
   
  const [todos,setTodos]=useState([]);

  fetch('http://localhost:3000/todos')
  .then(async function(res){
         const jsondata=await res.json(); 
         setTodos(jsondata.todos);
  })

  return (
    <div>   
    <h1>Todo APP</h1>
     <CreateTodo/>
     <Todos todos={todos}></Todos>
     </div>
  )
}

export default App
