import * as React from 'react'
import { EditableSpan } from 'common/components'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import {
  TodolistDomainType,
  todolistsThunks,
} from 'features/todolistsList/model/todolistsSlice'
import { useAppDispatch } from 'common/hooks'

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = (props: Props) => {
  const { todolist } = props
  const { title, id, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(todolistsThunks.removeTodolist(id))
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ id, title }))
  }

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      <IconButton
        onClick={removeTodolistHandler}
        disabled={entityStatus === 'loading'}
      >
        <Delete />
      </IconButton>
    </h3>
  )
}
