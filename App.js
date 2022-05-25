import React from 'react'
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([])
  const [todo,setTodo] = React.useState("")
  const [todoEditing, setTodoEditing ] = React.useState(null)
  const [editingText, setEditingText ] = React.useState("")

   React.useEffect(() => {
     const temp = localStorage.getItem("todos")
     const loadeTodos =JSON.parse(temp)
     if (loadeTodos){
       setTodos(loadeTodos)
   }
   }, [] )

  React.useEffect (() => { 
  const temp = JSON.stringify(todos)
  localStorage.setItem("todos", temp)

  }, [todos])

  {/*function that run when form is submetied 
   and we should give the function the access to the same e value */}

    function handeleSubmet(e) {
    e.preventDefault();   {/* we use default becouse we dont wont refresh of the page in react  */}
    
    
    {/* make object for todos array for the first todo  */}
    const newTodo = {
      id:new Date().getTime(),
      text: todo,
      completed:false,

    } 
    {/* Add new object to our to do list  */}
    setTodos([...todos].concat(newTodo))
    setTodo("")
  }

    
   function deleteTodo(id) {
     const updateTodos = [...todos].filter((todo) => todo.id !== id )

     setTodos(updateTodos)

   }

   

   function toggleComplete(id) {
      const updateTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }

        
        return todo
      })

      setTodos(updateTodos)
    }
      function editTodo(id){
      
      const updateTodos = [...todos].map((todo )=> {
        if (todo.id ===id ){
        todo.text = editingText 
      }
        return todo
      } )
      setTodos(updateTodos)  
      setTodoEditing(null)
      setEditingText("")
   }


   


  return (
    <div className="App">
     <form onSubmit={handeleSubmet}>   {/* */}
     <h1> Set your small goals .... To achieve your big dreams </h1>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} /> 
        
        
        <button type="submit"> add </button>
      </form>


      {todos.map((todo) => <div key={todo.id}> 
       {todoEditing === todos.id ? ( <input type="text"
       onChange={(e) => setEditingText(e.target.value)}value= {editingText}/>) : (<div> {todo.text} </div>)}

    <div className="card-task">  
      <input type="checkbox" 
      onChange={() => toggleComplete(todo.id) }
      checked={todo.completed} />

      <button onClick={() => deleteTodo(todo.id)} >Delete</button>

      
      
      {todoEditing === todo.id ? (<button onClick={() => editTodo(todos.id)}> Submit Edit </button>) :
       (<button noClick={() => setTodoEditing (todo.id)}> Edit Todo </button>) }
       </div>
      
      
     </div>)}
    </div>
  ); 
}

export default App;
