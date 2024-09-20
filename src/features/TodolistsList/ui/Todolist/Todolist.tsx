import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { tasksThunks } from "../../model/tasksSlice"
import { TodolistDomainType } from "../../model/todolistsSlice"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type Props = {
  todolist: TodolistDomainType
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolist.id))
  }, [])

  const addTask = (title: string) => {
    return dispatch(tasksThunks.addTask({ title, todolistId: todolist.id }))
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </>
  )
}
