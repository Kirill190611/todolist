import { Delete } from '@mui/icons-material'
import React, { ChangeEvent } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { useAppDispatch } from 'common/hooks'
import { TaskType } from '../../../../api/tasksApi.types'
import { tasksThunks } from '../../../../model/tasksSlice'
import s from './Task.module.css'

type Props = {
  task: TaskType
  todolistId: string
}

export const Task = (props: Props) => {
  const { task, todolistId } = props
  const { title, status, id: taskId } = task

  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(tasksThunks.removeTask({ taskId, todolistId }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New
    dispatch(
      tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId })
    )
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(
      tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId })
    )
  }

  let isTaskCompleted = status === TaskStatuses.Completed

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
