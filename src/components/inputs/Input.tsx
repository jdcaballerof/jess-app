import React from 'react'


type Props = {
    id?: string
    label?: string
    divClassName?: string
    className?: string
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> 


export const Input = React.forwardRef<HTMLInputElement, Props>(({
    label='',
    id='input'+new Date().getTime(),
    divClassName='',
    className='',
    ...rest
}, ref) => {
    return (
        <div className={divClassName}>
            <label htmlFor={id} className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input 
                id={id} 
                ref={ref}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}  
                {...rest}
            />
        </div>
    )
});
