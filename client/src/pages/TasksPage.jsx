import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Edit2, Check, X, Filter, SortDesc, Calendar, Tag, AlertCircle } from 'lucide-react';

const TasksPage = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [filter, setFilter] = useState('all'); // all, completed, pending
    const [sortBy, setSortBy] = useState('due_date');

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        subject: '',
        priority: 'medium',
        due_date: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [tasksRes, subjectsRes] = await Promise.all([
                api.get('/tasks/'),
                api.get('/subjects/')
            ]);
            setTasks(tasksRes.data);
            setSubjects(subjectsRes.data);
        } catch (err) {
            console.error("Fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/tasks/', newTask);
            setTasks([...tasks, res.data]);
            setShowAddModal(false);
            setNewTask({ title: '', description: '', subject: '', priority: 'medium', due_date: '' });
        } catch (err) {
            alert("Failed to create task");
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            const res = await api.patch(`/tasks/${task.id}/`, { completed: !task.completed });
            setTasks(tasks.map(t => t.id === task.id ? res.data : t));
        } catch (err) {
            console.error("Update error", err);
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/tasks/${id}/`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            console.error("Delete error", err);
        }
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'completed') return t.completed;
        if (filter === 'pending') return !t.completed;
        return true;
    }).sort((a, b) => {
        if (sortBy === 'priority') {
            const pMap = { high: 3, medium: 2, low: 1 };
            return pMap[b.priority] - pMap[a.priority];
        }
        if (sortBy === 'due_date') {
            return new Date(a.due_date || '9999-12-31') - new Date(b.due_date || '9999-12-31');
        }
        return 0;
    });

    return (
        <div className="tasks-container">
            <header className="page-header">
                <div className="header-left">
                    <h1>My Tasks</h1>
                    <p>{filteredTasks.length} tasks matching filters</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <Plus size={20} /> Add New Task
                </button>
            </header>

            <div className="filters-bar card">
                <div className="filter-group">
                    <Filter size={18} />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Tasks</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="filter-group">
                    <SortDesc size={18} />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="due_date">Sort by Due Date</option>
                        <option value="priority">Sort by Priority</option>
                    </select>
                </div>
            </div>

            <div className="tasks-grid">
                {filteredTasks.map(task => (
                    <div key={task.id} className={`task-card card ${task.completed ? 'task-completed' : ''}`}>
                        <div className="task-header">
                            <div className="badges-row">
                                <div className={`priority-badge ${task.priority}`}>
                                    {task.priority}
                                </div>
                                {task.user_role === 'admin' && (
                                    <div className="assignment-badge">ASSIGNMENT</div>
                                )}
                            </div>
                            <div className="task-actions">
                                <button className="icon-btn check" onClick={() => handleToggleComplete(task)}>
                                    {task.completed ? <X size={18} /> : <Check size={18} />}
                                </button>
                                {(user?.role === 'admin' || task.user_role !== 'admin') && (
                                    <button className="icon-btn delete" onClick={() => handleDeleteTask(task.id)}>
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <h3 className="task-title">{task.title}</h3>
                        {user?.role === 'admin' && (
                            <div className="task-creator">
                                <User size={14} /> <span>By: {task.user_name}</span>
                            </div>
                        )}
                        <p className="task-desc">{task.description}</p>

                        <div className="task-footer">
                            <div className="task-info">
                                <Calendar size={14} />
                                <span>{task.due_date || 'No date'}</span>
                            </div>
                            {task.subject_name && (
                                <div className="task-info">
                                    <Tag size={14} />
                                    <span>{task.subject_name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content card">
                        <div className="modal-header">
                            <h2>Add New Task</h2>
                            <button className="icon-btn" onClick={() => setShowAddModal(false)}><X /></button>
                        </div>
                        <form onSubmit={handleCreateTask} className="task-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={newTask.title}
                                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    className="input-field"
                                    value={newTask.description}
                                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Priority</label>
                                    <select
                                        className="input-field"
                                        value={newTask.priority}
                                        onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Due Date</label>
                                    <input
                                        type="date"
                                        className="input-field"
                                        value={newTask.due_date}
                                        onChange={e => setNewTask({ ...newTask, due_date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Create Task</button>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .tasks-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
                .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
                .filters-bar { display: flex; gap: 2rem; padding: 1rem; margin-bottom: 2rem; }
                .filter-group { display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); }
                .filter-group select { background: none; border: none; color: var(--text-primary); font-weight: 600; cursor: pointer; border-bottom: 1px solid var(--border-color); }
                
                .tasks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
                .task-card { position: relative; transition: all 0.2s; }
                .task-card:hover { transform: translateY(-5px); }
                .task-completed { opacity: 0.6; }
                .task-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
                .badges-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
                .priority-badge { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 0.25rem 0.5rem; border-radius: 4px; }
                .priority-badge.high { background: #fee2e2; color: #ef4444; }
                .priority-badge.medium { background: #fef3c7; color: #d97706; }
                .priority-badge.low { background: #dbeafe; color: #3b82f6; }
                .task-creator { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--accent-primary); margin-bottom: 0.5rem; font-weight: 600; }
                
                .assignment-badge { font-size: 0.7rem; font-weight: 800; background: #6366f1; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; letter-spacing: 0.05em; }
                
                .task-actions { display: flex; gap: 0.5rem; }
                .icon-btn { background: none; border: none; cursor: pointer; color: var(--text-secondary); padding: 0.25rem; border-radius: 4px; transition: all 0.2s; }
                .icon-btn:hover { background: var(--bg-primary); color: var(--accent-primary); }
                .icon-btn.check:hover { color: var(--success); }
                .icon-btn.delete:hover { color: var(--danger); }
                
                .task-title { font-size: 1.25rem; margin-bottom: 0.5rem; }
                .task-desc { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem; min-height: 3rem; }
                .task-footer { display: flex; gap: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem; }
                .task-info { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-secondary); }

                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
                .modal-content { width: 100%; max-width: 500px; padding: 2rem; background: var(--bg-primary); }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
                .task-form { display: flex; flex-direction: column; gap: 1.5rem; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                .input-field { width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; background: var(--bg-secondary); color: var(--text-primary); }
            `}</style>
        </div>
    );
};

export default TasksPage;
