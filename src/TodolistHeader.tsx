import React from 'react';
import {Button} from "./Button";

type TodolistHeaderProps = {
    title: string
}

export const TodolistHeader = ({title}: TodolistHeaderProps) => {
    return (
        <h3>{title}</h3>
    );
};