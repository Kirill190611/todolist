// @flow
import * as React from 'react';
import {ChangeEvent, useState} from "react";

type EditableSpanProps = {
    oldTitle: string
    updateTitle: (title: string) => void
};
export const EditableSpan = ({
                                 oldTitle,
                                 updateTitle
                             }: EditableSpanProps) => {

    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(oldTitle)

    const editModeHandler = () => {
        setEdit(!edit)
        if (edit) {
            updateTitleHandler()
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const updateTitleHandler = () => {
        updateTitle(title.trim());
    }

    return (
        edit
            ? <input value={title}
                     onBlur={editModeHandler}
                     autoFocus
                     onChange={changeTitleHandler}/>
            : <span onDoubleClick={editModeHandler}>{oldTitle}</span>
    );
};