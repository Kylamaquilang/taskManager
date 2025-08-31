'use client';

import SearchAndFilter from '@/components/SearchAndFilter';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { taskApi } from '@/services/api';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, Play, Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filters, setFilters] = useState({});

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.getTasks(filters);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create task
  const handleCreateTask = async (taskData) => {
    try {
      setFormLoading(true);
      await taskApi.createTask(taskData);
      setIsFormOpen(false);
      fetchTasks();
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setFormLoading(false);
    }
  };

  // Update task
  const handleUpdateTask = async (taskData) => {
    if (!editingTask) return;
    
    try {
      setFormLoading(true);
      await taskApi.updateTask(editingTask._id, taskData);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    } finally {
      setFormLoading(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskApi.deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  // Update task status
  const handleStatusChange = async (taskId, status) => {
    try {
      await taskApi.updateTaskStatus(taskId, status);
      fetchTasks();
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error('Error updating task status:', err);
    }
  };

  // Edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Close form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Handle form submission
  const handleFormSubmit = (data) => {
    if (editingTask) {
      handleUpdateTask(data);
    } else {
      handleCreateTask(data);
    }
  };

  // Get status counts
  const statusCounts = {
    pending: tasks.filter(task => task.status === 'pending').length,
    'in-progress': tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 flex items-center space-x-3"
          >
            <div className="p-2 bg-yellow-100 rounded-full">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-4 flex items-center space-x-3"
          >
            <div className="p-2 bg-blue-100 rounded-full">
              <Play className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts['in-progress']}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-4 flex items-center space-x-3"
          >
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.completed}</p>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <SearchAndFilter onFiltersChange={setFilters} isLoading={loading} />
        </div>

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Task</span>
          </button>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading tasks...</span>
            </div>
          </div>
        )}

        {/* Tasks Grid */}
        {!loading && (
          <>
            {tasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <Plus className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-600 mb-4">
                  {Object.keys(filters).length > 0
                    ? 'Try adjusting your search or filters'
                    : 'Get started by creating your first task'}
                </p>
                {Object.keys(filters).length === 0 && (
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="btn btn-primary"
                  >
                    Create Your First Task
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen || !!editingTask}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          task={editingTask}
          isLoading={formLoading}
        />
      </div>
    </div>
  );
}