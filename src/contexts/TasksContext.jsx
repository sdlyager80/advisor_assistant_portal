import React, { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

const initialTasks = [
  // Completed earlier tasks (morning / start of day)
  { id: 1,  title: 'Morning team standup',                        priority: 'medium', dueDate: 'Today, 8:00 AM',    status: 'completed' },
  { id: 2,  title: 'Review overnight client messages',            priority: 'high',   dueDate: 'Today, 8:30 AM',    status: 'completed' },
  { id: 3,  title: 'Submit quarterly compliance report',          priority: 'high',   dueDate: 'Today, 9:00 AM',    status: 'completed' },
  { id: 4,  title: 'Send welcome packet to new client David Lee', priority: 'medium', dueDate: 'Today, 9:30 AM',    status: 'completed' },
  { id: 5,  title: 'Confirm 2:30 PM appointment with Sam Wright', priority: 'low',    dueDate: 'Today, 10:00 AM',   status: 'completed' },
  { id: 6,  title: 'Review and approve pending policy changes',   priority: 'high',   dueDate: 'Today, 10:30 AM',   status: 'completed' },
  { id: 7,  title: 'Update beneficiary records for Martinez family', priority: 'medium', dueDate: 'Today, 11:00 AM', status: 'completed' },
  // Pending tasks (afternoon / end of day)
  { id: 8,  title: 'Follow up with John Smith',                   priority: 'high',   dueDate: 'Today, 2:00 PM',    status: 'pending' },
  { id: 9,  title: 'Prepare quote for Sarah Johnson',             priority: 'high',   dueDate: 'Today, 3:30 PM',    status: 'pending' },
  { id: 10, title: 'Review policy documents for Michael Chen',    priority: 'medium', dueDate: 'Today, 4:00 PM',    status: 'pending' },
  { id: 11, title: 'Call Emma Wilson - policy renewal',           priority: 'high',   dueDate: 'Today, 6:00 PM',    status: 'pending' },
  { id: 12, title: 'Process insurance claim for Robert Taylor',   priority: 'high',   dueDate: 'Today, 7:00 PM',    status: 'pending' },
  { id: 13, title: 'Send birthday wishes to Sam Wright',          priority: 'medium', dueDate: 'Today, 5:00 PM',    status: 'pending' },
  { id: 14, title: 'Send policy renewal reminder to clients',     priority: 'medium', dueDate: 'Today, End of day', status: 'pending' },
  { id: 15, title: 'Update CRM records',                         priority: 'low',    dueDate: 'Today, End of day', status: 'pending' },
  { id: 16, title: 'Review compliance documents',                 priority: 'low',    dueDate: 'Today, End of day', status: 'pending' },
];

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId
        ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
        : t
    ));
  };

  const addTask = (task) => {
    setTasks(prev => [task, ...prev]);
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalCount = tasks.length;

  return (
    <TasksContext.Provider value={{ tasks, toggleTaskComplete, addTask, completedCount, totalCount }}>
      {children}
    </TasksContext.Provider>
  );
};
