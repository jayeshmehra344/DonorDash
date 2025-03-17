import { useState } from 'react';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
        {/* Header */}
        <header className="bg-indigo-600 text-white p-4 rounded-t-xl mb-6">
          <h1 className="text-3xl font-bold text-center">Task Manager Dash</h1>
          <p className="text-center text-sm opacity-90">Add and track your tasks</p>
        </header>

        {/* Task Form */}
        <form onSubmit={handleAddTask} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTask}
              onChange={handleInputChange}
              placeholder="Enter a new task"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Task List */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-3 rounded-md flex justify-between items-center"
                >
                  <span className="text-gray-800">{task}</span>
                  <button
                    onClick={() =>
                      setTasks(tasks.filter((_, i) => i !== index))
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200 text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;