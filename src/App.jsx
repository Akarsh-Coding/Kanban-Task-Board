import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { STORAGE_KEY } from './utils/constants'
import AddTaskForm from './components/AddTaskForm'
import SearchBar from './components/SearchBar'
import Board from './components/Board'

const SEED_TASKS = [
  { id: crypto.randomUUID(), text: 'Sketch the board layout', priority: 'Low', status: 'done' },
  { id: crypto.randomUUID(), text: 'Wire up add-task form', priority: 'Medium', status: 'inProgress' },
  { id: crypto.randomUUID(), text: 'Persist state to localStorage', priority: 'High', status: 'todo' },
]

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, SEED_TASKS)
  const [searchTerm, setSearchTerm] = useState('')

  function addTask(text, priority) {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      priority,
      status: 'todo',
    }
    setTasks((prev) => [newTask, ...prev])
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function editTask(id, newText) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    )
  }

  function moveTask(id, newStatus) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    )
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title-block">
          <span className="app__eyebrow">Sprint 05</span>
          <h1 className="app__title">Kanban Task Board</h1>
        </div>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </header>

      <AddTaskForm onAddTask={addTask} />

      <Board
        tasks={tasks}
        searchTerm={searchTerm}
        onDelete={deleteTask}
        onEdit={editTask}
        onMove={moveTask}
      />
    </div>
  )
}
