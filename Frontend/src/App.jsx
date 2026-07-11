import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  let [task, setTask] = useState("")
  let [priority, setPriority] = useState("")
  let [info, setInfo] = useState({})
  let [data, setData] = useState([])
  let [update, setUpdate] = useState(false)
  let [id, setId] = useState("")

  let handleTaskChange = (e) => {
    setTask(e.target.value)
  }

  let handleOptionSelect = (e) => {
    setPriority(e.target.value)
  }

  let handleClick = async () => {
    
  }

  useEffect(() => {
    async function todos() {
      let todosData = await axios.get("http://localhost:5000/alltodos")
      setData(todosData.data.data)
    }
    todos()
  }, [])

  let handleDelete = async (id) => {
    let data = await axios.delete(`http://localhost:5000/tododelete/${id}`)
    console.log(data)

    let todosData = await axios.get("http://localhost:5000/alltodos")
    setData(todosData.data.data)
  }

  let handleEdit = (item) => {
    setTask(item.task)
    setPriority(item.priority)
    setUpdate(true)
    setId(item._id)
  }

  let handleUpdate = async () => {
    let data = await axios.post(`http://localhost:5000/todoupdate/${id}`, {
      task: task,
      priority: priority
    })

    console.log(data)

    let todosData = await axios.get("http://localhost:5000/alltodos")
    setData(todosData.data.data)
  }

  let handleSubmit = async (e) => {
    e.preventDefault()

    let formData = new FormData(e.currentTarget)
    const task = formData.get("task");
    const priority = formData.get("priority");
    const image = formData.get("image");

    let data = await axios.post("http://localhost:5000/create/todo", formData)

    setInfo(data.data)

    let todosData = await axios.get("http://localhost:5000/alltodos")
    setData(todosData.data.data)

    setTask("")
    setPriority("")

  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>ToDo</h1>

      {info.success ? (
        <p>{info.message}</p>
      ) : (
        <p style={{ background: "red" }}>{info.message}</p>
      )}

      <input name='task' onChange={handleTaskChange} type="text" value={task}/>
      
      <select name='priority' onChange={handleOptionSelect} value={priority}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input name='image' type="file" />

      {update ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button type='submit' onClick={handleClick}>Submit</button>
      )}

      <ol>
        {data.map((item) => (
          <div key={item._id}>
            <li>
              {item.task} ==== {item.priority} ==== {item.status}
              <p  style={{ fontWeight: "bold" }}>FileType: {item.path.type}</p>
              <img width={300} src={`http://localhost:5000/${item.path.url}`} alt="" />
            </li>

            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </ol>
    </form>
  )
}

export default App;