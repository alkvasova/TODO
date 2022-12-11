import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import AddTodo from './Todo/AddTodo'
import Loader from './Loader'


function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true) //показывает лоадер, если идет процесс загрузки. заведем стейт, чтобы следить за лоадингом

  useEffect(() => {//работа с сервером
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5') //обращаемся к фетч, возвр список todos. ?_limit=5 квери параметр, чтобы загрузилось 5 элементов
      .then(response => response.json())
      .then(todos => {//получаем массив тудус 
        setTimeout(() => {//чтобы сервер отвечал с задержкой в 2 сек
          setTodos(todos)//чтобы изменить стейт, обращаемся к функции setTodos и передаем массив todos 
          setLoading(false)//убираем лоадер после загрузки
        }, 2000)
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
        
        
      {loading && <Loader/*если лоадинг находится в тру, показываем компонент Loading*/ />}
        
        {todos.length ? (/*Условие показываем нет дел*/
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (//если лоадинг, тогда ничего не выводим, иначе выводим нет дел
          <p>No todos!</p>
        )}

        
      </div>
    </Context.Provider>
  )
}

export default App;
