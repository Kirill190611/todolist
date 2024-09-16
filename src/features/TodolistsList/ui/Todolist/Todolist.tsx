import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { AddItemForm, EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { useAppDispatch } from 'common/hooks'
import React, { useCallback, useEffect } from 'react'
import { tasksThunks } from 'features/todolistsList/model/tasksSlice'
import {
  FilterValuesType,
  TodolistDomainType,
} from 'features/todolistsList/model/todolistsSlice'
import { Task } from 'features/todolistsList/ui/Todolist/Task/Task'
import { TaskType } from 'features/todolistsList/api/tasksApi.types'

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo(function (props: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(props.todolist.id))
  }, [])

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id)
    },
    [props.addTask, props.todolist.id]
  )

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id)
  }

  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title)
    },
    [props.todolist.id, props.changeTodolistTitle]
  )

  const onAllClickHandler = useCallback(
    () => props.changeFilter('all', props.todolist.id),
    [props.todolist.id, props.changeFilter]
  )
  const onActiveClickHandler = useCallback(
    () => props.changeFilter('active', props.todolist.id),
    [props.todolist.id, props.changeFilter]
  )
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.todolist.id),
    [props.todolist.id, props.changeFilter]
  )

  let tasksForTodolist = props.tasks

  if (props.todolist.filter === 'active') {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (props.todolist.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed
    )
  }

  return (
    <div>
      <h3>
        <EditableSpan
          value={props.todolist.title}
          onChange={changeTodolistTitle}
        />
        <IconButton
          onClick={removeTodolist}
          disabled={props.todolist.entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={addTask}
        disabled={props.todolist.entityStatus === 'loading'}
      />
      <div>
        {tasksForTodolist.map((t) => (
          <Task key={t.id} task={t} todolistId={props.todolist.id} />
        ))}
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
          onClick={onAllClickHandler}
          color={'inherit'}
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
          onClick={onActiveClickHandler}
          color={'primary'}
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
          onClick={onCompletedClickHandler}
          color={'secondary'}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})