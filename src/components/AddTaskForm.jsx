import { useState } from 'react'
import { PRIORITIES } from '../utils/constants'

export default function AddTaskForm({ onAddTask }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAddTask(trimmed, priority)
    setText('')
    setPriority('Medium')
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task__input"
        placeholder="Draft a new task…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="New task description"
      />

      <div className="add-task__priority" role="radiogroup" aria-label="Priority">
        {Object.keys(PRIORITIES).map((level) => (
          <button
            type="button"
            key={level}
            role="radio"
            aria-checked={priority === level}
            className={`priority-chip priority-chip--${level.toLowerCase()} ${
              priority === level ? 'is-active' : ''
            }`}
            onClick={() => setPriority(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <button type="submit" className="add-task__submit" disabled={!text.trim()}>
        + Add Task
      </button>
    </form>
  )
}
