import { unwrapResult } from '@reduxjs/toolkit'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import { BaseResponse } from '../../types'

type Props = {
  addItem: (title: string) => Promise<any>
  disabled?: boolean
}

export const AddItemForm = function (props: Props) {
  const { addItem, disabled = false } = props

  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title)
        .then(unwrapResult)
        .then(() => {
          setTitle('')
          setError('')
        })
        .catch((err: BaseResponse) => {
          if (err?.resultCode) {
            setError(err.messages[0])
          }
        })
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.code === 'Enter') {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        variant='outlined'
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        label='Title'
        helperText={error}
      />
      <IconButton color='primary' onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  )
}
