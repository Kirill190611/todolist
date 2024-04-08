import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    value: string
    onChange: (newTitle: string) => void
}
export const EditableSpan = ({
                                 value,
                                 onChange
                             }: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value);
    const activateEditModeHandler = () => {
        setEditMode(true);
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {
                editMode
                    ? <input value={title}
                             autoFocus
                             onChange={changeTitleHandler}
                             onBlur={deactivateEditModeHandler}/>
                    : <span onDoubleClick={activateEditModeHandler}>{value}</span>
            }
        </>


    );
};