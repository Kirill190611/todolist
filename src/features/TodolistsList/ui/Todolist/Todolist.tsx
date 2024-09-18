import { AddItemForm } from 'common/components'
import { useAppDispatch } from 'common/hooks'
import React, { useEffect } from 'react'
import { tasksThunks } from 'features/todolistsList/model/tasksSlice'
import { TodolistDomainType } from 'features/todolistsList/model/todolistsSlice'
import { TaskType } from 'features/todolistsList/api/tasksApi.types'
import { FilterTasksButtons } from 'features/todolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons'
import { Tasks } from 'features/todolistsList/ui/Todolist/Tasks/Tasks'
import { TodolistTitle } from 'features/todolistsList/ui/Todolist/TodolistTitle/TodolistTitle'

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

  const addTaskHandler = (title: string) => {
    return dispatch(tasksThunks.addTask({ title, todolistId: todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskHandler}
        disabled={todolist.entityStatus === 'loading'}
      />
      <Tasks tasks={tasks} todolist={todolist} />
      <div style={{ paddingTop: '10px' }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  )
}
