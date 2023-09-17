import { Check, Trash } from 'Libs'
import { ListItemTaskProps } from 'types'

import styles from './styles.module.css'

export function ListItem({ task, handleCheckedTask, handleDeleteTask }: ListItemTaskProps) {
  return (
    <li>
      <button
        className={task.checked ? styles.btnChecked : styles.btnUnchecked}
        onClick={() => handleCheckedTask(task.id)}
      >
        {task.checked && <Check size={14} />}
      </button>

      <p className={task.checked ? styles.taskChecked : ''}>{task.description}</p>

      <button
        className={styles.btnTrash}
        title="Deletar Todo"
        onClick={() => handleDeleteTask(task.id)}
      >
        <Trash size={24} />
      </button>
    </li>
  )
}
