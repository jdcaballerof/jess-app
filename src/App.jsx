import { useRef, useState } from 'react'
import { Input } from './components/inputs/Input';

function App() {

    const [tasks, setTasks] = useState( JSON.parse(localStorage.getItem('tasks') || '[]'));
    const [input, setInput] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    // // const [selectedFile, setSelectedFile] = useState(null);

    const reset = () => {
        setTitle('');
        setInput('');
        setImage(null);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Create a preview URL for the selected image
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
        } else {
            setImage(null);
        }
    };

    const addTask = () => {
        if (input.trim()) {
            const newTasks = [...tasks, { title, input, image }]
            setTasks(newTasks);
            localStorage.setItem('tasks', JSON.stringify(newTasks))
            reset()
        }
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        if(newTasks.length)  localStorage.setItem('tasks', JSON.stringify(newTasks))
        else localStorage.removeItem('tasks')
    };

    return (
        <>
            <h1 className='text-6xl my-9 font-bold'>Vite + React</h1>

            <div className="max-w-2xl mx-auto">
                <div className='grid grid-cols-4 gap-3'>
                    <Input
                        label='Title'
                        placeholder='Add a title to task'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">
                            Task
                        </label>
                        <input
                            id="first_name"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Add a new task"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>

                    <Input
                        // label='Imagen'
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        divClassName='col-span-2 mt-3'
                    />

                    {image && (
                        <div className="mt-2 col-span-4">
                            {image && (
                                <img src={image} alt="Preview" className="mt-2 mx-auto w-32 h-32 object-cover rounded" />
                            )}
                        </div>
                    )}
                </div>

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

                <ul className='mt-5'>
                    {tasks.map(({ title, input, image }, index) => (
                        <li key={index} className='grid grid-cols-12 gap-3'>
                            <p className='col-span-9 bg-slate-700 flex-center'>
                                {title} - {input}
                            </p>

                            <img src={image} alt="Preview" className="mt-2 mx-auto w-16 h-16 object-cover rounded" />

                            <button
                                onClick={() => removeTask(index)}
                                className="col-span-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                                R
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default App
