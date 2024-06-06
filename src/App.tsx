import React, { useEffect, useRef, useState } from 'react'
import { Input } from './components/inputs/Input';
import { TableSimple } from './components/Table/TableSimple';
//@ts-ignore
import { ColDef } from 'ag-grid-community/core';
import { OpenCamera } from './components/take-photos/OpenCamara';


// Row Data Interface
interface Task {
    id:     number;
    title:  string;
    input:  string;
    image:  string;
}


function App() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [tasks, setTasks] = useState<Task[]>( JSON.parse(localStorage.getItem('tasks') || '[]'));
    const [input, setInput] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    // // const [selectedFile, setSelectedFile] = useState(null);

    const reset = () => {
        setTitle('');
        setInput('');
        setImage('');
        // Clear the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImage(base64String as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImage('');
        }
    };

    const addTask = () => {
        if (input.trim()) {
            console.log(tasks)
            const newTasks = [...tasks, { id: new Date().getTime(), title, input, image }]
            setTasks(newTasks);
            localStorage.setItem('tasks', JSON.stringify(newTasks))
            reset()
        }
    };

    const removeTask = (id: number) => {
        setTasks( tasks => tasks.filter( t => t.id !== id));
    };

    useEffect(() => {
        if(tasks.length)  localStorage.setItem('tasks', JSON.stringify(tasks))
        else localStorage.removeItem('tasks')        
    }, [tasks])
    


    const showRowData = (props) => {
        console.log(props.data) 
    }
    const CustomButtonComponent = (props) => {
        return (<div className='flex-center gap-2'>
            {/* <button onClick={ () => showRowData(props) } className='px-2 text-white bg-yellow-500 hover:bg-yellow-600'><i className='pi pi-pencil' /></button> */}
            <button onClick={ () => removeTask(props.data.id) } className='px-2 text-white bg-red-700 hover:bg-red-800'><i className='pi pi-trash' /></button>
        </div>) 
    };

    const ColImage = (props) => {
        const imgBlob = props.data.image
        if(!imgBlob)  return 'No image'
        return <img src={imgBlob} alt="Preview" className="mt-2 mx-auto w-8 h-8 object-cover rounded" />
    }


    // Column Definitions: Defines the columns to be displayed.
    const [cols, setCols] = useState<ColDef<Task>[]>([
        { field: "title", filter: true, floatingFilter: true },
        { field: "input", headerName: 'Task' },
        { field: "image", cellRenderer: ColImage },
        { field: "button", cellRenderer: CustomButtonComponent, flex: 1 },
    ]);


    return (
        <>
            <h1 className='text-6xl my-9 font-bold'>Reportes</h1>

            {/* //& FORM    */}
            <div className="max-w-2xl mx-auto">
                <div className='grid grid-cols-4 gap-3'>
                    <Input
                        label='Title'
                        placeholder='Add a title to task'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                        label='Task'
                        placeholder='Add new task'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                    />

                    <Input
                        // label='Imagen'
                        ref={fileInputRef}
                        label='Image'
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        divClassName='col-span-2'
                    />
                    {/* <div>
                        <OpenCamera />
                    </div> */}

                    {image && (
                        <div className="mt-2 col-span-4">
                            {image && (
                                <img src={image} alt="Preview" className="mt-2 mx-auto w-32 h-32 object-cover rounded" />
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <button
                        onClick={addTask}
                        className="mt-6 my-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Add
                    </button>
                    
                    <button
                        onClick={reset}
                        className="col-span-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        Cancel
                    </button>
                </div>

            </div>

            { tasks.length ?  <TableSimple cols={cols} data={tasks} /> : <></>}
        </>
    )
}

export default App
