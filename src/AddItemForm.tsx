import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

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
            <input
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <Button title={'+'} onClick={addItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};