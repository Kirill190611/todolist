import React from 'react';

type ButtonType = {
    title: string
}
export const Button = ({title}: ButtonType) => {
    return (
        <button>{title}</button>
    );
};