import Column from './Column'
import { COLUMNS } from '../utils/constants'

export default function Board({ tasks, searchTerm, onDelete, onEdit, onMove }) {
  const query = searchTerm.trim().toLowerCase()

  const visibleTasks = query
    ? tasks.filter((task) => task.text.toLowerCase().includes(query))
    : tasks

  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={visibleTasks.filter((task) => task.status === column.id)}
          onDelete={onDelete}
          onEdit={onEdit}
          onMove={onMove}
        />
      ))}
    </div>
  )
}
