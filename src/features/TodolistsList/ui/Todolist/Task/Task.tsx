import React, { ChangeEvent } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { TaskType } from 'features/todolistsList/api/tasksApi.types'
import { tasksThunks } from 'features/todolistsList/model/tasksSlice'
import { useAppDispatch } from 'common/hooks'
import s from './Task.module.css'

type Props = {
  task: TaskType
  todolistId: string
}

export const Task = (props: Props) => {
  const {
    task: { id: taskId, title, status },
    todolistId,
  } = props
  const isTaskCompleted = status === TaskStatuses.Completed
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(
      tasksThunks.removeTask({
        taskId,
        todolistId,
      })
    )
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New
    dispatch(
      tasksThunks.updateTask({
        taskId,
        domainModel: {
          status,
        },
        todolistId,
      })
    )
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(
      tasksThunks.updateTask({
        taskId,
        domainModel: { title },
        todolistId,
      })
    )
  }

  return (
    <div key={taskId} className={isTaskCompleted ? s.isDone : ''}>
      <Checkbox
        checked={isTaskCompleted}
        color='primary'
        onChange={changeTaskStatusHandler}
      />

      <EditableSpan value={title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
