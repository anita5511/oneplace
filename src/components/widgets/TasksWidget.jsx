import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Check, X } from 'lucide-react';

function TasksWidget() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    // Mock tasks for demo
    setTasks([
      { id: 1, title: 'Review project proposal', completed: false, priority: 'high' },
      { id: 2, title: 'Update team documentation', completed: false, priority: 'medium' },
      { id: 3, title: 'Schedule client meeting', completed: true, priority: 'low' },
      { id: 4, title: 'Prepare presentation slides', completed: false, priority: 'high' }
    ]);
  }, []);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority: 'medium'
      };
      setTasks([task, ...tasks]);
      setNewTask('');
      setShowAddTask(false);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CheckSquare className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
          <span className="text-sm text-gray-500">({completedTasks}/{totalTasks})</span>
        </div>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round((completedTasks / totalTasks) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowAddTask(false)}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)} ${
              task.completed ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
            } transition-colors duration-200`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                task.completed
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'border-gray-300 hover:border-indigo-600'
              }`}
            >
              {task.completed && <Check className="h-3 w-3" />}
            </button>
            
            <div className="flex-1">
              <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </p>
            </div>
            
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8">
          <CheckSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No tasks yet. Add one to get started!</p>
        </div>
      )}
    </div>
  );
}

export default TasksWidget;