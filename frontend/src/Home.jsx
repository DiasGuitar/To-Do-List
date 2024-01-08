import { useState, useEffect } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";

const themes = [
  {
    name: 'theme1',
    displayName: 'Theme 1',
  },
  {
    name: 'theme2',
    displayName: 'Theme 2',
  },
  {
    name: 'theme3',
    displayName: 'Theme 3',
  },
  {
    name: 'theme4',
    displayName: 'Theme 4',
  },
  {
    name: 'theme5',
    displayName: 'Theme 5',
  },
]

function Home() {
  const [todos, setTodos] = useState([])
  const [selectedTheme, setSelectedTheme] = useState('theme1')

  useEffect(() => {
    axios
    .get('http://localhost:3001/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  }, [])

  const handleEdit = (id) => {
    axios
    .put('http://localhost:3001/update/'+id)
    .then(result => {
        location.reload()
    })
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios
    .delete('http://localhost:3001/delete/'+id)
    .then(result => {
        location.reload()
    })
    .catch(err => console.log(err))
  }

  const changeTheme = (theme) => {
    document.body.className = ''
    document.body.classList.add(theme)
    setSelectedTheme(theme)
  }

  return (
    <div className={`home ${selectedTheme}`}>
      <div className="theme-buttons">
        {themes.map((theme) => (
            <button key={theme.name} onClick={() => changeTheme(theme.name)}>
                {theme.displayName}
            </button>
        ))}
      </div>
      <h1>To-Do List</h1>
      <Create />
      {
        todos.length === 0
        ?
        <div><h2>No Record</h2></div>
        :
        todos.map(todo => (
          <div className='task'>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? <BsFillCheckCircleFill className="icon" />
                         : <BsCircleFill className="icon" />
              }
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Home