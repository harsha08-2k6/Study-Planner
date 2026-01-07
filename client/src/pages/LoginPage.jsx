import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card card">
                <div className="auth-header">
                    <LogIn className="icon-primary" size={32} />
                    <h2>Welcome Back</h2>
                    <p>Enter your credentials to access your planner</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Create one</Link>
                </div>
            </div>

            <style jsx>{`
                .auth-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: calc(100vh - 120px);
                    padding: 2rem;
                }
                .auth-card {
                    width: 100%;
                    max-width: 450px;
                    padding: 2.5rem;
                }
                .auth-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                .auth-header h2 {
                    font-size: 2rem;
                    margin: 1rem 0 0.5rem;
                }
                .auth-header p {
                    color: var(--text-secondary);
                }
                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-group label {
                    font-weight: 500;
                    font-size: 0.9rem;
                }
                .input-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 0.5rem;
                    padding: 0 1rem;
                    transition: border-color 0.2s;
                }
                .input-wrapper:focus-within {
                    border-color: var(--accent-primary);
                }
                .input-wrapper input {
                    border: none;
                    background: none;
                    padding: 0.75rem 0;
                    width: 100%;
                    outline: none;
                    color: var(--text-primary);
                }
                .btn-block {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin-top: 1rem;
                }
                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    color: var(--danger);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    font-size: 0.9rem;
                }
                .auth-footer {
                    margin-top: 2rem;
                    text-align: center;
                    color: var(--text-secondary);
                }
                .auth-footer a {
                    color: var(--accent-primary);
                    font-weight: 600;
                    text-decoration: none;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
