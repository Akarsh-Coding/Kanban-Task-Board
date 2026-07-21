// Column definitions — order here drives both rendering order and
// the "move" direction (a task can only move to an adjacent column).
export const COLUMNS = [
  { id: 'todo', label: 'To Do' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
]

// Priority metadata: drives the conditional border/chip color on each card.
export const PRIORITIES = {
  High: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
  Medium: { color: '#eab308', bg: 'rgba(234, 179, 8, 0.12)' },
  Low: { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)' },
}

export const STORAGE_KEY = 'kanban-board:tasks'
