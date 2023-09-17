import logoTasksEmpty from 'assets/tasksEmpty.png'
import styles from './styles.module.css'

export function EmptyTasks() {
  return (
    <div className={styles.emptyTasks}>
      <img src={logoTasksEmpty} alt="Icones de tarefas não cadastradas" />
      <div>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  )
}
