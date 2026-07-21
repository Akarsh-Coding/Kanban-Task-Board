import TaskCard from './TaskCard'

export default function Column({ column, tasks, onDelete, onEdit, onMove }) {
  return (
    <section className="column">
      <header className="column__header">
        <h2 className="column__title">{column.label}</h2>
        <span className="column__count">{tasks.length}</span>
      </header>

      <div className="column__list">
        {tasks.length === 0 ? (
          <p className="column__empty">No tasks here.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onMove={onMove}
            />
          ))
        )}
      </div>
    </section>
  )
}
