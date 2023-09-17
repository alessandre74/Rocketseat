import { ListTaskProps } from 'types'
import { ListItem } from 'components'

import styles from './styles.module.css'

export function ListTasks({ tasks, handleCheckedTask, handleDeleteTask }: ListTaskProps) {
  return (
    <div className={styles.listTasks}>
      <ul>
        {tasks.map(task => {
          return (
            <ListItem
              key={task.id}
              task={task}
              handleCheckedTask={handleCheckedTask}
              handleDeleteTask={handleDeleteTask}
            />
          )
        })}
      </ul>
    </div>
  )
}
