import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
    CheckCircle, Clock, List, TrendingUp, AlertCircle,
    Users, BookOpen, Shield, Trash2, User, Plus, X as CloseIcon,
    Zap, Rocket, Calendar as CalendarIcon, Activity
} from 'lucide-react';
import { TrendChart, PomodoroWidget, AchievementsList, StudyCalendar } from '../components/PremiumFeatures';

const StudentDashboard = ({ stats, recentTasks, completionRate, onChangePassword, weeklyStats, user, tasks }) => (
    <>
        <div className="stats-grid">
            <div className="stat-card card">
                <div className="stat-icon blue"><List /></div>
                <div className="stat-info">
                    <h3>{stats.total}</h3>
                    <p>Total Tasks</p>
                </div>
            </div>
            <div className="stat-card card">
                <div className="stat-icon green"><CheckCircle /></div>
                <div className="stat-info">
                    <h3>{stats.completed}</h3>
                    <p>Completed</p>
                </div>
            </div>
            <div className="stat-card card">
                <div className="stat-icon yellow"><Clock /></div>
                <div className="stat-info">
                    <h3>{stats.pending}</h3>
                    <p>Pending</p>
                </div>
            </div>
            <div className="stat-card card">
                <div className="stat-icon red"><AlertCircle /></div>
                <div className="stat-info">
                    <h3>{stats.highPriority}</h3>
                    <p>High Priority</p>
                </div>
            </div>
        </div>

        <div className="dashboard-main">
            <div className="dashboard-column left">
                <div className="progress-section card">
                    <div className="section-header">
                        <h3>Overall Progress</h3>
                        <TrendingUp size={20} className="icon-success" />
                    </div>
                    <div className="circular-progress-container">
                        <div className="progress-circle" style={{ '--percent': completionRate }}>
                            <span className="progress-value">{completionRate}%</span>
                        </div>
                    </div>
                    <p className="progress-label">Keep going! You're doing great.</p>
                </div>

                <div className="achievements-card card">
                    <div className="section-header">
                        <h3>Achievements</h3>
                        <Zap size={20} className="icon-yellow" />
                    </div>
                    <AchievementsList points={user?.points || 0} streak={user?.study_streak || 0} />
                </div>

                <div className="pomodoro-card card">
                    <PomodoroWidget />
                </div>

                <div className="settings-section">
                    <button className="btn btn-outline btn-sm full-width flex-center" onClick={onChangePassword}>
                        <Shield size={16} /> Privacy: Change Password
                    </button>
                </div>
            </div>

            <div className="dashboard-column right">
                <div className="analytics-card card">
                    <div className="section-header">
                        <h3>Weekly Activity</h3>
                        <Activity size={20} className="icon-primary" />
                    </div>
                    <TrendChart data={weeklyStats} />
                </div>

                <div className="calendar-card card">
                    <div className="section-header">
                        <h3>Study Calendar</h3>
                        <CalendarIcon size={20} className="icon-primary" />
                    </div>
                    <StudyCalendar tasks={tasks} />
                </div>

                <div className="recent-tasks card">
                    <div className="section-header">
                        <h3>Recent Tasks</h3>
                        <button className="btn-text" onClick={() => window.location.href = '/tasks'}>View All</button>
                    </div>
                    {recentTasks.length > 0 ? (
                        <div className="task-list-mini">
                            {recentTasks.map(task => (
                                <div key={task.id} className="task-item-mini">
                                    <div className={`priority-dot ${task.priority}`}></div>
                                    <span className={task.completed ? 'completed' : ''}>{task.title}</span>
                                    {task.due_date && <span className="due-date">{task.due_date}</span>}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No tasks yet. Start planning!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
);

const AdminDashboard = ({ adminStats, users, onAddUser, onDeleteUser, recentCompletions }) => (
    <>
        <div className="stats-grid">
            <div className="stat-card card">
                <div className="stat-icon blue"><Users /></div>
                <div className="stat-info">
                    <h3>{adminStats.total_users}</h3>
                    <p>Total Users</p>
                </div>
            </div>
            <div className="stat-card card">
                <div className="stat-icon green"><BookOpen /></div>
                <div className="stat-info">
                    <h3>{adminStats.total_tasks}</h3>
                    <p>System Tasks</p>
                </div>
            </div>
            <div className="stat-card card">
                <div className="stat-icon yellow"><User /></div>
                <div className="stat-info">
                    <h3>{adminStats.students_count}</h3>
                    <p>Total Students</p>
                </div>
            </div>
        </div>

        <div className="dashboard-main admin-view">
            <div className="users-section card">
                <div className="section-header">
                    <h3>User Management</h3>
                    <button className="btn btn-primary btn-sm flex-center" onClick={onAddUser}>
                        <Plus size={16} /> Add Student
                    </button>
                </div>
                <div className="user-list">
                    {users.map(u => (
                        <div key={u.id} className="user-item">
                            <div className="user-info">
                                <span className="user-name">{u.username}</span>
                                <span className={`user-role ${u.role}`}>{u.role}</span>
                                <span className="user-email">{u.email}</span>
                            </div>
                            <div className="user-actions">
                                {u.role !== 'admin' && (
                                    <button
                                        className="btn-icon delete"
                                        onClick={() => onDeleteUser(u.id)}
                                        title="Delete User"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="completions-section card">
                <div className="section-header">
                    <h3>Recent Completions</h3>
                    <CheckCircle size={20} className="icon-success" />
                </div>
                <div className="completion-list">
                    {recentCompletions.length > 0 ? (
                        recentCompletions.map(task => (
                            <div key={task.id} className="completion-item">
                                <div className="student-avatar">{task.user_name?.[0]?.toUpperCase() || 'S'}</div>
                                <div className="completion-info">
                                    <p className="completion-text">
                                        <strong>{task.user_name}</strong> completed <span>{task.title}</span>
                                    </p>
                                    <p className="completion-meta">{task.subject_name} • {task.priority} priority</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="empty-msg">No recent student activity.</p>
                    )}
                </div>
                <button className="btn btn-text full-width" onClick={() => window.location.href = '/tasks'}>View All Tasks</button>
            </div>
        </div>
    </>
);

const UserModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'student' });
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content card profile-form">
                <div className="modal-header">
                    <h2>Create New Student</h2>
                    <button className="close-btn" onClick={onClose}><CloseIcon /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="form-grid">
                    <div className="form-group"><label>Username</label><input type="text" required placeholder="e.g., student_01" onChange={e => setFormData({ ...formData, username: e.target.value })} /></div>
                    <div className="form-group"><label>Email Address</label><input type="email" required placeholder="student@example.com" onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                    <div className="form-group"><label>Password</label><input type="password" required placeholder="••••••••" onChange={e => setFormData({ ...formData, password: e.target.value })} /></div>
                    <button type="submit" className="btn btn-primary full-width">Create Account</button>
                </form>
            </div>
        </div>
    );
};

const PasswordModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ old_password: '', new_password: '', confirm_password: '' });
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content card profile-form">
                <div className="modal-header">
                    <h2>Change Password</h2>
                    <button className="close-btn" onClick={onClose}><CloseIcon /></button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (formData.new_password !== formData.confirm_password) { alert("Passwords do not match!"); return; }
                    onSubmit(formData);
                }} className="form-grid">
                    <div className="form-group"><label>Old Password</label><input type="password" required onChange={e => setFormData({ ...formData, old_password: e.target.value })} /></div>
                    <div className="form-group"><label>New Password</label><input type="password" required minLength="6" onChange={e => setFormData({ ...formData, new_password: e.target.value })} /></div>
                    <div className="form-group"><label>Confirm New Password</label><input type="password" required onChange={e => setFormData({ ...formData, confirm_password: e.target.value })} /></div>
                    <button type="submit" className="btn btn-primary full-width">Update Password</button>
                </form>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { user, register } = useAuth();
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, highPriority: 0 });
    const [adminStats, setAdminStats] = useState({ total_users: 0, total_tasks: 0, students_count: 0, admins_count: 0 });
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [recentTasks, setRecentTasks] = useState([]);
    const [recentCompletions, setRecentCompletions] = useState([]);
    const [weeklyStats, setWeeklyStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isPassModalOpen, setIsPassModalOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (user?.role === 'admin') {
                const [statsRes, usersRes, tasksRes] = await Promise.all([
                    api.get('/users/stats/'),
                    api.get('/users/'),
                    api.get('/tasks/')
                ]);
                setAdminStats(statsRes.data);
                setUsers(usersRes.data);
                setRecentCompletions(tasksRes.data.filter(t => t.completed && t.user_role === 'student').slice(0, 5));
            } else {
                const [tasksRes, weeklyRes] = await Promise.all([
                    api.get('/tasks/'),
                    api.get('/tasks/stats_weekly/')
                ]);
                const tasksData = tasksRes.data;
                setTasks(tasksData);
                setWeeklyStats(weeklyRes.data);
                setStats({
                    total: tasksData.length,
                    completed: tasksData.filter(t => t.completed).length,
                    pending: tasksData.filter(t => !t.completed).length,
                    highPriority: tasksData.filter(t => t.priority === 'high' && !t.completed).length
                });
                setRecentTasks(tasksData.slice(0, 5));
            }
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (user) fetchData(); }, [user]);

    const handleCreateUser = async (formData) => {
        try { await register(formData); setIsUserModalOpen(false); fetchData(); }
        catch (err) { alert("Failed to create user."); }
    };

    const handleChangePassword = async (formData) => {
        try { await api.post('/users/change_password/', formData); alert("Password updated successfully!"); setIsPassModalOpen(false); }
        catch (err) { alert(err.response?.data?.detail || "Failed to update password."); }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure?")) {
            try { await api.delete(`/users/${userId}/`); fetchData(); }
            catch (err) { alert("Failed to delete user."); }
        }
    };

    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    if (loading) return <div className="loading-state">Loading dashboard...</div>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome back, {user?.username}! 👋</h1>
                <p>{user?.role === 'admin' ? "Admin Overview: Monitoring student progress." : "Here's what's happening with your studies today."}</p>
            </header>

            {user?.role === 'admin' ? (
                <AdminDashboard adminStats={adminStats} users={users} recentCompletions={recentCompletions} onAddUser={() => setIsUserModalOpen(true)} onDeleteUser={handleDeleteUser} />
            ) : (
                <StudentDashboard
                    stats={stats}
                    recentTasks={recentTasks}
                    completionRate={completionRate}
                    onChangePassword={() => setIsPassModalOpen(true)}
                    weeklyStats={weeklyStats}
                    user={user}
                    tasks={tasks}
                />
            )}

            <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} onSubmit={handleCreateUser} />
            <PasswordModal isOpen={isPassModalOpen} onClose={() => setIsPassModalOpen(false)} onSubmit={handleChangePassword} />

            <style jsx>{`
                .user-list { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
                .user-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--bg-primary); border-radius: 0.75rem; border: 1px solid var(--border-color); }
                .user-info { display: flex; flex-direction: column; gap: 0.25rem; }
                .user-name { font-weight: 700; }
                .user-email { font-size: 0.8rem; color: var(--text-secondary); }
                .user-role { font-size: 0.65rem; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 800; }
                .user-role.admin { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
                .user-role.student { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
                
                .completion-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
                .completion-item { display: flex; gap: 1rem; align-items: center; padding: 0.75rem; border-bottom: 1px solid var(--border-color); }
                .student-avatar { width: 40px; height: 40px; background: var(--accent-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
                .completion-text { font-size: 0.9rem; }
                .completion-text span { color: var(--accent-primary); font-weight: 600; }
                .completion-meta { font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem; }

                .settings-section { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); }
                .btn-outline { background: none; border: 1px solid var(--accent-primary); color: var(--accent-primary); border-radius: 8px; cursor: pointer; padding: 0.5rem; }
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
                .modal-content { max-width: 450px; width: 100%; }
                .form-grid { display: flex; flex-direction: column; gap: 1rem; }
                .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
                .form-group input { padding: 0.8rem; border-radius: 0.5rem; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); }

                .dashboard-container { max-width: 1300px; margin: 0 auto; padding: 3rem 2rem; }
                .dashboard-header { margin-bottom: 3rem; }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
                .stat-card { display: flex; align-items: center; gap: 1.5rem; }
                .stat-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; }
                .stat-icon.blue { background-color: #3b82f6; }
                .stat-icon.green { background-color: #10b981; }
                .stat-icon.yellow { background-color: #f59e0b; }
                .stat-icon.red { background-color: #ef4444; }
                .dashboard-main { display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; }
                .dashboard-column { display: flex; flex-direction: column; gap: 3rem; }
                .admin-view { grid-template-columns: 2fr 1fr; }
                .circular-progress-container { display: flex; justify-content: center; margin: 2rem 0; }
                .icon-yellow { color: #f59e0b; }
                .progress-circle { width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(var(--accent-primary) calc(var(--percent) * 1%), var(--border-color) 0); display: flex; align-items: center; justify-content: center; position: relative; }
                .progress-circle::after { content: ''; position: absolute; width: 120px; height: 120px; background: var(--bg-secondary); border-radius: 50%; }
                .progress-value { position: relative; z-index: 10; font-size: 2rem; font-weight: 700; }
                .loading-state { display: flex; justify-content: center; align-items: center; height: 50vh; }
                .btn-primary { background: var(--accent-primary); color: white; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer; font-weight: 600; }
                
                @media (max-width: 768px) {
                    .dashboard-main { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
