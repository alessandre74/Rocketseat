export interface taskProps {
  id: string
  description: string
  checked: boolean
}

interface handleFunctionProps {
  handleCheckedTask: (id: string) => void
  handleDeleteTask: (id: string) => void
}

export interface ListTaskProps extends handleFunctionProps {
  tasks: taskProps[]
}

export interface ListItemTaskProps extends handleFunctionProps {
  task: taskProps
}
