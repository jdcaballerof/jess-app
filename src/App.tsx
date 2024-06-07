import React, { useEffect, useRef, useState } from 'react'
import { Input } from './components/ui/inputs/Input';
import { TableSimple } from './components/Table/TableSimple';
//@ts-ignore
import { ColDef } from 'ag-grid-community/core';
import { Button } from './components/ui/buttons';
import { exportTablePDF } from './utils/pdf/makeTablePDF';
import { tasksToPDF } from './utils/pdf/tasksPDF';


// Row Data Interface
export interface Task {
    id:     number;
    title:  string;
    input:  string;
    image?:  Img;
}

interface Img {
    url,
    width: number,
    height: number,
}


function App() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [tasks, setTasks] = useState<Task[]>( JSON.parse(localStorage.getItem('tasks') || '[]'));
    const [input, setInput] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<Img>();
    // // const [selectedFile, setSelectedFile] = useState(null);

    const reset = () => {
        setTitle('');
        setInput('');
        setImage(undefined);
        // Clear the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const getAdjustedDimensions = (width, height, maxWidth) => {
        let newWidth = (width>maxWidth) ? maxWidth : width; 
        let newHeight = (width>maxWidth) ? (height*maxWidth/width): height;
    
        console.table([{width, height}, {width: newWidth, height: newHeight}])
    
        return [newWidth, newHeight];
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                const img = new Image();
                img.src = base64String as string;
                img.onload = () => {
                    const [ width, height ] = getAdjustedDimensions(img.width, img.height, 35);
                    setImage({url: base64String as string, width, height});
                };
            };
            reader.readAsDataURL(file);
        } else {
            setImage(undefined);
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


    const printTasksPDF = () => {
        tasksToPDF(tasks, cols.slice(0,3))
        // const pdf = exportTablePDF(tasks, cols)
    }


    return (
        <>
            <h1 className='text-6xl my-9 font-bold'>Reportes</h1>

            {/* //& FORM    */}
            <div className="max-w-2xl mx-auto my-10">
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

                    {image && (
                        <div className="mt-2 col-span-4">
                            {image && (
                                <img src={image.url} alt="Preview" className="mt-2 mx-auto w-32 h-32 object-cover rounded" />
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <Button bgColor='green' label='Add' onClick={addTask}/>
                    <Button bgColor='red' label='Cancel' onClick={reset}/>
                </div>
            </div>

            <div className='flex-end'>
                <Button bgColor='rose' label='PDF' onClick={printTasksPDF}/>
            </div>

            { tasks.length ?  <TableSimple cols={cols} data={tasks.map( t => ({...t, image: t.image?.url}) )} /> : <></>}
        </>
    )
}

export default App
