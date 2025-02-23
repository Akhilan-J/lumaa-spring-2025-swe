// src/components/tasks/TaskList.tsx
import { useEffect, useState } from 'react';
import { Task } from './TaskTypes';

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const toggleComplete = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const token = localStorage.getItem('token');
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...task,
          isComplete: !task.isComplete,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
            <div>
              <h3 className={`text-xl ${task.isComplete ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600">{task.description}</p>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => toggleComplete(task.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                {task.isComplete ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
