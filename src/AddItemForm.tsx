import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({
                                addItem
                            }: AddItemFormType) => {
    const [error, setError] = useState<string | null>(null)
    const [itemTitle, setItemTitle] = useState('')

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const addItemHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField id="standard-basic"
                       label={error ? "Title is required" : "Enter title"}
                       variant="outlined"
                       className={error ? "error" : ""}
                       error={!!error}
                       value={itemTitle}
                       onChange={changeItemTitleHandler}
                       onKeyUp={addItemOnKeyUpHandler}/>
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>

        </div>
    );
};