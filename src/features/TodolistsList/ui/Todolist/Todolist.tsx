import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { AddItemForm, EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { useAppDispatch } from 'common/hooks'
import React, { useEffect } from 'react'
import { tasksThunks } from 'features/todolistsList/model/tasksSlice'
import {
  TodolistDomainType,
  todolistsActions,
  todolistsThunks,
} from 'features/todolistsList/model/todolistsSlice'
import { Task } from 'features/todolistsList/ui/Todolist/Task/Task'
import { TaskType } from 'features/todolistsList/api/tasksApi.types'

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Todolist = function (props: Props) {
  const { todolist, tasks } = props

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolist.id))
  }, [])

  const addTask = (title: string) => {
    dispatch(tasksThunks.addTask({ title, todolistId: todolist.id }))
  }

  const removeTodolist = () => {
    dispatch(todolistsThunks.removeTodolist(todolist.id))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ id: todolist.id, title }))
  }

  const onAllClickHandler = () => {
    dispatch(
      todolistsActions.changeTodolistFilter({
        id: todolist.id,
        filter: 'all',
      })
    )
  }

  const onActiveClickHandler = () => {
    dispatch(
      todolistsActions.changeTodolistFilter({
        id: todolist.id,
        filter: 'active',
      })
    )
  }

  const onCompletedClickHandler = () => {
    dispatch(
      todolistsActions.changeTodolistFilter({
        id: todolist.id,
        filter: 'completed',
      })
    )
  }

  let tasksForTodolist = tasks

  if (todolist.filter === 'active') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
        <IconButton
          onClick={removeTodolist}
          disabled={todolist.entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={addTask}
        disabled={todolist.entityStatus === 'loading'}
      />
      <div>
        {tasksForTodolist.map((t) => (
          <Task key={t.id} task={t} todolistId={todolist.id} />
        ))}
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          variant={todolist.filter === 'all' ? 'outlined' : 'text'}
          onClick={onAllClickHandler}
          color={'inherit'}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === 'active' ? 'outlined' : 'text'}
          onClick={onActiveClickHandler}
          color={'primary'}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
          onClick={onCompletedClickHandler}
          color={'secondary'}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
