import React from 'react';

type TodolistHeaderProps = {
    title: string
}

export const TodolistHeader = ({title}: TodolistHeaderProps) => {
    return (
        <h3>{title}</h3>
    );
};