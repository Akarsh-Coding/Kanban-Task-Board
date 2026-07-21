import { useState, useRef, useEffect } from 'react'
import { COLUMNS, PRIORITIES } from '../utils/constants'

export default function TaskCard({ task, onDelete, onEdit, onMove }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  const columnIndex = COLUMNS.findIndex((c) => c.id === task.status)
  const canMoveBack = columnIndex > 0
  const canMoveForward = columnIndex < COLUMNS.length - 1
  const priority = PRIORITIES[task.priority] ?? PRIORITIES.Medium

  function commitEdit() {
    const trimmed = draft.trim()
    if (trimmed) {
      onEdit(task.id, trimmed)
    } else {
      setDraft(task.text)
    }
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setDraft(task.text)
      setIsEditing(false)
    }
  }

  return (
    <article
      className="task-card"
      style={{ borderLeftColor: priority.color }}
    >
      <span
        className="task-card__priority-chip"
        style={{ color: priority.color, background: priority.bg }}
      >
        {task.priority}
      </span>

      {isEditing ? (
        <input
          ref={inputRef}
          className="task-card__edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p className="task-card__text" onClick={() => setIsEditing(true)} title="Click to edit">
          {task.text}
        </p>
      )}

      <div className="task-card__actions">
        <div className="task-card__move">
          <button
            type="button"
            className="icon-btn"
            disabled={!canMoveBack}
            onClick={() => onMove(task.id, COLUMNS[columnIndex - 1].id)}
            aria-label="Move to previous column"
            title="Move left"
          >
            ←
          </button>
          <button
            type="button"
            className="icon-btn"
            disabled={!canMoveForward}
            onClick={() => onMove(task.id, COLUMNS[columnIndex + 1].id)}
            aria-label="Move to next column"
            title="Move right"
          >
            →
          </button>
        </div>

        <div className="task-card__meta-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
            title="Edit"
          >
            ✎
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
    </article>
  )
}
