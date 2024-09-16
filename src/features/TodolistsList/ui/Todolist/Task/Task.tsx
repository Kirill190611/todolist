import React, { ChangeEvent } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { TaskType } from 'features/todolistsList/api/tasksApi.types'
import { tasksThunks } from 'features/todolistsList/model/tasksSlice'
import { useAppDispatch } from 'common/hooks'

type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const Task = (props: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(
      tasksThunks.removeTask({
        taskId: props.task.id,
        todolistId: props.todolistId,
      })
    )
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New
    dispatch(
      tasksThunks.updateTask({
        taskId: props.task.id,
        domainModel: {
          status,
        },
        todolistId: props.todolistId,
      })
    )
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(
      tasksThunks.updateTask({
        taskId: props.task.id,
        domainModel: { title },
        todolistId: props.todolistId,
      })
    )
  }

  return (
    <div
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
    >
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color='primary'
        onChange={changeTaskStatusHandler}
      />

      <EditableSpan
        value={props.task.title}
        onChange={changeTaskTitleHandler}
      />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
