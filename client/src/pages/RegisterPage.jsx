import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, Loader2, ShieldCheck, GraduationCap } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Username or email might already be taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page register">
            <div className="auth-card card">
                <div className="auth-header">
                    <div className="icon-circle">
                        <UserPlus className="icon-primary" size={32} />
                    </div>
                    <h2>Create Account</h2>
                    <p>Join thousands of students organizing their future</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Username</label>
                            <div className="input-wrapper">
                                <User size={18} />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    placeholder="johndoe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-wrapper">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                required
                                minLength="6"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Select Your Role</label>
                        <div className="role-grid">
                            <div
                                className={`role-option ${formData.role === 'student' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, role: 'student' })}
                            >
                                <GraduationCap size={24} />
                                <div className="role-info">
                                    <span className="role-title">Student</span>
                                    <span className="role-desc">Manage tasks & track progress</span>
                                </div>
                                <div className="role-check"></div>
                            </div>
                            <div
                                className={`role-option ${formData.role === 'admin' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, role: 'admin' })}
                            >
                                <ShieldCheck size={24} />
                                <div className="role-info">
                                    <span className="role-title">Admin</span>
                                    <span className="role-desc">Oversee system & users</span>
                                </div>
                                <div className="role-check"></div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block sign-up-btn" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Start Planning Free'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>

            <style jsx>{`
                .auth-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: calc(100vh - 120px);
                    padding: 2rem;
                    background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 400px),
                                radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.05), transparent 400px);
                }
                .auth-card {
                    width: 100%;
                    max-width: 550px; /* Wider for register */
                    padding: 3rem;
                    backdrop-filter: blur(10px);
                    background: rgba(var(--card-bg-rgb), 0.8);
                }
                .auth-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }
                .icon-circle {
                    width: 64px;
                    height: 64px;
                    background: rgba(99, 102, 241, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                }
                .auth-header h2 {
                    font-size: 2.2rem;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, var(--text-primary), var(--accent-primary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .auth-header p {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                }
                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }
                .form-group label {
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: var(--text-primary);
                }
                .input-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 0.75rem;
                    padding: 0 1rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .input-wrapper:focus-within {
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
                    transform: translateY(-2px);
                }
                .input-wrapper input {
                    border: none;
                    background: none;
                    padding: 0.85rem 0;
                    width: 100%;
                    outline: none;
                    color: var(--text-primary);
                    font-size: 1rem;
                }
                
                .role-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }
                .role-option {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 1.5rem;
                    background: var(--bg-primary);
                    border: 2px solid var(--border-color);
                    border-radius: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                }
                .role-option:hover {
                    border-color: var(--accent-primary);
                    background: rgba(99, 102, 241, 0.02);
                }
                .role-option.active {
                    border-color: var(--accent-primary);
                    background: rgba(99, 102, 241, 0.05);
                }
                .role-info {
                    margin-top: 1rem;
                }
                .role-title {
                    display: block;
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: var(--text-primary);
                }
                .role-desc {
                    display: block;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    margin-top: 0.25rem;
                }
                .role-check {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 20px;
                    height: 20px;
                    border: 2px solid var(--border-color);
                    border-radius: 50%;
                }
                .role-option.active .role-check {
                    background: var(--accent-primary);
                    border-color: var(--accent-primary);
                }
                .role-option.active .role-check::after {
                    content: '✓';
                    color: white;
                    font-size: 12px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-30%, -50%);
                }

                .sign-up-btn {
                    padding: 1rem;
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-top: 1.5rem;
                    letter-spacing: 0.02em;
                }

                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    padding: 1rem;
                    border-radius: 0.75rem;
                    margin-bottom: 2rem;
                    text-align: center;
                    font-size: 0.95rem;
                    border-left: 4px solid #ef4444;
                }
                .auth-footer {
                    margin-top: 2.5rem;
                    text-align: center;
                    color: var(--text-secondary);
                    font-size: 1rem;
                }
                .auth-footer a {
                    color: var(--accent-primary);
                    font-weight: 700;
                    text-decoration: none;
                    margin-left: 0.5rem;
                }
                .auth-footer a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 640px) {
                    .form-row, .role-grid {
                        grid-template-columns: 1fr;
                    }
                    .auth-card {
                        padding: 2rem;
                    }
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

export default RegisterPage;
