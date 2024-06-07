import React from 'react'


type Props = {
    label?: string | JSX.Element | JSX.Element[];
    bgColor?: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


export const Button = ({
    bgColor = 'slate',
    label = '', 
    className,
    ...rest
}: Props) => {
    return (
    <button
        className={`mt-6 my-3 focus:outline-none text-white bg-${bgColor}-600 hover:bg-${bgColor}-700 focus:ring-4 focus:ring-${bgColor}-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-${bgColor}-600 dark:hover:bg-${bgColor}-700 dark:focus:ring-${bgColor}-800 ${className}`}
        {...rest}
    >
        { label }
    </button>
    )
}
