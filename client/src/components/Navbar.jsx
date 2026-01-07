import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, CheckCircle, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass sticky-nav">
            <div className="nav-content">
                <Link to="/" className="logo">
                    <CheckCircle className="icon-primary" />
                    <span>SmartPlanner</span>
                </Link>

                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/tasks">Tasks</Link>
                            {user.role === 'admin' && (
                                <Link to="/users" className="admin-link">Management</Link>
                            )}
                            <div className="user-profile">
                                <span className="username">{user.username}</span>
                                <button onClick={handleLogout} className="btn-icon" title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                    <button onClick={toggleTheme} className="btn-icon theme-toggle">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
            <style jsx>{`
                .sticky-nav {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    padding: 1rem 2rem;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid var(--border-color);
                }
                .nav-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    text-decoration: none;
                    font-family: var(--font-heading);
                }
                .icon-primary {
                    color: var(--accent-primary);
                }
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }
                .nav-links a {
                    text-decoration: none;
                    color: var(--text-secondary);
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .nav-links a:hover {
                    color: var(--accent-primary);
                }
                .btn-icon {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: background 0.2s;
                }
                .btn-icon:hover {
                    background: var(--bg-secondary);
                    color: var(--accent-primary);
                }
                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding-left: 1rem;
                    border-left: 1px solid var(--border-color);
                }
                .username {
                    font-weight: 600;
                    font-size: 0.9rem;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
