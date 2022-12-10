import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import AddTodo from './Todo/AddTodo'


function App() {
  const [todos, setTodos] = React.useState([])

  useEffect(() => {//работа с сервером
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5') //обращаемся к фетч, возвр список todos. ?_limit=5 квери параметр, чтобы загрузилось 5 элементов
      .then(response => response.json())
      .then(todos => {//получаем массив тудус 
        setTodos(todos)//чтобы изменить стейт, обращаемся к функции setTodos и передаем массив todos 
      })
  }, [])


  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        } 
        return todo
      })
    )
  }

  //Удаляем строки
  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos/*чтобы изменить стейт*/(
      todos.concat([//метод concat, чтобы добавить нужный эл-нет
        { 
          title,
          id: Date.now(),
          completed:false
        }
      ])
    )
  }

  return (
    <Context.Provider value={{removeTodo: removeTodo}}>
      <div className='wrapper'>
        <h1>React tutorial</h1>
        <AddTodo onCreate={addTodo}/>
        
        {todos.length ? (/*Условие показываем нет дел*/
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : (
          <p>No todos!</p>
        )}

        
      </div>
    </Context.Provider>
  )
}

export default App;
