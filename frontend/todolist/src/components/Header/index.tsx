import rocketLogo from 'assets/rocket.png'
import todoLogo from 'assets/todo.png'

import styles from './styles.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocketLogo} alt="Logotipo Rocket" />
      <img src={todoLogo} alt="Logotipo todo-list" />
    </header>
  )
}
