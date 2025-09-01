'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Edit, Play, Trash2 } from 'lucide-react';

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-200',
  },
  'in-progress': {
    icon: Play,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-200',
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
  },
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const config = statusConfig[task.status];
  const Icon = config.icon;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full ${config.bgColor}`}>
            <Icon className={`w-4 h-4 ${config.color}`} />
          </div>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Created: {formatDate(task.createdAt)}
        </span>
        
        <div className="flex space-x-1">
          {task.status !== 'pending' && (
            <button
              onClick={() => onStatusChange(task._id, 'pending')}
              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
            >
              Pending
            </button>
          )}
          {task.status !== 'in-progress' && (
            <button
              onClick={() => onStatusChange(task._id, 'in-progress')}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              In Progress
            </button>
          )}
          {task.status !== 'completed' && (
            <button
              onClick={() => onStatusChange(task._id, 'completed')}
              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}